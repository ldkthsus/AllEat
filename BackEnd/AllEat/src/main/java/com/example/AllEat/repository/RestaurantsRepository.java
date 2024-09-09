package com.example.AllEat.repository;

import com.example.AllEat.entity.RestaurantsEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RestaurantsRepository extends JpaRepository<RestaurantsEntity, Integer> {

}
