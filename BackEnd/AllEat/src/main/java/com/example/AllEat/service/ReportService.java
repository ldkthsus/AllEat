package com.example.AllEat.service;

import com.example.AllEat.entity.*;
import com.example.AllEat.jwt.JwtUtil;
import com.example.AllEat.repository.DailyDiaryRepository;
import com.example.AllEat.repository.UserRepository;
import com.example.AllEat.repository.WeightRepository;
import com.example.AllEat.repository.GoalRepository; // GoalEntity 정보를 가져오기 위한 Repository
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class ReportService {

    @Autowired
    private DailyDiaryRepository dailyDiaryRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private WeightRepository weightRepository;

    @Autowired
    private GoalRepository goalRepository; // GoalEntity 정보를 가져오기 위해 사용

    private final JwtUtil jwtUtil;

    @Autowired
    public ReportService(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    // JWT 토큰을 이용해 사용자 식별
    public UserEntity findUserByRequest(HttpServletRequest request) {
        String token = request.getHeader("Authorization").substring(7);  // "Bearer " 부분 제거
        String email = jwtUtil.getEmail(token);
        return userRepository.findByEmail(email);
    }

    public Object collectDayReport(String day, HttpServletRequest request) {
        // JWT 토큰을 이용해 사용자 식별
        UserEntity user = findUserByRequest(request);
        if (user == null) {
            throw new RuntimeException("User not found");
        }

        // day 값을 LocalDate로 변환
        LocalDate date = LocalDate.parse(day);

        // 해당 사용자의 특정 날짜의 일간 데이터를 가져옴
        DailyDiaryEntity dailyDiary = dailyDiaryRepository.findByUserAndDate(user, date);
        if (dailyDiary == null) {
            throw new RuntimeException("No daily diary found for the user on this date");
        }

        // 최근 기록한 체중 정보 가져오기
        WeightEntity recentWeightRecord = weightRepository.findRecent(user);

        // GoalEntity에서 목표 체중과 목표 식비 가져오기
        Optional<GoalEntity> userGoalOptional = goalRepository.findByUserId(user.getId());
        if (userGoalOptional.isEmpty()) {
            throw new RuntimeException("Goal information not found for the user");
        }

        GoalEntity userGoal = userGoalOptional.get();
        double goalWeight = userGoal.getGoalWeight();
        int goalCost = userGoal.getGoalCost();

        // 그날의 메뉴들에 대한 영양소와 식비 합산
        double totalCarbohydrates = 0.0;
        double totalProteins = 0.0;
        double totalFats = 0.0;
        int totalCalories = 0;
        int totalCost = 0;

        // dailyDiary에서 얻어온 diaryEntities를 통해 영양소와 비용 계산
        if (dailyDiary.getDiaryEntities() != null) {
            for (DiaryEntity diary : dailyDiary.getDiaryEntities()) {
                if (diary.getDiaryMapping() != null) {
                    for (DiaryMappingEntity diaryMapping : diary.getDiaryMapping()) {
                        MenuEntity menu = diaryMapping.getMenu();
                        totalCarbohydrates += menu.getMenuCarbohydrate() != null ? menu.getMenuCarbohydrate() : 0.0;
                        totalProteins += menu.getMenuProtein() != null ? menu.getMenuProtein() : 0.0;
                        totalFats += menu.getMenuFat() != null ? menu.getMenuFat() : 0.0;
                        totalCalories += menu.getMenuCalories() != null ? menu.getMenuCalories() : 0;
                        totalCost += menu.getMenuPrice() != null ? menu.getMenuPrice() : 0;
                    }
                }
            }
        }

        // FastAPI로 전달할 JSON 데이터 생성
        Map<String, Object> reportData = new HashMap<>();
        reportData.put("total_carbohydrates", totalCarbohydrates);
        reportData.put("total_proteins", totalProteins);
        reportData.put("total_fats", totalFats);
        reportData.put("total_calories", totalCalories);
        reportData.put("total_cost", totalCost);

        // 최근 체중, 목표 체중, 목표 식비 추가
        reportData.put("recent_weight", recentWeightRecord != null ? recentWeightRecord.getWeight() : 0.0); // 최근 기록한 체중
        reportData.put("goal_weight", goalWeight); // 목표 체중
        reportData.put("goal_cost", goalCost); // 목표 식비

        return reportData;
    }
}
