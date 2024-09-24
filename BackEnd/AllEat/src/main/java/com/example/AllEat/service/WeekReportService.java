package com.example.AllEat.service;

import com.example.AllEat.entity.*;
import com.example.AllEat.jwt.JwtUtil;  // JWT 유틸리티 클래스 임포트
import com.example.AllEat.repository.DailyDiaryRepository;
import com.example.AllEat.repository.GoalRepository;
import com.example.AllEat.repository.UserRepository;
import com.example.AllEat.repository.WeightRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.servlet.http.HttpServletRequest;
import java.time.LocalDate;
import java.util.*;

@Service
public class WeekReportService {

    @Autowired
    private DailyDiaryRepository dailyDiaryRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private WeightRepository weightRepository;

    @Autowired
    private GoalRepository goalRepository;

    @Autowired
    private JwtUtil jwtUtil;  // JWT 유틸리티 사용

    public Map<String, Object> collectWeekReport(HttpServletRequest request) {
        // JWT 토큰에서 사용자 식별
        String token = request.getHeader("Authorization");
        if (token == null || !token.startsWith("Bearer ")) {
            throw new RuntimeException("Invalid or missing Authorization header");
        }
        token = token.substring(7); // "Bearer " 제거
        String email = jwtUtil.getEmail(token);

        UserEntity user = userRepository.findByEmail(email);
        if (user == null) {
            throw new RuntimeException("User not found");
        }

        // GoalEntity에서 목표 체중과 목표 식비 가져오기
        GoalEntity goal = goalRepository.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("Goal information not found for the user"));

        // 가장 최근에 작성한 현재 체중 가져오기
        Optional<WeightEntity> recentWeightRecord = weightRepository.findTopByUserOrderByCreatedAtDesc(user);
        Double currentWeight = recentWeightRecord.map(WeightEntity::getWeight).orElse(null);

        // 일주일 전 날짜 계산
        LocalDate endDate = LocalDate.now();
        LocalDate startDate = endDate.minusDays(7);

        // 일주일간 먹었던 메뉴의 영양 정보 계산
        List<DailyDiaryEntity> weeklyDiaries = dailyDiaryRepository.findByUserAndDateBetween(user, startDate, endDate);

        double totalCarbohydrates = 0.0;
        double totalProteins = 0.0;
        double totalFats = 0.0;
        int totalCalories = 0;
        int totalCost = 0;

        Map<String, Integer> restaurantTypeCount = new HashMap<>();
        for (DailyDiaryEntity diary : weeklyDiaries) {
            for (DiaryEntity diaryEntity : diary.getDiaryEntities()) {
                for (DiaryMappingEntity diaryMapping : diaryEntity.getDiaryMapping()) {
                    MenuEntity menu = diaryMapping.getMenu();
                    RestaurantsEntity restaurant = menu.getRestaurants();

                    totalCarbohydrates += menu.getMenuCarbohydrate() != null ? menu.getMenuCarbohydrate() : 0.0;
                    totalProteins += menu.getMenuProtein() != null ? menu.getMenuProtein() : 0.0;
                    totalFats += menu.getMenuFat() != null ? menu.getMenuFat() : 0.0;
                    totalCalories += menu.getMenuCalories() != null ? menu.getMenuCalories() : 0;
                    totalCost += menu.getMenuPrice() != null ? menu.getMenuPrice() : 0;

                    String restaurantType = restaurant.getRestaurantsType().name();
                    restaurantTypeCount.put(restaurantType, restaurantTypeCount.getOrDefault(restaurantType, 0) + 1);
                }
            }
        }

        // 평균값 계산
        double averageCarbohydrates = totalCarbohydrates / 7;
        double averageProteins = totalProteins / 7;
        double averageFats = totalFats / 7;
        double averageCalories = (double) totalCalories / 7;

        // 레스토랑 타입 중 가장 많은 것을 찾기
        String mostCommonRestaurantType = restaurantTypeCount.entrySet().stream()
                .max(Map.Entry.comparingByValue())
                .map(Map.Entry::getKey)
                .orElse("Unknown");

        // FastAPI로 전달할 JSON 데이터 생성
        Map<String, Object> reportData = new HashMap<>();
        reportData.put("goal_weight", goal.getGoalWeight());
        reportData.put("goal_cost", goal.getGoalCost());
        reportData.put("recent_weight", currentWeight); // 가장 최근에 작성한 현재 체중 추가
        reportData.put("average_carbohydrates", averageCarbohydrates);
        reportData.put("average_proteins", averageProteins);
        reportData.put("average_fats", averageFats);
        reportData.put("average_calories", averageCalories);
        reportData.put("total_cost", totalCost);
        reportData.put("most_common_restaurant_type", mostCommonRestaurantType);

        return reportData;
    }
}
