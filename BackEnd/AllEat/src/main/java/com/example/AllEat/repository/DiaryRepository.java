package com.example.AllEat.repository;

import com.example.AllEat.entity.DiaryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DiaryRepository extends JpaRepository<DiaryEntity, Integer> {
}
