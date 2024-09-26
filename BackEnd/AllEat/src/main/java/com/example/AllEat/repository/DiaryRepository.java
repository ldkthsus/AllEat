package com.example.AllEat.repository;

import com.example.AllEat.entity.DiaryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DiaryRepository extends JpaRepository<DiaryEntity, Integer> {
    DiaryEntity findByDailyDiary_idAndDiaryTime(Integer dailtDiaryId, DiaryEntity.DiaryTime diaryTime);
}
