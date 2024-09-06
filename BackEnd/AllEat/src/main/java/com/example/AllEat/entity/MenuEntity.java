package com.example.AllEat.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "menu")
public class MenuEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "restaurants_id", nullable = false)
    private RestaurantsEntity restaurants;

    @Column(name = "menu_name", nullable = false)
    private String menuName;

    @Column(name = "menu_price", nullable = false)
    private Integer menuPrice;

    @Column(name = "menu_calories", nullable = false)
    private Integer menuCalories;

    @Column(name = "menu_carbohydrate", nullable = true)
    private Double menuCarbohydrate;  // 탄수화물 (g)

    @Column(name = "menu_protein", nullable = true)
    private Double menuProtein;  // 단백질 (g)

    @Column(name = "menu_fat", nullable = true)
    private Double menuFat;  // 지방 (g)

    @Column(name = "menu_type", nullable = false)
    @Enumerated(EnumType.STRING)
    private MenuType menuType;

    @Column(name = "menu_value", nullable = false)
    private double menuValue;

    public enum MenuType {
        COUNT("COUNT"),
        GRAM("GRAM"),
        ML("ML");

        private final String unit;

        MenuType(String unit) {
            this.unit = unit;
        }

        public String getUnit() {
            return unit;
        }
    }
}
