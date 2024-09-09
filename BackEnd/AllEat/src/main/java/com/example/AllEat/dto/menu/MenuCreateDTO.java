package com.example.AllEat.dto.menu;
import com.fasterxml.jackson.annotation.JsonProperty;

public class MenuCreateDTO {

    @JsonProperty("restaurant_id")
    private Integer restaurantId;

    @JsonProperty("menu_name")
    private String menuName;

    @JsonProperty("menu_calories")
    private Integer menuCalories;

    @JsonProperty("menu_carbohydrate")
    private Double menuCarbohydrate;

    @JsonProperty("menu_protein")
    private Double menuProtein;

    @JsonProperty("menu_fat")
    private Double menuFat;

    @JsonProperty("menu_price")
    private Integer menuPrice;

    @JsonProperty("menu_type")
    private Integer menuType;

    @JsonProperty("menu_value")
    private Double menuValue;

    // Getters and Setters
    public Integer getRestaurantId() {
        return restaurantId;
    }

    public void setRestaurantId(Integer restaurantId) {
        this.restaurantId = restaurantId;
    }

    public String getMenuName() {
        return menuName;
    }

    public void setMenuName(String menuName) {
        this.menuName = menuName;
    }

    public Integer getMenuCalories() {
        return menuCalories;
    }

    public void setMenuCalories(Integer menuCalories) {
        this.menuCalories = menuCalories;
    }

    public Double getMenuCarbohydrate() {
        return menuCarbohydrate;
    }

    public void setMenuCarbohydrate(Double menuCarbohydrate) {
        this.menuCarbohydrate = menuCarbohydrate;
    }

    public Double getMenuProtein() {
        return menuProtein;
    }

    public void setMenuProtein(Double menuProtein) {
        this.menuProtein = menuProtein;
    }

    public Double getMenuFat() {
        return menuFat;
    }

    public void setMenuFat(Double menuFat) {
        this.menuFat = menuFat;
    }

    public Integer getMenuPrice() {
        return menuPrice;
    }

    public void setMenuPrice(Integer menuPrice) {
        this.menuPrice = menuPrice;
    }

    public Integer getMenuType() {
        return menuType;
    }

    public void setMenuType(Integer menuType) {
        this.menuType = menuType;
    }

    public Double getMenuValue() {
        return menuValue;
    }

    public void setMenuValue(Double menuValue) {
        this.menuValue = menuValue;
    }
}
