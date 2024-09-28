package com.example.AllEat.repository;

import com.example.AllEat.entity.DiaryMappingEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

import java.util.List;

@Repository
public interface DiaryMappingRepository extends JpaRepository<DiaryMappingEntity, Integer> {
    List<DiaryMappingEntity> findByDiary_id(Integer diaryId);
}
