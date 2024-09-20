package com.example.AllEat.service;

import com.example.AllEat.dto.menu.AddMenuRequest;
import com.example.AllEat.entity.*;
import com.example.AllEat.entity.DiaryEntity.DiaryTime;
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
            DailyDiaryEntity findDailyDiary = dailyDiaryRepository.findByUser_idAndDate(findUser.getId(), LocalDate.now());
            Integer mealCalories = 0;
            System.out.println("여기에 들어오나");
            if (findDailyDiary == null) {
                System.out.println("비어있으니까 여기 들어와야 함");
                DailyDiaryEntity dailyDiaryEntity = DailyDiaryEntity.builder()
                        .date(LocalDate.now())
                        .dailyCalories(mealCalories)
                        .user(findUser)
                        .build();
                dailyDiaryRepository.save(dailyDiaryEntity);
                updateDailyDiary(dailyDiaryEntity, addMenuRequests, mealCalories);
                return dailyDiaryEntity;
            }
            System.out.println("그럼 여기구나");
            System.out.println(addMenuRequests.get(0).getDiaryTime());
            updateDailyDiary(findDailyDiary, addMenuRequests, mealCalories);
            return findDailyDiary;
        }
        return null;
    }
    public void updateDailyDiary(DailyDiaryEntity requestDailyDiary, List<AddMenuRequest> addMenuRequests, Integer mealCalories) {
        System.out.println("근데 왜 여기는 안들어옴 ?");
        System.out.println("diarytime : " + addMenuRequests.get(1).getDiaryTime());
        System.out.println("diarytime : " + addMenuRequests.get(0).getDiaryTime());
        DiaryEntity diaryEntity = DiaryEntity.builder()
                .diaryTime(DiaryTime.valueOf(addMenuRequests.get(0).getDiaryTime()))
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
        diaryEntity.updateCalories(mealCalories);
        diaryRepository.save(diaryEntity);

        requestDailyDiary.updateCalories(mealCalories);
        dailyDiaryRepository.save(requestDailyDiary);
    }
}
