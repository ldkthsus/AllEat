package com.example.AllEat.entity;

import com.example.AllEat.dto.user.UpdateRequest;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;
import java.sql.Timestamp;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "User")
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
    private int userGender;

    @Column(name = "user_age")
    private int userAge;

    @Column(name = "refresh_Token")
    private String refreshToken;

    @Column(name = "expiration")
    private Timestamp expiration;

    @Column(name = "amount_activity")
    private Integer amountActivity;

    @OneToMany(mappedBy = "user", orphanRemoval = true, fetch = FetchType.LAZY)
    private List<WeightEntity> weights;

    @OneToOne(mappedBy = "user", orphanRemoval = true, fetch = FetchType.LAZY)
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

    public void updateInfo(UpdateRequest updateRequest, String profileUrl){
        this.password = updateRequest.getPassword2();
        goals.update(updateRequest.getGoalWeight(), updateRequest.getGoalCost());
        if (this.weights != null && !this.weights.isEmpty()) {
            WeightEntity lastWeight = this.weights.get(this.weights.size() - 1);
            lastWeight.updateWeight(updateRequest.getWeight()); // 필요에 따라 세부 수정
        }
        this.profileUrl = profileUrl;
    }

    @OneToMany(mappedBy = "user", orphanRemoval = true)
    private List<FavoriteEntity> favorites;
}
