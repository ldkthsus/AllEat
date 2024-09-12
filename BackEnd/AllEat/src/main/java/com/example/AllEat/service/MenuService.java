package com.example.AllEat.service;

import com.example.AllEat.dto.menu.MenuCreateDTO;
import com.example.AllEat.entity.MenuEntity;
import com.example.AllEat.entity.RestaurantsEntity;
import com.example.AllEat.entity.UserEntity;
import com.example.AllEat.jwt.JwtUtil;
import com.example.AllEat.repository.MenuRepository;
import com.example.AllEat.repository.RestaurantsRepository;
import com.example.AllEat.repository.UserRepository;
import com.example.AllEat.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MenuService {


    private final RestaurantsService restaurantsService;
    private final MenuRepository menuRepository;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;
    private final RestaurantsRepository restaurantsRepository;

    // JWT 토큰을 이용해 사용자 식별
    public UserEntity findUserByRequest(HttpServletRequest request) {
        String token = request.getHeader("Authorization").substring(7);  // "Bearer " 제거
        String email = jwtUtil.getEmail(token);
        return userRepository.findByEmail(email);
    }

    // 레스토랑이 없으면 생성하고, 메뉴 추가
    public MenuEntity addMenuWithRestaurantCheck(String restaurantName, String restaurantType, MenuCreateDTO menuCreateDTO) {
        // restaurant_name으로 레스토랑 검색 또는 생성
        RestaurantsEntity restaurant = restaurantsService.findOrCreateRestaurant(restaurantName, restaurantType);

        // MenuEntity 생성 및 레스토랑과 연결
        MenuEntity menuEntity = new MenuEntity();
        menuEntity.setRestaurants(restaurant);
        menuEntity.setMenuName(menuCreateDTO.getMenuName());
        menuEntity.setMenuCalories(menuCreateDTO.getMenuCalories());
        menuEntity.setMenuCarbohydrate(menuCreateDTO.getMenuCarbohydrate());
        menuEntity.setMenuProtein(menuCreateDTO.getMenuProtein());
        menuEntity.setMenuFat(menuCreateDTO.getMenuFat());
        menuEntity.setMenuPrice(menuCreateDTO.getMenuPrice());
        menuEntity.setMenuType(menuCreateDTO.getMenuType());
        menuEntity.setMenuValue(menuCreateDTO.getMenuValue());

        // 메뉴 저장
        return menuRepository.save(menuEntity);
    }

    // 메뉴 생성
    public MenuEntity createMenu(MenuCreateDTO menuCreateDTO, HttpServletRequest request) {
        // restaurant_id로 가게 정보 가져오기
        System.out.println("id : " + menuCreateDTO.getRestaurantId());
        RestaurantsEntity restaurant = restaurantsRepository.findById(menuCreateDTO.getRestaurantId())
                .orElseThrow(() -> new RuntimeException("Restaurant not found"));
        UserEntity userEntity = findUserByRequest(request);
        if (userEntity == null) {
            throw new RuntimeException("User not found");
        }

        // restaurant_name으로 레스토랑 검색 또는 생성
        RestaurantsEntity findRestaurant = restaurantsService.findOrCreateRestaurant(
                menuCreateDTO.getRestaurantName(), menuCreateDTO.getRestaurantType());

        // MenuEntity 생성 및 가게 연결
        MenuEntity menuEntity = new MenuEntity();
        menuEntity.setRestaurants(findRestaurant);
        menuEntity.setMenuName(menuCreateDTO.getMenuName());
        menuEntity.setMenuCalories(menuCreateDTO.getMenuCalories());
        menuEntity.setMenuCarbohydrate(menuCreateDTO.getMenuCarbohydrate());
        menuEntity.setMenuProtein(menuCreateDTO.getMenuProtein());
        menuEntity.setMenuFat(menuCreateDTO.getMenuFat());
        menuEntity.setMenuPrice(menuCreateDTO.getMenuPrice());
        menuEntity.setMenuValue(menuCreateDTO.getMenuValue());
        menuEntity.setMenuType(menuCreateDTO.getMenuType());

        // 메뉴 저장
        return menuRepository.save(menuEntity);
    }

    // 메뉴 수정
    public MenuEntity updateMenu(Integer id, MenuCreateDTO menuCreateDTO, HttpServletRequest request) {
        UserEntity userEntity = findUserByRequest(request);
        if (userEntity == null) {
            throw new RuntimeException("User not found");
        }

        MenuEntity menu = getMenuById(id);  // 메뉴 찾기

        menu.setMenuName(menuCreateDTO.getMenuName());
        menu.setMenuCalories(menuCreateDTO.getMenuCalories());
        menu.setMenuCarbohydrate(menuCreateDTO.getMenuCarbohydrate());
        menu.setMenuProtein(menuCreateDTO.getMenuProtein());
        menu.setMenuFat(menuCreateDTO.getMenuFat());
        menu.setMenuPrice(menuCreateDTO.getMenuPrice());
        menu.setMenuValue(menuCreateDTO.getMenuValue());
        menu.setMenuType(menuCreateDTO.getMenuType());

        return menuRepository.save(menu);
    }

    // 메뉴 삭제
    public void deleteMenu(Integer id, HttpServletRequest request) {
        UserEntity userEntity = findUserByRequest(request);
        if (userEntity == null) {
            throw new RuntimeException("User not found");
        }

        MenuEntity menu = getMenuById(id);
        menuRepository.delete(menu);
    }

    // 특정 메뉴 조회
    public MenuEntity getMenuById(Integer id) {
        return menuRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Menu not found"));
    }

    // 모든 메뉴 조회
    public List<MenuEntity> getAllMenus() {
        return menuRepository.findAll();
    }

    // 특정 레스토랑의 메뉴 조회
    public List<MenuEntity> getMenusByRestaurantId(Integer restaurantId) {
        RestaurantsEntity restaurant = restaurantsService.findRestaurantById(restaurantId);
        return menuRepository.findByRestaurants(restaurant);
    }

    public List<MenuEntity> getMenusByRestaurantIdAndBalance(Integer restaurantId, Integer balance) {
        List<MenuEntity> findMenu = menuRepository.findByRestaurants_IdAndMenuPrice(restaurantId, balance);
        return findMenu;
    }
}
