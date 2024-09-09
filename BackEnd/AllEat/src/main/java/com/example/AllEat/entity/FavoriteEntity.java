package com.example.AllEat.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "favorites")
public class FavoriteEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    // MenuEntity와 1대1 관계 설정
    @OneToOne
    @JoinColumn(name = "menu_id", nullable = false)
    private MenuEntity menu;

    // UserEntity와 1대N 관계 설정
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;
}
