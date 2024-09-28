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

        // If no data is found, return all values as null
        if (diaries == null || diaries.isEmpty()) {
            MainDataDTO emptyDataDTO = new MainDataDTO();
            emptyDataDTO.setDayKcal(null);
            emptyDataDTO.setDayCarb(null);
            emptyDataDTO.setDayProtein(null);
            emptyDataDTO.setDayFat(null);
            emptyDataDTO.setDayCost(null);
            return emptyDataDTO;
        }

        // Processing data to fit the response DTO structure
        MainDataDTO mainDataDTO = new MainDataDTO();
        int totalKcal = 0, totalCarb = 0, totalProtein = 0, totalFat = 0, totalCost = 0;

        for (DiaryEntity diary : diaries) {
            int diaryCost = 0;
            double diaryKcal = 0.0; // Initialize diary-specific kcal

            // Retrieve information from DiaryMappingEntity to get associated MenuEntity
            for (DiaryMappingEntity mapping : diary.getDiaryMapping()) {
                MenuEntity menu = mapping.getMenu(); // Assuming DiaryMappingEntity has a getMenu() method
                if (menu != null && mapping.getPersonCount() != null && mapping.getPersonCount() > 0) {
                    int adjustedPrice = (int) Math.round(menu.getMenuPrice() / (double) mapping.getPersonCount());
                    int adjustedCarb = (int) Math.round((menu.getMenuCarbohydrate() != null ? menu.getMenuCarbohydrate() : 0) / (double) mapping.getPersonCount());
                    int adjustedProtein = (int) Math.round((menu.getMenuProtein() != null ? menu.getMenuProtein() : 0) / (double) mapping.getPersonCount());
                    int adjustedFat = (int) Math.round((menu.getMenuFat() != null ? menu.getMenuFat() : 0) / (double) mapping.getPersonCount());
                    double adjustedKcal = (menu.getMenuCalories() / (double) mapping.getPersonCount());

                    diaryCost += adjustedPrice;
                    totalCarb += adjustedCarb;
                    totalProtein += adjustedProtein;
                    totalFat += adjustedFat;
                    diaryKcal += adjustedKcal; // Add the adjusted kcal
                }
            }

            totalKcal += diaryKcal; // Add the adjusted diary kcal to total kcal
            totalCost += diaryCost; // Adding diary cost to total cost
            mainDataDTO.addDiaryDetail(diary.getId(), diary.getDiaryTime().name(), (int) Math.round(diaryKcal), diaryCost);
        }

        mainDataDTO.setDayKcal(totalKcal);
        mainDataDTO.setDayCarb(totalCarb);
        mainDataDTO.setDayProtein(totalProtein);
        mainDataDTO.setDayFat(totalFat);
        mainDataDTO.setDayCost(totalCost);

        return mainDataDTO;
    }
}
