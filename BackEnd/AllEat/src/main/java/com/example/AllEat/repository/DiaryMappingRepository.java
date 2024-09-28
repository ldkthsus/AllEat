package com.example.AllEat.repository;

import com.example.AllEat.entity.DiaryMappingEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DiaryMappingRepository extends JpaRepository<DiaryMappingEntity, Integer> {
    List<DiaryMappingEntity> findByDiary_id(Integer diaryId);
}
