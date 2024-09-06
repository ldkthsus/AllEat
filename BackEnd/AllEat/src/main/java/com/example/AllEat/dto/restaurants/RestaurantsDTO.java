package com.example.AllEat.dto.restaurants;

public class RestaurantsDTO {

    private Integer id;  // 레스토랑 ID
    private String restaurantsName;  // 레스토랑 이름
    private String restaurantsType;  // 레스토랑 타입
    // private List<MenuDTO> menu;  // 메뉴 리스트 (주석 처리)

    // 기본 생성자
    public RestaurantsDTO() {}

    // 매개변수가 있는 생성자
    public RestaurantsDTO(Integer id, String restaurantsName, String restaurantsType /*, List<MenuDTO> menu */) {
        this.id = id;
        this.restaurantsName = restaurantsName;
        this.restaurantsType = restaurantsType;
        // this.menu = menu;
    }

    // Getters and Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getRestaurantsName() {
        return restaurantsName;
    }

    public void setRestaurantsName(String restaurantsName) {
        this.restaurantsName = restaurantsName;
    }

    public String getRestaurantsType() {
        return restaurantsType;
    }

    public void setRestaurantsType(String restaurantsType) {
        this.restaurantsType = restaurantsType;
    }

    // 메뉴 리스트 관련 코드 주석 처리
    /*
    public List<MenuDTO> getMenu() {
        return menu;
    }

    public void setMenu(List<MenuDTO> menu) {
        this.menu = menu;
    }
    */
}
