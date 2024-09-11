package com.example.AllEat.service;

import com.example.AllEat.dto.menu.MenuCreateDTO;
import com.example.AllEat.entity.MenuEntity;
import com.example.AllEat.entity.RestaurantsEntity;
import com.example.AllEat.jwt.JwtUtil;
import com.example.AllEat.repository.MenuRepository;
import com.example.AllEat.repository.RestaurantsRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MenuService {

    private final RestaurantsRepository restaurantsRepository;

    private final MenuRepository menuRepository;

    private final JwtUtil jwtUtil;

    // 메뉴 생성
    public MenuEntity createMenu(MenuCreateDTO menuCreateDTO, HttpServletRequest request) {
        // restaurant_id로 가게 정보 가져오기
        System.out.println("id : " + menuCreateDTO.getRestaurantId());
        RestaurantsEntity restaurant = restaurantsRepository.findById(menuCreateDTO.getRestaurantId())
                .orElseThrow(() -> new RuntimeException("Restaurant not found"));

        // MenuEntity 생성
        MenuEntity menuEntity = new MenuEntity();
        menuEntity.setRestaurants(restaurant);
        menuEntity.setMenuName(menuCreateDTO.getMenuName());
        menuEntity.setMenuCalories(menuCreateDTO.getMenuCalories());
        menuEntity.setMenuCarbohydrate(menuCreateDTO.getMenuCarbohydrate());
        menuEntity.setMenuProtein(menuCreateDTO.getMenuProtein());
        menuEntity.setMenuFat(menuCreateDTO.getMenuFat());
        menuEntity.setMenuPrice(menuCreateDTO.getMenuPrice());
        menuEntity.setMenuValue(menuCreateDTO.getMenuValue());

        // menu_type을 int로 저장
        menuEntity.setMenuType(menuCreateDTO.getMenuType());

        // 메뉴 저장
        return menuRepository.save(menuEntity);
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

    // 메뉴 수정
    public MenuEntity updateMenu(Integer id, MenuCreateDTO menuCreateDTO) {
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
    public void deleteMenu(Integer id) {
        MenuEntity menu = getMenuById(id);
        menuRepository.delete(menu);
    }

    // 특정 레스토랑의 메뉴 조회
    public List<MenuEntity> getMenusByRestaurantId(Integer restaurantId) {
        RestaurantsEntity restaurant = restaurantsRepository.findById(restaurantId)
                .orElseThrow(() -> new RuntimeException("Restaurant not found"));
        return menuRepository.findByRestaurants(restaurant);
    }

    public List<MenuEntity> getMenusByRestaurantIdAndBalance(Integer restaurantId, Integer balance) {
        RestaurantsEntity restaurants = restaurantsRepository.findById(restaurantId).orElseThrow(() -> new RuntimeException("Restaurant not found"));
        List<MenuEntity> findMenu = menuRepository.findByRestaurants_IdAndMenuPrice(restaurantId, balance);
        return findMenu;

    }
}
