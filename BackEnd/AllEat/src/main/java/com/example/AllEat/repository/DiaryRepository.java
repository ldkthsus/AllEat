package com.example.AllEat.repository;

import com.example.AllEat.entity.DiaryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface DiaryRepository extends JpaRepository<DiaryEntity, Integer> {
    List<DiaryEntity> findByDailyDiary_Date(LocalDate date);
}
