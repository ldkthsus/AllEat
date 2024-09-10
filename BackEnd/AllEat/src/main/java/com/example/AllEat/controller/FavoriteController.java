package com.example.AllEat.controller;

import com.example.AllEat.dto.favorite.FavoriteCreateDTO;
import com.example.AllEat.dto.favorite.FavoriteDTO;
import com.example.AllEat.service.FavoriteService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/AllEat/record/favorites")
public class FavoriteController {

    private final FavoriteService favoriteService;

    @Autowired
    public FavoriteController(FavoriteService favoriteService) {
        this.favoriteService = favoriteService;
    }

    // 즐겨찾기 추가
    @PostMapping
    public ResponseEntity<FavoriteDTO> addFavorite(@RequestBody FavoriteCreateDTO favoriteCreateDTO, HttpServletRequest request) {
        FavoriteDTO favorite = favoriteService.addFavorite(favoriteCreateDTO.getRestaurantId(), favoriteCreateDTO.getMenuId(), request);
        return new ResponseEntity<>(favorite, HttpStatus.CREATED);
    }

    // 즐겨찾기 해제 (favorite_id로 삭제)
    @DeleteMapping("/{favoriteId}")
    public ResponseEntity<Void> removeFavorite(@PathVariable Integer favoriteId) {
        // favorite_id로 즐겨찾기 삭제
        favoriteService.removeFavoriteById(favoriteId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }



    // 유저 즐겨찾기 목록 조회
    @GetMapping
    public ResponseEntity<List<FavoriteDTO>> getFavorites(HttpServletRequest request) {
        List<FavoriteDTO> favoriteMenus = favoriteService.getUserFavorites(request);
        return new ResponseEntity<>(favoriteMenus, HttpStatus.OK);
    }
}
