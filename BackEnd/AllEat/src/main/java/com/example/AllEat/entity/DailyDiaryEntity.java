package com.example.AllEat.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "daily_diary")
public class DailyDiaryEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "daily_diary_id")
    private Integer dailyDiaryId;

    @Column(name = "date")
    private LocalDate date;

    @Column(name = "daily_calories")
    private Integer dailyCalories;

    @OneToMany(mappedBy = "dailyDiary", orphanRemoval = true, fetch = FetchType.LAZY)
    private List<DiaryEntity> diaryEntities;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserEntity user;
}
