package com.example.AllEat.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

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

}
