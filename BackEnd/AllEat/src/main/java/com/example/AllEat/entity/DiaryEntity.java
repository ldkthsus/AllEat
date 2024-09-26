package com.example.AllEat.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "diary")
public class DiaryEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Enumerated(EnumType.STRING)
    private DiaryTime diaryTime;

    @Column(name = "meal_calories")
    private Integer mealCalories;

    public enum DiaryTime {
        BREAKFAST,
        LUNCH,
        DINNER,
        SNACK
    }

    @OneToMany(mappedBy = "diary", orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonManagedReference // 부모 측에 해당하는 어노테이션
    private List<DiaryMappingEntity> diaryMapping;

    @ManyToOne
    @JoinColumn(name = "daily_diary_id")
    @JsonBackReference // 자식 측에 해당하는 어노테이션
    private DailyDiaryEntity dailyDiary;

    @Column(name = "daily_price")
    private Integer dailyPrice;

    public void updateCalories(Integer calories) {

        this.mealCalories = calories;
        this.dailyPrice = price;
    }

    @OneToMany(mappedBy = "diary", orphanRemoval = true, fetch = FetchType.LAZY)
    private List<MealPayEntity> mealpay;
}

