package com.example.AllEat.repository;

import com.example.AllEat.entity.DiaryEntity;
import com.example.AllEat.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface DiaryRepository extends JpaRepository<DiaryEntity, Integer> {
    // 기존 메서드
    List<DiaryEntity> findByDailyDiary_Date(LocalDate date);

    DiaryEntity findByDailyDiary_idAndDiaryTime(Integer dailyDiaryId, DiaryEntity.DiaryTime diaryTime);

    // DailyDiaryEntity를 통해서 UserEntity와 날짜로 일기 조회
    List<DiaryEntity> findByDailyDiary_UserAndDailyDiary_Date(UserEntity user, LocalDate date);
}