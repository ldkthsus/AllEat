package com.example.AllEat.service;

import com.example.AllEat.dto.menu.MenuRequestDTO;
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

        public DailyDiaryResponseDTO getDailyDiary(HttpServletRequest request, UpdateMenuRequestDTO requestMenuDTO) {
            UserEntity findUser = userService.findByRequest(request);
            if (findUser != null) {
                DailyDiaryEntity findDailyDiary = dailyDiaryRepository.findByUser_idAndDate(findUser.getId(), requestMenuDTO.getDate());
                Integer mealCalories = 0;
                if (findDailyDiary == null) {
                    DailyDiaryEntity dailyDiary = DailyDiaryEntity.builder()
                            .date(requestMenuDTO.getDate())
                            .dailyCalories(mealCalories)
                            .user(findUser)
                            .build();
                    dailyDiaryRepository.save(dailyDiary);
                    return updateDailyDiary(dailyDiary, requestMenuDTO, mealCalories, findUser);
                }
                return updateDailyDiary(findDailyDiary, requestMenuDTO, mealCalories, findUser);

            }
            return null;
        }
        public DailyDiaryResponseDTO updateDailyDiary(DailyDiaryEntity requestDailyDiary, UpdateMenuRequestDTO requestMenuDTO, Integer mealCalories, UserEntity requestUser) {
            DiaryEntity findDiary = diaryRepository.findByDailyDiary_idAndDiaryTime(requestDailyDiary.getId(), requestMenuDTO.getDiaryTime());
            Integer dailyPrice = 0;
            Boolean isHaveDiary = true;
            DiaryEntity useDiary = new DiaryEntity();
            if (findDiary == null) {
                isHaveDiary = false;

                DiaryEntity diary = DiaryEntity.builder()
                        .diaryTime(requestMenuDTO.getDiaryTime())
                        .mealCalories(mealCalories)
                        .dailyDiary(requestDailyDiary)
                        .dailyPrice(dailyPrice)
                        .build();
                diaryRepository.save(diary);
                useDiary = diary;
            }
            if(isHaveDiary) {
                useDiary = findDiary;
            }

            for (MenuRequestDTO menuIdRequest : requestMenuDTO.getMenus()) {
                MenuEntity findMenu = menuRepository.findById(menuIdRequest.getMenuId()).orElseThrow(() -> new IllegalArgumentException("menu not found"));
                mealCalories += findMenu.getMenuCalories();
                dailyPrice += findMenu.getMenuPrice();
                DiaryMappingEntity diaryMappingEntity = DiaryMappingEntity.builder()
                        .diary(useDiary)
                        .menu(findMenu)
                        .personCount(menuIdRequest.getPersonCount())
                        .build();

                diaryMappingRepository.save(diaryMappingEntity);
            }
            useDiary.updateDetails(mealCalories, dailyPrice);
            diaryRepository.save(useDiary);

            requestDailyDiary.updateCalories(mealCalories);
            dailyDiaryRepository.save(requestDailyDiary);

            DailyDiaryResponseDTO dailyDiaryResponse = new DailyDiaryResponseDTO();
            dailyDiaryResponse.FromEntity(requestDailyDiary, requestUser);

            return dailyDiaryResponse;
        }

//    public DailyDiaryResponseDTO modifiedDailyDiary(UpdateMenuRequestDTO updateMenuRequestDTO, HttpServletRequest request) {
//        UserEntity findUser = userService.findByRequest(request);
//        if (findUser != null) {
//            DailyDiaryEntity findDailyDiary ;
//            findDailyDiary = dailyDiaryRepository.findByUser_idAndDate(findUser.getId(), updateMenuRequestDTO.getDate());
//            Integer dailyCalories = 0;
//            if (findDailyDiary == null) {
//                findDailyDiary= DailyDiaryEntity.builder()
//                        .date(updateMenuRequestDTO.getDate())
//                        .dailyCalories(dailyCalories)
//                        .user(findUser)
//                        .build();
//                dailyDiaryRepository.save(findDailyDiary);
//            }
//
//            return modifiedDailyDiaryDetails(findDailyDiary, updateMenuRequestDTO, dailyCalories, findUser);
//        }
//        return null;
//    }
//
//    public DailyDiaryResponseDTO modifiedDailyDiaryDetails(DailyDiaryEntity requestDailyDiary, UpdateMenuRequestDTO requestUpdateDTO, Integer dailyCalories, UserEntity requestUser) {
//        DiaryEntity findDiary ;
//        findDiary = diaryRepository.findByDailyDiary_idAndDiaryTime(requestDailyDiary.getId(), DiaryTime.valueOf(requestUpdateDTO.getAddMenuRequestDTOList().get(0).getDiaryTime()));
//        Integer dailyPrice = 0;
//        if (findDiary == null) {
//            findDiary = DiaryEntity.builder()
//                    .diaryTime(DiaryTime.valueOf(requestUpdateDTO.getAddMenuRequestDTOList().get(0).getDiaryTime()))
//                    .mealCalories(dailyCalories)
//                    .dailyDiary(requestDailyDiary)
//                    .dailyPrice(dailyPrice)
//                    .build();
//            diaryRepository.save(findDiary);
//        }
//
//        for (AddMenuRequestDTO menuIdRequest : requestUpdateDTO.getAddMenuRequestDTOList()) {
//            MenuEntity findMenu = menuRepository.findById(menuIdRequest.getMenuId()).orElseThrow(() -> new IllegalArgumentException("menu not found"));
//            dailyCalories += findMenu.getMenuCalories();
//            dailyPrice += findMenu.getMenuPrice();
//            DiaryMappingEntity diaryMappingEntity = DiaryMappingEntity.builder()
//                    .diary(findDiary)
//                    .menu(findMenu)
//                    .build();
//
//            diaryMappingRepository.save(diaryMappingEntity);
//        }
//
//        findDiary.updateDetails(dailyCalories, dailyPrice);
//        diaryRepository.save(findDiary);
//
//        requestDailyDiary.updateCalories(dailyCalories);
//        dailyDiaryRepository.save(requestDailyDiary);
//
//        DailyDiaryResponseDTO dailyDiaryResponse = new DailyDiaryResponseDTO();
//        dailyDiaryResponse.FromEntity(requestDailyDiary, requestUser);
//
//        return dailyDiaryResponse;
//    }

}
