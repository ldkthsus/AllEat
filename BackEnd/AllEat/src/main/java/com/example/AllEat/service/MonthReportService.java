package com.example.AllEat.service;

import com.example.AllEat.dto.weight.WeightResponseDTO;
import com.example.AllEat.entity.*;
import com.example.AllEat.jwt.JwtUtil;
import com.example.AllEat.repository.DailyDiaryRepository;
import com.example.AllEat.repository.GoalRepository;
import com.example.AllEat.repository.UserRepository;
import com.example.AllEat.repository.WeightRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.servlet.http.HttpServletRequest;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.*;

@Service
public class MonthReportService {

    @Autowired
    private DailyDiaryRepository dailyDiaryRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private WeightRepository weightRepository;

    @Autowired
    private GoalRepository goalRepository;

    @Autowired
    private JwtUtil jwtUtil;

    public Map<String, Object> collectMonthReport(String yearMonth, HttpServletRequest request) {
        // JWT 토큰에서 사용자 식별
        String token = request.getHeader("Authorization").substring(7);
        String email = jwtUtil.getEmail(token);
        UserEntity user = userRepository.findByEmail(email);
        if (user == null) {
            throw new RuntimeException("User not found");
        }

        // Goal 정보 가져오기
        GoalEntity goal = goalRepository.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("Goal information not found for the user"));

        // 해당 월의 시작일과 종료일 계산
        LocalDate startDate = LocalDate.parse(yearMonth + "-01");
        LocalDate endDate = startDate.withDayOfMonth(startDate.lengthOfMonth());

        // 해당 월에 기록된 몸무게 데이터 가져오기
        List<WeightResponseDTO> weightRecords = weightRepository.findByUserEntityAndDateRange(user,
                java.sql.Date.valueOf(startDate), java.sql.Date.valueOf(endDate));

        // 기록된 몸무게 데이터의 날짜 변환 및 저장
        List<Map<String, Object>> processedWeightRecords = new ArrayList<>();
        for (WeightResponseDTO record : weightRecords) {
            Map<String, Object> weightData = new HashMap<>();
            // createdAt을 "YYYY-MM-DD" 형식으로 변환
            LocalDate date = record.getCreatedAt().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
            weightData.put("date", date.toString());
            weightData.put("weight", record.getWeight());
            processedWeightRecords.add(weightData);
        }

        // 해당 월에 먹었던 메뉴의 영양 정보 계산
        List<DailyDiaryEntity> monthlyDiaries = dailyDiaryRepository.findByUserAndDateBetween(user, startDate, endDate);

        double totalCarbohydrates = 0.0;
        double totalProteins = 0.0;
        double totalFats = 0.0;
        int totalCalories = 0;
        int totalCost = 0;

        int dayCount = 0;
        Map<String, Integer> restaurantTypeCount = new HashMap<>();

        for (DailyDiaryEntity diary : monthlyDiaries) {
            dayCount++;
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
        double averageCarbohydrates = totalCarbohydrates / dayCount;
        double averageProteins = totalProteins / dayCount;
        double averageFats = totalFats / dayCount;
        double averageCalories = (double) totalCalories / dayCount;

        // 레스토랑 타입 중 가장 많은 것을 찾기
        String mostCommonRestaurantType = restaurantTypeCount.entrySet().stream()
                .max(Map.Entry.comparingByValue())
                .map(Map.Entry::getKey)
                .orElse("Unknown");

        // FastAPI로 전달할 JSON 데이터 생성
        Map<String, Object> reportData = new HashMap<>();
        reportData.put("goal_weight", goal.getGoalWeight());
        reportData.put("goal_cost", goal.getGoalCost());
        reportData.put("average_carbohydrates", averageCarbohydrates);
        reportData.put("average_proteins", averageProteins);
        reportData.put("average_fats", averageFats);
        reportData.put("average_calories", averageCalories);
        reportData.put("total_cost", totalCost);
        reportData.put("most_common_restaurant_type", mostCommonRestaurantType);
        reportData.put("weight_records", processedWeightRecords); // 변환된 몸무게 기록들 추가

        return reportData;
    }
}
