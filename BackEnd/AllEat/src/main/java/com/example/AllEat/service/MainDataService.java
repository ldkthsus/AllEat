package com.example.AllEat.service;

import com.example.AllEat.dto.menu.MainDataDTO;
import com.example.AllEat.entity.DiaryEntity;
import com.example.AllEat.entity.DiaryMappingEntity;
import com.example.AllEat.entity.MenuEntity;
import com.example.AllEat.repository.DiaryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

@Service
public class MainDataService {

    @Autowired
    private DiaryRepository diaryRepository;

    public MainDataDTO getDiaryByDate(String date) {
        LocalDate localDate = LocalDate.parse(date);
        List<DiaryEntity> diaries = diaryRepository.findByDailyDiary_Date(localDate);

        // Processing data to fit the response DTO structure
        MainDataDTO mainDataDTO = new MainDataDTO();
        int totalKcal = 0, totalCarb = 0, totalProtein = 0, totalFat = 0, totalCost = 0;

        for (DiaryEntity diary : diaries) {
            int diaryCost = 0;
            totalKcal += diary.getMealCalories();

            // Retrieve information from DiaryMappingEntity to get associated MenuEntity
            for (DiaryMappingEntity mapping : diary.getDiaryMapping()) {
                MenuEntity menu = mapping.getMenu(); // Assuming DiaryMappingEntity has a getMenu() method
                if (menu != null) {
                    diaryCost += menu.getMenuPrice(); // Add menu_price to diary cost
                    totalCarb += menu.getMenuCarbohydrate() != null ? menu.getMenuCarbohydrate() : 0;
                    totalProtein += menu.getMenuProtein() != null ? menu.getMenuProtein() : 0;
                    totalFat += menu.getMenuFat() != null ? menu.getMenuFat() : 0;
                }
            }

            totalCost += diaryCost; // Adding diary cost to total cost
            mainDataDTO.addDiaryDetail(diary.getId(), diary.getDiaryTime().name(), diary.getMealCalories(), diaryCost);
        }

        mainDataDTO.setDayKcal(totalKcal);
        mainDataDTO.setDayCarb(totalCarb);
        mainDataDTO.setDayProtein(totalProtein);
        mainDataDTO.setDayFat(totalFat);
        mainDataDTO.setDayCost(totalCost);

        return mainDataDTO;
    }
}
