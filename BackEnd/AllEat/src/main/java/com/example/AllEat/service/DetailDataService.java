package com.example.AllEat.service;

import com.example.AllEat.dto.data.DetailDataDTO;
import com.example.AllEat.entity.DiaryMappingEntity;
import com.example.AllEat.entity.UserEntity;
import com.example.AllEat.jwt.JwtUtil;
import com.example.AllEat.repository.DiaryMappingRepository;
import com.example.AllEat.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicReference;
import java.util.stream.Collectors;

@Service
public class DetailDataService {

    @Autowired
    private DiaryMappingRepository diaryMappingRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    public Map<String, Object> getDiaryDetailsByDiaryId(Integer diaryId, HttpServletRequest request) {
        // JWT 토큰에서 사용자 이메일 추출
        String token = request.getHeader("Authorization");
        if (token == null || !token.startsWith("Bearer ")) {
            throw new RuntimeException("Invalid or missing Authorization header");
        }
        token = token.substring(7); // "Bearer " 부분 제거
        String email = jwtUtil.getEmail(token);

        // 사용자 찾기
        UserEntity user = userRepository.findByEmail(email);
        if (user == null) {
            throw new RuntimeException("User not found");
        }

        // 사용자 소유의 다이어리 항목만 가져오기
        List<DiaryMappingEntity> diaryMappings = diaryMappingRepository.findByDiary_IdAndDiary_User(diaryId, user);

        // 다이어리 총 영양 정보 계산을 위한 초기화
        AtomicInteger totalKcal = new AtomicInteger(0);
        AtomicReference<Double> totalCarbs = new AtomicReference<>(0.0);
        AtomicReference<Double> totalProtein = new AtomicReference<>(0.0);
        AtomicReference<Double> totalFat = new AtomicReference<>(0.0);

        // 각 DiaryMappingEntity에서 MenuEntity를 추출하여 DetailDataDTO로 변환하고, 영양 정보를 합산한다.
        List<DetailDataDTO> menus = diaryMappings.stream()
                .map(mapping -> {
                    var menu = mapping.getMenu();
                    int personCount = mapping.getPersonCount() != null ? mapping.getPersonCount() : 1; // personCount가 없을 때 기본값은 1

                    // personCount를 고려하여 메뉴의 영양 성분과 가격을 나눈다.
                    int adjustedCalories = menu.getMenuCalories() / personCount;
                    double adjustedCarbs = (menu.getMenuCarbohydrate() != null ? menu.getMenuCarbohydrate() : 0) / personCount;
                    double adjustedProtein = (menu.getMenuProtein() != null ? menu.getMenuProtein() : 0) / personCount;
                    double adjustedFat = (menu.getMenuFat() != null ? menu.getMenuFat() : 0) / personCount;
                    int adjustedPrice = menu.getMenuPrice() / personCount;

                    // 다이어리 총 영양 성분에 더해준다.
                    totalKcal.addAndGet(adjustedCalories);
                    totalCarbs.updateAndGet(v -> v + adjustedCarbs);
                    totalProtein.updateAndGet(v -> v + adjustedProtein);
                    totalFat.updateAndGet(v -> v + adjustedFat);

                    return new DetailDataDTO(
                            menu.getId(),
                            menu.getMenuName(),
                            adjustedPrice,
                            adjustedCalories,
                            menu.getRestaurants().getRestaurantsType().getType(),
                            menu.getRestaurants().getRestaurantsName(),
                            personCount // 실제 personCount 값 반환
                    );
                })
                .collect(Collectors.toList());

        // 결과를 Map으로 반환
        Map<String, Object> response = new HashMap<>();
        response.put("diary_kcal", totalKcal.get());
        response.put("diary_carb", totalCarbs.get().intValue());
        response.put("diary_fat", totalFat.get().intValue());
        response.put("diary_protein", totalProtein.get().intValue());
        response.put("menus", menus);

        return response;
    }
}
