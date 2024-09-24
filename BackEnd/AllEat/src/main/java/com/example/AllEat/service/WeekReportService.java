package com.example.AllEat.service;

import com.example.AllEat.entity.*;
import com.example.AllEat.jwt.JwtUtil;
import com.example.AllEat.repository.DailyDiaryRepository;
import com.example.AllEat.repository.GoalRepository;
import com.example.AllEat.repository.UserRepository;
import com.example.AllEat.repository.WeightRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
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
    private JwtUtil jwtUtil;

    private final RestTemplate restTemplate = new RestTemplate();

    public Map<String, Object> collectWeekReport(String day, HttpServletRequest request) {
        // JWT 토큰 및 사용자 식별
        String token = request.getHeader("Authorization");
        if (token == null || !token.startsWith("Bearer ")) {
            throw new RuntimeException("Invalid or missing Authorization header");
        }
        token = token.substring(7);
        String email = jwtUtil.getEmail(token);
        UserEntity user = userRepository.findByEmail(email);
        if (user == null) {
            throw new RuntimeException("User not found");
        }

        // 목표 체중과 식비 가져오기
        GoalEntity goal = goalRepository.findByUserId(user.getId()).orElse(null);
        Double goalWeight = goal != null ? goal.getGoalWeight() : null;
        Integer goalCost = goal != null ? goal.getGoalCost() : null;

        // 최근 체중 가져오기
        Optional<WeightEntity> recentWeightRecord = weightRepository.findTopByUserOrderByCreatedAtDesc(user);
        Double currentWeight = recentWeightRecord.map(WeightEntity::getWeight).orElse(null);

        // 일주일간 데이터를 가져와서 계산
        LocalDate endDate = LocalDate.parse(day);
        LocalDate startDate = endDate.minusDays(6);
        List<DailyDiaryEntity> weeklyDiaries = dailyDiaryRepository.findByUserAndDateBetween(user, startDate, endDate);
        int diaryCount = weeklyDiaries.size();
        if (diaryCount == 0) {
            throw new RuntimeException("No diary entries found for the week.");
        }

        double totalCarbohydrates = 0.0;
        double totalProteins = 0.0;
        double totalFats = 0.0;
        int totalCalories = 0;
        int totalCost = 0;
        List<Map<String, Object>> menuEntries = new ArrayList<>();

        for (DailyDiaryEntity diary : weeklyDiaries) {
            for (DiaryEntity diaryEntity : diary.getDiaryEntities()) {
                for (DiaryMappingEntity diaryMapping : diaryEntity.getDiaryMapping()) {
                    MenuEntity menu = diaryMapping.getMenu();
                    RestaurantsEntity restaurant = menu.getRestaurants();

                    double carbohydrates = menu.getMenuCarbohydrate() != null ? menu.getMenuCarbohydrate() : 0.0;
                    double proteins = menu.getMenuProtein() != null ? menu.getMenuProtein() : 0.0;
                    double fats = menu.getMenuFat() != null ? menu.getMenuFat() : 0.0;
                    int calories = menu.getMenuCalories() != null ? menu.getMenuCalories() : 0;
                    int cost = menu.getMenuPrice() != null ? menu.getMenuPrice() : 0;

                    totalCarbohydrates += carbohydrates;
                    totalProteins += proteins;
                    totalFats += fats;
                    totalCalories += calories;
                    totalCost += cost;

                    menuEntries.add(Map.of(
                            "menu_name", menu.getMenuName(),
                            "carbohydrates", carbohydrates,
                            "proteins", proteins,
                            "fats", fats,
                            "calories", calories,
                            "cost", cost,
                            "restaurantType", restaurant.getRestaurantsType().name()
                    ));
                }
            }
        }

        // 평균값 계산
        double carbAvg = totalCarbohydrates / diaryCount;
        double proteinAvg = totalProteins / diaryCount;
        double fatAvg = totalFats / diaryCount;
        double kcalAvg = totalCalories / (double) diaryCount;

        // 레스토랑 타입별 카운트
        Map<String, Integer> restaurantTypeCount = new HashMap<>();
        menuEntries.forEach(entry -> {
            String type = entry.get("restaurantType").toString();
            restaurantTypeCount.put(type, restaurantTypeCount.getOrDefault(type, 0) + 1);
        });

        // 수집된 데이터를 모두 포함한 Map 반환
        Map<String, Object> collectedData = new HashMap<>();
        collectedData.put("goalWeight", goalWeight);
        collectedData.put("goalCost", goalCost);
        collectedData.put("currentWeight", currentWeight);
        collectedData.put("carbAvg", carbAvg);
        collectedData.put("proteinAvg", proteinAvg);
        collectedData.put("fatAvg", fatAvg);
        collectedData.put("kcalAvg", kcalAvg);
        collectedData.put("totalCost", totalCost);
        collectedData.put("restaurantTypeCount", restaurantTypeCount);
        collectedData.put("menuEntries", menuEntries);

        return collectedData;
    }


    public Map<String, Object> sendWeekReportToFastApi(Map<String, Object> collectedData, HttpServletRequest request) {
        // 헤더에 Authorization 토큰 추가
        String token = request.getHeader("Authorization");
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", token);

        // FastAPI에 전송할 데이터를 추출
        Map<String, Object> fastApiRequest = new HashMap<>();
        fastApiRequest.put("goal_weight", collectedData.get("goalWeight"));
        fastApiRequest.put("goal_cost", collectedData.get("goalCost"));
        fastApiRequest.put("recent_weight", collectedData.get("currentWeight"));
        fastApiRequest.put("average_carbohydrates", collectedData.get("carbAvg"));
        fastApiRequest.put("average_proteins", collectedData.get("proteinAvg"));
        fastApiRequest.put("average_fats", collectedData.get("fatAvg"));
        fastApiRequest.put("average_calories", collectedData.get("kcalAvg"));
        fastApiRequest.put("total_cost", collectedData.get("total_cost"));

        // 레스토랑 타입 순위를 포함하는 데이터가 있을 경우 추가
        if (collectedData.containsKey("restaurantTypeCount")) {
            fastApiRequest.put("most_common_restaurant_type", collectedData.get("restaurantTypeCount"));
        }

        // FastAPI로 데이터 전송
        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(fastApiRequest, headers);
        String fastApiUrl = "http://localhost:8000/fast-api/report/week"; // FastAPI URL
        ResponseEntity<Map> responseEntity = restTemplate.exchange(fastApiUrl, HttpMethod.POST, entity, Map.class);

        return responseEntity.getBody();
    }


    public Map<String, Object> prepareFrontendResponse(Map<String, Object> fastApiResponse, Map<String, Object> collectedData) {
        // collectWeekReport에서 필요한 데이터 추출
        List<Map<String, Object>> menuEntries = (List<Map<String, Object>>) collectedData.get("menuEntries");

        // 메뉴별 정보를 생성
        List<Map<String, Object>> menuKcal = menuEntries.stream()
                .sorted(Comparator.comparingDouble(entry -> ((Number) entry.get("calories")).doubleValue()))
                .limit(10)
                .toList();

        List<Map<String, Object>> proteinRanking = menuEntries.stream()
                .sorted(Comparator.comparingDouble(entry -> ((Number) entry.get("proteins")).doubleValue()))
                .limit(5)
                .toList();

        List<Map<String, Object>> carbRanking = menuEntries.stream()
                .sorted(Comparator.comparingDouble(entry -> ((Number) entry.get("carbohydrates")).doubleValue()))
                .limit(5)
                .toList();

        List<Map<String, Object>> fatRanking = menuEntries.stream()
                .sorted(Comparator.comparingDouble(entry -> ((Number) entry.get("fats")).doubleValue()))
                .limit(5)
                .toList();

        List<Map<String, Object>> costRanking = menuEntries.stream()
                .sorted(Comparator.comparingDouble(entry -> ((Number) entry.get("cost")).doubleValue()))
                .limit(10)
                .toList();

        Map<String, Integer> restaurantTypeCount = (Map<String, Integer>) collectedData.get("restaurantTypeCount");

        List<Map<String, Object>> costWhere = new ArrayList<>();
        restaurantTypeCount.forEach((type, count) -> costWhere.add(Map.of("restaurant_type", type, "count", count)));

        // 평균값 가져오기
        double kcalAvg = ((Number) collectedData.getOrDefault("kcalAvg", 0.0)).doubleValue();
        double proteinAvg = ((Number) collectedData.getOrDefault("proteinAvg", 0.0)).doubleValue();
        double carbAvg = ((Number) collectedData.getOrDefault("carbAvg", 0.0)).doubleValue();
        double fatAvg = ((Number) collectedData.getOrDefault("fatAvg", 0.0)).doubleValue();
        int totalCost = ((Number) collectedData.getOrDefault("totalCost", 0)).intValue();

        // 프론트엔드에 반환할 데이터 구성
        Map<String, Object> finalReport = new HashMap<>();
        finalReport.put("response", fastApiResponse != null ? fastApiResponse.get("response") : null);
        finalReport.put("kcal_average", kcalAvg);
        finalReport.put("menu_kcal", menuKcal);
        finalReport.put("protein_avg", proteinAvg);
        finalReport.put("carb_avg", carbAvg);
        finalReport.put("fat_avg", fatAvg);
        finalReport.put("protein_ranking", proteinRanking);
        finalReport.put("carb_ranking", carbRanking);
        finalReport.put("fat_ranking", fatRanking);
        finalReport.put("cost_avg", totalCost);
        finalReport.put("cost_ranking", costRanking);
        finalReport.put("cost_where", costWhere);

        // 로그 추가
        System.out.println("Final report prepared for frontend: " + finalReport);

        return finalReport;
    }


}
