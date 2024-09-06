package com.example.AllEat.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "restaurants")
public class RestaurantsEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "restaurants_name", nullable = false)
    private String restaurantsName;

    @Enumerated(EnumType.STRING)
    @Column(name = "restaurants_type", nullable = false)
    private RestaurantsType restaurantsType;

//    // MenuEntity와 1대N 관계 설정
//    @OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL, orphanRemoval = true)
//    private List<MenuEntity> menu;

//    // PayTransactionsEntity와 1대N 관계 설정
//    @OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL, orphanRemoval = true)
//    private List<PayTransactionsEntity> payTransactions;

    // RestaurantsType을 내부 static enum으로 정의
    public enum RestaurantsType {
        RESTAURANTS("restaurants"),
        MART("mart"),
        HOME("home");

        private final String type;

        RestaurantsType(String type) {
            this.type = type;
        }

        public String getType() {
            return type;
        }
    }
}
