package com.example.AllEat.repository;

import com.example.AllEat.entity.MealPayEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MealPayRepository extends JpaRepository<MealPayEntity, Integer> {

    MealPayEntity findByPayTransaction_id(Integer payTransaction_id);
}
