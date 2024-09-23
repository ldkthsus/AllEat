package com.example.AllEat.dto.user;

import com.example.AllEat.entity.AlarmEntity;
import com.example.AllEat.entity.GoalEntity;
import com.example.AllEat.entity.UserEntity;
import com.example.AllEat.entity.WeightEntity;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class UserResponseDTO {

    @JsonProperty("email")
    private String email;

    @JsonProperty("user_name")
    private String userName;

    @JsonProperty("social_login")
    private String socialLogin;

    @JsonProperty("profile_url")
    private String profileUrl;

    @JsonProperty("user_height")
    private Double userHeight;

    @JsonProperty("user_gender")
    private Integer userGender;

    @JsonProperty("user_age")
    private Integer userAge;

    @JsonProperty("activity_amount")
    private Integer activityAmount;

    @JsonProperty("weights")
    private List<WeightEntity> weights;

    @JsonProperty("goal")
    private GoalEntity goal;

    @JsonProperty("alarm")
    private AlarmEntity alarm;

    public void fromEntity(UserEntity userEntity) {
        this.email = userEntity.getEmail();
        this.userName = userEntity.getUserName();
        this.socialLogin = userEntity.getSocialLogin();
        this.profileUrl = userEntity.getProfileUrl();
        this.userHeight = userEntity.getUserHeight();
        this.userGender = userEntity.getUserGender();
        this.userAge = userEntity.getUserAge();
        this.activityAmount = userEntity.getActivityAmount();
        this.weights = userEntity.getWeights();
        this.goal = userEntity.getGoals();
        this.alarm = userEntity.getAlarm();
    }
}
