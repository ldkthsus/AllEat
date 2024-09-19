package com.example.AllEat.controller;

import com.example.AllEat.dto.menu.MenuCreateDTO;
import com.example.AllEat.dto.menu.AddMenuRequest;
import com.example.AllEat.entity.DailyDiaryEntity;
import com.example.AllEat.entity.MenuEntity;
import com.example.AllEat.service.DailyDiaryService;
import com.example.AllEat.service.MenuService;
import com.example.AllEat.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/AllEat/record")
@RequiredArgsConstructor
public class MenuController {

    private final MenuService menuService;
    private final UserService userService;
    private final DailyDiaryService dailyDiaryServie;

    // 메뉴와 레스토랑 추가
    @PostMapping("/add-menu")
    public ResponseEntity<MenuEntity> addMenuWithRestaurant(@RequestBody MenuCreateDTO menuCreateDTO) {
        MenuEntity createdMenu = menuService.addMenuWithRestaurantCheck(
                menuCreateDTO.getRestaurantName(),
                menuCreateDTO.getRestaurantType(),
                menuCreateDTO
        );
        return new ResponseEntity<>(createdMenu, HttpStatus.CREATED);
    }

    // 특정 메뉴 조회
    @GetMapping("/menu/{id}")
    public ResponseEntity<MenuEntity> getMenuById(@PathVariable Integer id) {
        MenuEntity menu = menuService.getMenuById(id);
        return new ResponseEntity<>(menu, HttpStatus.OK);
    }

    // 모든 메뉴 조회
    @GetMapping("/menus")
    public ResponseEntity<List<MenuEntity>> getAllMenus() {
        List<MenuEntity> menus = menuService.getAllMenus();
        return new ResponseEntity<>(menus, HttpStatus.OK);
    }

    // 특정 레스토랑의 메뉴 조회
    @GetMapping("/restaurant/{restaurantId}/menus")
    public ResponseEntity<List<MenuEntity>> getMenusByRestaurantId(@PathVariable Integer restaurantId) {
        List<MenuEntity> menus = menuService.getMenusByRestaurantId(restaurantId);
        return new ResponseEntity<>(menus, HttpStatus.OK);
    }

    // 메뉴 수정
    @PutMapping("/update-menu/{id}")
    public ResponseEntity<MenuEntity> updateMenu(@PathVariable Integer id, @RequestBody MenuCreateDTO menuCreateDTO, HttpServletRequest request) {
        MenuEntity updatedMenu = menuService.updateMenu(id, menuCreateDTO, request);
        return new ResponseEntity<>(updatedMenu, HttpStatus.OK);
    }

    // 메뉴 삭제
    @DeleteMapping("/delete-menu/{id}")
    public ResponseEntity<Void> deleteMenu(@PathVariable Integer id, HttpServletRequest request) {
        menuService.deleteMenu(id, request);  // HttpServletRequest 추가
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/menu/{restaurantId}/{balance}")
    public ResponseEntity<?> getPossibleList(@PathVariable(name = "restaurantId") Integer restaurantId, @PathVariable(name = "balance") Integer balance) {
        List<MenuEntity> menus = menuService.getMenusByRestaurantIdAndBalance(restaurantId, balance);
        return ResponseEntity.status(HttpStatus.OK).body(menus);
    }

    @PostMapping("/menu")
    public ResponseEntity<?> addMenu(@RequestBody List<AddMenuRequest> addMenuRequests, HttpServletRequest request) {
        DailyDiaryEntity getDailyDiaryEntity = dailyDiaryServie.getDailyDiary(request, addMenuRequests);
        return ResponseEntity.status(HttpStatus.OK).body(getDailyDiaryEntity);
    }
}
