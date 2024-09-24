package com.example.AllEat.service;
import org.springframework.http.HttpHeaders;
import com.example.AllEat.dto.weight.WeightResponseDTO;
import com.example.AllEat.entity.*;
import org.springframework.http.HttpEntity;
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
import org.springframework.web.client.RestTemplate;
import java.util.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpMethod;


@Service
public class MonthReportService {

    @Autowired
    private DailyDiaryRepository dailyDiaryRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private WeightRepository weightRepository;

    private final RestTemplate restTemplate = new RestTemplate();

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
        Double startWeight = null, endWeight = null;
        if (!weightRecords.isEmpty()) {
            startWeight = weightRecords.get(0).getWeight();
            endWeight = weightRecords.get(weightRecords.size() - 1).getWeight();
        }

        for (WeightResponseDTO record : weightRecords) {
            Map<String, Object> weightData = new HashMap<>();
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
        List<Map<String, Object>> menuEntries = new ArrayList<>();

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
                    int menuCost = menu.getMenuPrice() != null ? menu.getMenuPrice() : 0;
                    totalCost += menuCost;

                    menuEntries.add(Map.of(
                            "menu_name", menu.getMenuName(),
                            "carbohydrates", menu.getMenuCarbohydrate(),
                            "proteins", menu.getMenuProtein(),
                            "fats", menu.getMenuFat(),
                            "calories", menu.getMenuCalories(),
                            "cost", menuCost,
                            "restaurantType", restaurant.getRestaurantsType().name()
                    ));

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

        // 수집된 데이터를 모두 포함한 Map 반환
        Map<String, Object> collectedData = new HashMap<>();
        collectedData.put("user", user); // user 정보를 추가
        collectedData.put("yearMonth", yearMonth); // yearMonth 정보를 추가
        collectedData.put("goalWeight", goal.getGoalWeight());
        collectedData.put("goalCost", goal.getGoalCost());
        collectedData.put("startWeight", startWeight);
        collectedData.put("endWeight", endWeight);
        collectedData.put("carbAvg", averageCarbohydrates);
        collectedData.put("proteinAvg", averageProteins);
        collectedData.put("fatAvg", averageFats);
        collectedData.put("kcalAvg", averageCalories);
        collectedData.put("totalCost", totalCost);
        collectedData.put("restaurantTypeCount", restaurantTypeCount);
        collectedData.put("menuEntries", menuEntries);
        collectedData.put("weightRecords", processedWeightRecords);

        return collectedData;
    }

    public Map<String, Object> sendMonthReportToFastApi(Map<String, Object> collectedData, HttpServletRequest request) {
        // 헤더에 Authorization 토큰 추가
        String token = request.getHeader("Authorization");
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", token);

        // 가장 많이 등장한 레스토랑 타입을 찾기
        Map<String, Integer> restaurantTypeCount = (Map<String, Integer>) collectedData.get("restaurantTypeCount");
        String mostCommonRestaurantType = restaurantTypeCount.entrySet().stream()
                .max(Map.Entry.comparingByValue())
                .map(Map.Entry::getKey)
                .orElse("Unknown");

        // FastAPI에 전송할 데이터 생성
        Map<String, Object> fastApiRequest = new HashMap<>();
        fastApiRequest.put("goal_weight", collectedData.get("goalWeight"));
        fastApiRequest.put("goal_cost", collectedData.get("goalCost"));
        fastApiRequest.put("weight_change", Arrays.asList(collectedData.get("startWeight"), collectedData.get("endWeight")));
        fastApiRequest.put("average_carbohydrates", collectedData.get("carbAvg"));
        fastApiRequest.put("average_proteins", collectedData.get("proteinAvg"));
        fastApiRequest.put("average_fats", collectedData.get("fatAvg"));
        fastApiRequest.put("average_calories", collectedData.get("kcalAvg"));
        fastApiRequest.put("total_cost", collectedData.get("totalCost"));
        fastApiRequest.put("most_common_restaurant_type", mostCommonRestaurantType);  // 문자열로 변환하여 전송

        // FastAPI로 데이터 전송
        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(fastApiRequest, headers);
        String fastApiUrl = "http://localhost:8000/fast-api/report/month"; // FastAPI URL
        ResponseEntity<Map> responseEntity = restTemplate.exchange(fastApiUrl, HttpMethod.POST, entity, Map.class);

        return responseEntity.getBody();
    }


    public Map<String, Object> prepareFrontendResponse(Map<String, Object> fastApiResponse, Map<String, Object> collectedData) {
        // collectMonthReport에서 필요한 데이터 추출
        UserEntity user = (UserEntity) collectedData.get("user"); // user 정보 추출

        List<Map<String, Object>> menuEntries = (List<Map<String, Object>>) collectedData.get("menuEntries");

        // 메뉴별 정보를 생성
        List<Map<String, Object>> kcalRanking = menuEntries.stream()
                .sorted(Comparator.comparingDouble(entry -> ((Number) ((Map<String, Object>) entry).get("calories")).doubleValue()).reversed())
                .limit(10)
                .toList();

        List<Map<String, Object>> costRanking = menuEntries.stream()
                .sorted(Comparator.comparingDouble(entry -> ((Number) ((Map<String, Object>) entry).get("cost")).doubleValue()).reversed())
                .limit(10)
                .toList();

        Map<String, Integer> restaurantTypeCount = (Map<String, Integer>) collectedData.get("restaurantTypeCount");

        // 해당 월의 시작일과 종료일 계산
        String yearMonth = collectedData.get("yearMonth").toString();
        LocalDate startDate = LocalDate.parse(yearMonth + "-01");
        LocalDate endDate = startDate.withDayOfMonth(startDate.lengthOfMonth());

        // 일별 비용 계산을 위한 초기화
        List<Integer> dailyCosts = new ArrayList<>(Collections.nCopies(endDate.getDayOfMonth(), 0));

        // 일별 비용 계산
        List<DailyDiaryEntity> monthlyDiaries = dailyDiaryRepository.findByUserAndDateBetween(user, startDate, endDate);
        for (DailyDiaryEntity diary : monthlyDiaries) {
            int day = diary.getDate().getDayOfMonth() - 1; // 인덱스는 0부터 시작하므로 1을 빼줌
            int dailyTotalCost = 0;

            for (DiaryEntity diaryEntity : diary.getDiaryEntities()) {
                for (DiaryMappingEntity diaryMapping : diaryEntity.getDiaryMapping()) {
                    MenuEntity menu = diaryMapping.getMenu();
                    dailyTotalCost += menu.getMenuPrice() != null ? menu.getMenuPrice() : 0;
                }
            }
            dailyCosts.set(day, dailyCosts.get(day) + dailyTotalCost);
        }

        // 프론트엔드에 반환할 데이터 구성
        Map<String, Object> finalReport = new HashMap<>();
        finalReport.put("response", fastApiResponse != null ? fastApiResponse.get("response") : null);
        finalReport.put("monthly_weight_records", collectedData.get("weightRecords"));
        finalReport.put("total_cost", collectedData.get("totalCost"));
        finalReport.put("average_calories", collectedData.get("kcalAvg"));
        finalReport.put("kcal_ranking", kcalRanking);
        finalReport.put("cost_ranking", costRanking);
        finalReport.put("restaurant_type_count", restaurantTypeCount);
        finalReport.put("monthly_cost_records", dailyCosts); // 일별 비용 리스트 추가

        // 로그 추가
        System.out.println("Final report prepared for frontend: " + finalReport);

        return finalReport;
    }

}
