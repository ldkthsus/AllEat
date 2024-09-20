package com.example.AllEat.repository;

import com.example.AllEat.entity.DailyDiaryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Date;

public interface DailyDiaryRepository extends JpaRepository<DailyDiaryEntity, Integer> {

    public DailyDiaryEntity findByUser_idAndDate(Integer userId, LocalDate localDate);
}
