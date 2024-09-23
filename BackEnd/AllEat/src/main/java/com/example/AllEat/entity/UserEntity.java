package com.example.AllEat.entity;

import com.example.AllEat.dto.user.UpdateRequestDTO;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.sql.Timestamp;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
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

    @Column(name = "user_name")
    private String userName;

    @Column(name = "role", nullable = false)
    private String role = "ROLE_USER";

    @Column(name = "created_at", nullable = false, updatable = false, insertable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Timestamp createdAt;

    @Column(name = "social_login")
    private String socialLogin;

    @Column(name = "profile_url")
    private String profileUrl;

    @Column(name = "user_height")
    private Double userHeight;

    @Column(name = "user_gender")
    private Integer userGender;

    @Column(name = "user_age")
    private Integer userAge;

    @Column(name = "refresh_Token")
    private String refreshToken;

    @Column(name = "expiration")
    private Timestamp expiration;

    @Column(name = "activity_amount")
    private Integer activityAmount;

    @OneToMany(mappedBy = "user", orphanRemoval = true, fetch = FetchType.LAZY)
    private List<WeightEntity> weights;

    @OneToOne(mappedBy = "user", orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonBackReference
    private GoalEntity goals;

    @OneToOne(mappedBy = "user", orphanRemoval = true, fetch = FetchType.LAZY)  // 외래키는 AlarmEntity에서 관리
    private AlarmEntity alarm;


    public void updateRefreshToken(String refreshToken, Timestamp expiration){
        this.refreshToken = refreshToken;
        this.expiration = expiration;
    }

    public void updateProfile(String email, String userName, String profileUrl){
        this.email = email;
        this.userName = userName;
        this.profileUrl = profileUrl;
    }

    public void updateInfo(UpdateRequestDTO updateRequest, String profileUrl){
        if (updateRequest.getPassword1() != null){
            this.password = updateRequest.getPassword1();
        }
        if (updateRequest.getUserAge() != null){
            this.userAge = updateRequest.getUserAge();
        }
        if (updateRequest.getUserGender() != null){
            this.userGender = updateRequest.getUserGender();
        }
        if (updateRequest.getUserHeight() != null){
            this.userHeight = updateRequest.getUserHeight();
        }
        if (updateRequest.getActivityAmount() != null){
            this.activityAmount = updateRequest.getActivityAmount();
        }
        if (updateRequest.getName() != null){
            this.userName = updateRequest.getName();
        }
        this.profileUrl = profileUrl;
    }

    @OneToMany(mappedBy = "user", orphanRemoval = true)
    private List<FavoriteEntity> favorites;
}
