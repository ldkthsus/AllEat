package com.example.AllEat.service;

import com.example.AllEat.dto.menu.AddMenuRequestDTO;
import com.example.AllEat.dto.menu.DailyDiaryResponseDTO;
import com.example.AllEat.dto.menu.UpdateMenuRequestDTO;
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

    public DailyDiaryResponseDTO getDailyDiary(HttpServletRequest request, List<AddMenuRequestDTO> addMenuRequests) {
        UserEntity findUser = userService.findByRequest(request);
        if (findUser != null) {
            DailyDiaryEntity findDailyDiary = dailyDiaryRepository.findByUser_idAndDate(findUser.getId(), LocalDate.now()).orElse(null);
            Integer mealCalories = 0;
            if (findDailyDiary == null) {
                DailyDiaryEntity dailyDiaryEntity = DailyDiaryEntity.builder()
                        .date(LocalDate.now())
                        .dailyCalories(mealCalories)
                        .user(findUser)
                        .build();
                dailyDiaryRepository.save(dailyDiaryEntity);
                return updateDailyDiary(dailyDiaryEntity, addMenuRequests, mealCalories, findUser);
            }
            return updateDailyDiary(findDailyDiary, addMenuRequests, mealCalories, findUser);

        }
        return null;
    }
    public DailyDiaryResponseDTO updateDailyDiary(DailyDiaryEntity requestDailyDiary, List<AddMenuRequestDTO> addMenuRequests, Integer mealCalories, UserEntity requestUser) {
        DiaryEntity diaryEntity = DiaryEntity.builder()
                .diaryTime(DiaryTime.valueOf(addMenuRequests.get(0).getDiaryTime()))
                .mealCalories(mealCalories)
                .dailyDiary(requestDailyDiary)
                .build();
        diaryRepository.save(diaryEntity);

        for (AddMenuRequestDTO menuIdRequest : addMenuRequests) {
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

        DailyDiaryResponseDTO dailyDiaryResponse = new DailyDiaryResponseDTO();
        dailyDiaryResponse.FromEntity(requestDailyDiary, requestUser);

        return dailyDiaryResponse;
    }

    public DailyDiaryResponseDTO modifiedDailyDiary(UpdateMenuRequestDTO updateMenuRequestDTO, HttpServletRequest request) {
        UserEntity findUser = userService.findByRequest(request);
        if (findUser != null) {
            DailyDiaryEntity findDailyDiary = dailyDiaryRepository.findByUser_idAndDate(findUser.getId(), updateMenuRequestDTO.getDate()).orElseThrow(()-> new IllegalArgumentException("not found"));
            Integer dailyCalories = 0;
            if (findDailyDiary == null) {
                DailyDiaryEntity dailyDiaryEntity = DailyDiaryEntity.builder()
                        .date(updateMenuRequestDTO.getDate())
                        .dailyCalories(dailyCalories)
                        .user(findUser)
                        .build();
                dailyDiaryRepository.save(dailyDiaryEntity);
                return modifiedDailyDiaryDetails(dailyDiaryEntity, updateMenuRequestDTO, dailyCalories, findUser);
            }

            return modifiedDailyDiaryDetails(findDailyDiary, updateMenuRequestDTO, dailyCalories, findUser);
        }
        return null;
    }

    public DailyDiaryResponseDTO modifiedDailyDiaryDetails(DailyDiaryEntity requestDailyDiary, UpdateMenuRequestDTO requestUpdateDTO, Integer dailyCalories, UserEntity requestUser) {
        DiaryEntity diaryEntity = DiaryEntity.builder()
                .diaryTime(DiaryTime.valueOf(requestUpdateDTO.getAddMenuRequestDTOList().get(0).getDiaryTime()))
                .mealCalories(dailyCalories)
                .dailyDiary(requestDailyDiary)
                .build();
        diaryRepository.save(diaryEntity);

        for (AddMenuRequestDTO menuIdRequest : requestUpdateDTO.getAddMenuRequestDTOList()) {
            MenuEntity findMenu = menuRepository.findById(menuIdRequest.getMenuId()).orElseThrow(() -> new IllegalArgumentException("menu not found"));
            dailyCalories += findMenu.getMenuCalories();
            DiaryMappingEntity diaryMappingEntity = DiaryMappingEntity.builder()
                    .diary(diaryEntity)
                    .menu(findMenu)
                    .build();

            diaryMappingRepository.save(diaryMappingEntity);
        }

        diaryEntity.updateCalories(dailyCalories);
        diaryRepository.save(diaryEntity);

        requestDailyDiary.updateCalories(dailyCalories);
        dailyDiaryRepository.save(requestDailyDiary);

        DailyDiaryResponseDTO dailyDiaryResponse = new DailyDiaryResponseDTO();
        dailyDiaryResponse.FromEntity(requestDailyDiary, requestUser);

        return dailyDiaryResponse;
    }

}
