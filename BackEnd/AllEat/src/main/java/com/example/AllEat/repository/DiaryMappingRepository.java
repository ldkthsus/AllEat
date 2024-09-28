package com.example.AllEat.repository;

import com.example.AllEat.entity.DiaryMappingEntity;
import com.example.AllEat.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DiaryMappingRepository extends JpaRepository<DiaryMappingEntity, Integer> {
    // 기존의 diaryId로 검색하는 메서드
    List<DiaryMappingEntity> findByDiary_Id(Integer diaryId);

    // 새로운 메서드: diaryId와 사용자 정보를 함께 검색
    List<DiaryMappingEntity> findByDiary_IdAndDiary_User(Integer diaryId, UserEntity user);
}
