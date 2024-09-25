package com.example.AllEat.service;

import com.example.AllEat.dto.data.DetailDataDTO;
import com.example.AllEat.entity.DiaryMappingEntity;
import com.example.AllEat.repository.DiaryMappingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DetailDataService {

    @Autowired
    private DiaryMappingRepository diaryMappingRepository;

    public List<DetailDataDTO> getMenusByDiaryId(Integer diaryId) {
        // diaryId로 DiaryMappingEntity 리스트를 가져온다.
        List<DiaryMappingEntity> diaryMappings = diaryMappingRepository.findByDiary_Id(diaryId);

        // 각 DiaryMappingEntity에서 MenuEntity를 추출하여 DetailDataDTO로 변환하여 반환한다.
        return diaryMappings.stream()
                .map(mapping -> {
                    var menu = mapping.getMenu();
                    return new DetailDataDTO(
                            menu.getId(),
                            menu.getMenuName(),
                            menu.getMenuPrice(),
                            menu.getMenuCalories(),
                            menu.getRestaurants().getRestaurantsType().getType(),
                            menu.getRestaurants().getRestaurantsName()
                    );
                })
                .collect(Collectors.toList());
    }
}
