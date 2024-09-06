//package com.example.AllEat.entity;
//
//import jakarta.persistence.*;
//import lombok.Getter;
//import lombok.Setter;
//
//import java.sql.Timestamp;
//
//@Entity
//@Getter
//@Setter
//@Table(name = "menu")
//public class MenuEntity {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "id")
//    private Integer id;
//
//    @ManyToOne
//    @JoinColumn(name = "restaurants_id", nullable = false)
//    private RestaurantsEntity restaurants;
//
//    @Column(name = "menu_name", nullable = false)
//    private String menuName;
//
//    @Column(name = "menu_calories")
//    private Integer menuCalories;
//
//    @Column(name = "menu_price", nullable = false)
//    private Integer menuPrice;
//
//    @Column(name = "menu_type", nullable = false)
//    private MenuType menuType;
//
//    @Column(name = "menu_value", nullable = false)
//    private double menuValue;
//
//    public enum MenuType {
//        COUNT("COUNT"),
//        GRAM("GRAM"),
//        ML("ML");
//
//        private final String unit;
//
//        MenuType(String unit) {
//            this.unit = unit;
//        }
//
//        public String getUnit() {
//            return unit;
//        }
//    }
//}