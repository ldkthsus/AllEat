package com.example.AllEat.dto.favorite;

import com.fasterxml.jackson.annotation.JsonProperty;

public class FavoriteCreateDTO {

    @JsonProperty("restaurant_id")
    private Integer restaurantId;  // 추가된 필드
    @JsonProperty("menu_id")
    private Integer menuId;

    // 기본 생성자
    public FavoriteCreateDTO() {}

    // 생성자
    public FavoriteCreateDTO(Integer restaurantId, Integer menuId) {
        this.restaurantId = restaurantId;
        this.menuId = menuId;
    }

    // Getters and Setters
    public Integer getRestaurantId() {
        return restaurantId;
    }

    public void setRestaurantId(Integer restaurantId) {
        this.restaurantId = restaurantId;
    }

    public Integer getMenuId() {
        return menuId;
    }

    public void setMenuId(Integer menuId) {
        this.menuId = menuId;
    }
}