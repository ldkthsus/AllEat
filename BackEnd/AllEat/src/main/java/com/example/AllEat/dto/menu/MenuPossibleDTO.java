package com.example.AllEat.dto.menu;

import com.example.AllEat.entity.MenuEntity;
import com.example.AllEat.entity.RestaurantsEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MenuPossibleDTO {

    private Integer restaurantsId;

    private String restaurantsName;

    private List<MenuConvertDTO> menus;

    public MenuPossibleDTO(RestaurantsEntity restaurants, List<MenuEntity> menuList) {
        this.restaurantsId = restaurants.getId();
        this.restaurantsName = restaurants.getRestaurantsName();
        this.menus = new ArrayList<>();
        for(MenuEntity menu : menuList){
            this.menus.add(new MenuConvertDTO(menu));
        }
    }

    @Getter
    private static class MenuConvertDTO {
        private Integer menuId;
        private String menuName;
        private Integer price;
        private Integer menuType;
        private Integer menuCalories;
        private boolean favorite;

        public MenuConvertDTO(MenuEntity menu) {
            this.menuId = menu.getId();
            this.menuName = menu.getMenuName();
            this.price = menu.getMenuPrice();
            this.menuType = menu.getMenuType();
            this.menuCalories = menu.getMenuCalories();
            if(menu.getFavorite() == null){
                this.favorite = false;
            }
            else{
                this.favorite = true;
            }
        }
    }
}
