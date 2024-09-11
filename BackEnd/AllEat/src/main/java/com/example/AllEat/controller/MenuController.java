package com.example.AllEat.controller;

import com.example.AllEat.dto.menu.MenuCreateDTO;
import com.example.AllEat.entity.MenuEntity;
import com.example.AllEat.service.MenuService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/AllEat/record")
public class MenuController {

    private final MenuService menuService;

    @Autowired
    public MenuController(MenuService menuService) {
        this.menuService = menuService;
    }

    // 메뉴 추가
    @PostMapping("/add-menu")
    public ResponseEntity<MenuEntity> addMenu(@RequestBody MenuCreateDTO menuCreateDTO, HttpServletRequest request) {
        MenuEntity createdMenu = menuService.createMenu(menuCreateDTO, request);
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
    public ResponseEntity<MenuEntity> updateMenu(@PathVariable Integer id, @RequestBody MenuCreateDTO menuCreateDTO) {
        MenuEntity updatedMenu = menuService.updateMenu(id, menuCreateDTO);
        return new ResponseEntity<>(updatedMenu, HttpStatus.OK);
    }

    // 메뉴 삭제
    @DeleteMapping("/delete-menu/{id}")
    public ResponseEntity<Void> deleteMenu(@PathVariable Integer id) {
        menuService.deleteMenu(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/menu/{restaurantId}/{balance}")
    public ResponseEntity<?> getPossibleList(@PathVariable(name = "restaurantId") Integer restaurantId, @PathVariable(name = "balance") Integer balance) {
        List<MenuEntity> menus = menuService.getMenusByRestaurantIdAndBalance(restaurantId, balance);
        return new ResponseEntity<>(menus, HttpStatus.OK);
    }
}
