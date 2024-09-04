package com.example.AllEat.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.AllEat.entity.WeightEntity;

public interface WeightRepository extends JpaRepository<WeightEntity, Integer> {
}
