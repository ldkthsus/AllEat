package com.example.AllEat.service;

import com.example.AllEat.entity.*;
import com.example.AllEat.jwt.JwtUtil;
import com.example.AllEat.repository.*;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import java.time.LocalDate;
import java.util.*;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpEntity;
import org.springframework.web.client.RestTemplate;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ReportService {

    @Autowired
    private DailyDiaryRepository dailyDiaryRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private WeightRepository weightRepository;
    @Autowired
    private GoalRepository goalRepository;
    @Autowired
    private DayReportRepository dayReportRepository;

    private final JwtUtil jwtUtil;

    @Autowired
    public ReportService(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    public UserEntity findUserByRequest(HttpServletRequest request) {
        String token = request.getHeader("Authorization").substring(7);
        String email = jwtUtil.getEmail(token);
        return userRepository.findByEmail(email);
    }

    @Transactional
    public List<Map<String, Object>> handleDayReportRequest(String day, HttpServletRequest request) {
        UserEntity user = findUserByRequest(request);
        if (user == null) {
            throw new RuntimeException("User not found");
        }

        LocalDate date = LocalDate.parse(day);
        // Food details만 반환
        return collectDayFoodInfo(day, request);
    }

    public List<Map<String, Object>> collectDayFoodInfo(String day, HttpServletRequest request) {
        UserEntity user = findUserByRequest(request);
        if (user == null) {
            throw new RuntimeException("User not found");
        }

        LocalDate date = LocalDate.parse(day);
        DailyDiaryEntity dailyDiary = dailyDiaryRepository.findByUserAndDate(user, date);
        if (dailyDiary == null) {
            throw new RuntimeException("No daily diary found for the user on this date");
        }

        List<Map<String, Object>> foodDetails = new ArrayList<>();

        for (DiaryEntity diary : dailyDiary.getDiaryEntities()) {
            for (DiaryMappingEntity diaryMapping : diary.getDiaryMapping()) {
                MenuEntity menu = diaryMapping.getMenu();
                int personCount = diaryMapping.getPersonCount() != null ? diaryMapping.getPersonCount() : 1;

                Map<String, Object> menuDetail = new HashMap<>();
                menuDetail.put("menuName", menu.getMenuName());
                menuDetail.put("menuPrice", menu.getMenuPrice() != null ? menu.getMenuPrice() / personCount : 0);
                menuDetail.put("menuCarbohydrate", menu.getMenuCarbohydrate() != null ? menu.getMenuCarbohydrate() / personCount : 0.0);
                menuDetail.put("menuProtein", menu.getMenuProtein() != null ? menu.getMenuProtein() / personCount : 0.0);
                menuDetail.put("menuFat", menu.getMenuFat() != null ? menu.getMenuFat() / personCount : 0.0);
                menuDetail.put("menuCalories", menu.getMenuCalories() != null ? menu.getMenuCalories() / personCount : 0);
                menuDetail.put("restaurantName", menu.getRestaurants().getRestaurantsName());
                menuDetail.put("restaurantType", menu.getRestaurants().getRestaurantsType().name());

                foodDetails.add(menuDetail);
            }
        }

        return foodDetails;
    }
}