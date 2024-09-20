package com.example.AllEat.dto.menu;

import com.example.AllEat.entity.DailyDiaryEntity;
import com.example.AllEat.entity.DiaryEntity;
import com.example.AllEat.entity.UserEntity;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DailyDiaryResponse {

    @JsonProperty("daily_diary_id")
    private Integer dailyDiaryId;

    @JsonProperty("date")
    private LocalDate date;

    @JsonProperty("daily_calories")
    private Integer dailyCalories;

    @JsonProperty("diary_list")
    private List<DiaryEntity> diaryEntityList;

    @JsonProperty("user_id")
    private Integer userId;

    @JsonProperty("email")
    private String email;

    @JsonProperty("user_name")
    private String userName;

    @JsonProperty("profile_url")
    private String profileUrl;

    @JsonProperty("user_height")
    private Double userHeight;

    @JsonProperty("user_gender")
    private Integer userGender;

    @JsonProperty("user_age")
    private Integer userAge;

    @JsonProperty("amount_activity")
    private Integer amountActivity;

    public void FromEntity(DailyDiaryEntity dailyDiaryEntity, UserEntity userEntity) {
        this.dailyDiaryId = dailyDiaryEntity.getId();
        this.date = dailyDiaryEntity.getDate();
        this.dailyCalories = dailyDiaryEntity.getDailyCalories();
        this.diaryEntityList = dailyDiaryEntity.getDiaryEntities();
        this.userId = userEntity.getId();
        this.email = userEntity.getEmail();
        this.userName = userEntity.getUserName();
        this.profileUrl = userEntity.getProfileUrl();
        this.userHeight = userEntity.getUserHeight();
        this.userGender = userEntity.getUserGender();
        this.userAge = userEntity.getUserAge();
        this.amountActivity = userEntity.getAmountActivity();
    }
}
