package com.example.AllEat.service;

import com.example.AllEat.dto.favorite.FavoriteDTO;
import com.example.AllEat.dto.menu.MenuDTO;
import com.example.AllEat.entity.FavoriteEntity;
import com.example.AllEat.entity.MenuEntity;
import com.example.AllEat.entity.RestaurantsEntity;
import com.example.AllEat.entity.UserEntity;
import com.example.AllEat.jwt.JwtUtil;
import com.example.AllEat.repository.FavoriteRepository;
import com.example.AllEat.repository.MenuRepository;
import com.example.AllEat.repository.RestaurantsRepository;
import com.example.AllEat.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FavoriteService {

    @Autowired
    private FavoriteRepository favoriteRepository;

    @Autowired
    private MenuRepository menuRepository; // 여기에 주입

    @Autowired
    private RestaurantsRepository restaurantsRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    // 즐겨찾기 추가
    public FavoriteDTO addFavorite(Integer restaurantId, Integer menuId, HttpServletRequest request) {
        UserEntity user = getUserFromRequest(request);

        // 레스토랑 ID와 메뉴 ID를 통해 레스토랑과 메뉴를 확인
        RestaurantsEntity restaurant = restaurantsRepository.findById(restaurantId)
                .orElseThrow(() -> new IllegalArgumentException("Restaurant not found"));
        MenuEntity menu = menuRepository.findById(menuId)
                .orElseThrow(() -> new IllegalArgumentException("Menu not found"));

        if (!menu.getRestaurants().getId().equals(restaurantId)) {
            throw new IllegalArgumentException("Menu does not belong to the specified restaurant");
        }

        // 즐겨찾기 엔티티 생성 및 저장
        FavoriteEntity favorite = new FavoriteEntity();
        favorite.setMenu(menu);
        favorite.setUser(user);

        favorite = favoriteRepository.save(favorite);

        // DTO로 변환하여 반환
        return convertToFavoriteDTO(favorite);
    }

    // 즐겨찾기 해제 (favoriteId로)
    public void removeFavoriteById(Integer favoriteId, HttpServletRequest request) {
        // 유저를 요청에서 가져오기
        UserEntity user = getUserFromRequest(request);

        // 해당 유저의 즐겨찾기인지 확인 후 삭제
        FavoriteEntity favorite = favoriteRepository.findById(favoriteId)
                .orElseThrow(() -> new IllegalArgumentException("Favorite not found"));

        if (!favorite.getUser().equals(user)) {
            throw new IllegalArgumentException("Unauthorized to delete this favorite");
        }

        favoriteRepository.delete(favorite);
    }


    // 해당 유저의 즐겨찾기 조회
    public List<FavoriteDTO> getUserFavorites(HttpServletRequest request) {
        UserEntity user = getUserFromRequest(request);
        return favoriteRepository.findByUser(user).stream()
                .map(this::convertToFavoriteDTO)
                .collect(Collectors.toList());
    }

    // HttpServletRequest로부터 유저를 얻는 메서드
    private UserEntity getUserFromRequest(HttpServletRequest request) {
        String token = request.getHeader("Authorization").substring(7);
        String email = jwtUtil.getEmail(token);
        return userRepository.findByEmail(email);
    }

    // FavoriteEntity를 FavoriteDTO로 변환하는 메서드
    private FavoriteDTO convertToFavoriteDTO(FavoriteEntity favorite) {
        MenuEntity menu = favorite.getMenu();
        MenuDTO menuDTO = new MenuDTO(
                menu.getId(),
                menu.getMenuName(),
                menu.getMenuCalories(),
                menu.getMenuCarbohydrate(),
                menu.getMenuProtein(),
                menu.getMenuFat(),
                menu.getMenuPrice(),
                menu.getMenuType(),
                menu.getMenuValue(),
                menu.getRestaurants().getId()  // 추가된 restaurantsId
        );

        return new FavoriteDTO(favorite.getId(), menuDTO);
    }
}
