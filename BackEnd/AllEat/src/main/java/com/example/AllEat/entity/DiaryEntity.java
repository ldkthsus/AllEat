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
        DINNER
    }

    @OneToMany(mappedBy = "diary",orphanRemoval = true, fetch = FetchType.LAZY)
//    @JsonManagedReference
    @JsonBackReference
    private List<DiaryMappingEntity> diaryMapping;

    @ManyToOne
    @JoinColumn(name = "daily_diary_id")
//    @JsonManagedReference
    @JsonBackReference
    private DailyDiaryEntity dailyDiary;

    public void updateCalories(Integer calories) {
        this.mealCalories = calories;
    }

//    @OneToMany(mappedBy = "mealpay", orphanRemoval = true, fetch = FetchType.LAZY)
//    private List<MealPayEntity> mealpay;

}
