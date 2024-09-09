package com.example.AllEat.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.sql.Timestamp;

@Entity
@Getter
@Setter
@Table(name = "user")
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "email", unique = true, nullable = false)
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "role", nullable = false)
    private String role = "ROLE_USER";

    @Column(name = "created_at", nullable = false, updatable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Timestamp createdAt;

    @Column(name = "social_login")
    private String socialLogin;

    @Column(name = "profile_url")
    private String profileUrl;

    @Column(name = "user_height")
    private Double userHeight;

    @Column(name = "user_gender")
    private int userGender;

    @Column(name = "user_age")
    private int userAge;

    @Column(name = "alarm_time")
    private int alarmTime;

    @OneToOne(mappedBy = "user", orphanRemoval = true)
    @JsonManagedReference
    private PaymoneyEntity paymoney;

}
