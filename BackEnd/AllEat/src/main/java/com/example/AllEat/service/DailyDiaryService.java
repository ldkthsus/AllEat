package com.example.AllEat.service;

import com.example.AllEat.dto.menu.AddMenuRequest;
import com.example.AllEat.entity.*;
import com.example.AllEat.repository.DailyDiaryRepository;
import com.example.AllEat.repository.DiaryMappingRepository;
import com.example.AllEat.repository.DiaryRepository;
import com.example.AllEat.repository.MenuRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DailyDiaryService {

    private final DailyDiaryRepository dailyDiaryRepository;
    private final UserService userService;
    private final MenuRepository menuRepository;
    private final DiaryRepository diaryRepository;
    private final DiaryMappingRepository diaryMappingRepository;

    public DailyDiaryEntity getDailyDiary(HttpServletRequest request, List<AddMenuRequest> addMenuRequests) {
        UserEntity findUser = userService.findByRequest(request);
        if (findUser != null) {
            // 메서드 명을 정확히 수정: findByUser_IdAndDate
            DailyDiaryEntity findDailyDiary = dailyDiaryRepository.findByUser_IdAndDate(findUser.getId(), LocalDate.now());
            Integer mealCalories = 0;

            if (findDailyDiary == null) {
                DailyDiaryEntity dailyDiaryEntity = DailyDiaryEntity.builder()
                        .date(LocalDate.now())
                        .dailyCalories(mealCalories)
                        .user(findUser)
                        .build();
                dailyDiaryRepository.save(dailyDiaryEntity);
                updateDailyDiary(dailyDiaryEntity, addMenuRequests, mealCalories);
                return dailyDiaryEntity;
            }
            updateDailyDiary(findDailyDiary, addMenuRequests, mealCalories);
            return findDailyDiary;
        }
        return null;
    }

    public void updateDailyDiary(DailyDiaryEntity requestDailyDiary, List<AddMenuRequest> addMenuRequests, Integer mealCalories) {
        DiaryEntity diaryEntity = DiaryEntity.builder()
                .diaryTime(DiaryEntity.DiaryTime.valueOf(addMenuRequests.get(0).getDiaryTime()))
                .mealCalories(mealCalories)
                .dailyDiary(requestDailyDiary)
                .build();
        diaryRepository.save(diaryEntity);

        for (AddMenuRequest menuIdRequest : addMenuRequests) {
            MenuEntity findMenu = menuRepository.findById(menuIdRequest.getMenuId()).orElseThrow(() -> new IllegalArgumentException("menu not found"));
            mealCalories += findMenu.getMenuCalories();
            DiaryMappingEntity diaryMappingEntity = DiaryMappingEntity.builder()
                    .diary(diaryEntity)
                    .menu(findMenu)
                    .build();

            diaryMappingRepository.save(diaryMappingEntity);
        }

        // 업데이트된 칼로리를 엔티티에 반영
        diaryEntity.updateCalories(mealCalories);
        diaryRepository.save(diaryEntity);

        requestDailyDiary.updateCalories(mealCalories);
        dailyDiaryRepository.save(requestDailyDiary);
    }
}
