package com.example.AllEat.service;

import com.example.AllEat.entity.MenuEntity;
import com.example.AllEat.entity.RestaurantsEntity;
import com.example.AllEat.repository.MenuRepository;
import com.example.AllEat.repository.RestaurantsRepository;
import lombok.RequiredArgsConstructor;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVPrinter;
import org.apache.commons.csv.CSVRecord;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.*;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CsvToDatabaseService {

    private final RestaurantsRepository restaurantsRepository;
    private final MenuRepository menuRepository;

    @Transactional
    public void saveCsvToDatabase(String combinedCsvPath, String foodInfoPath) {
        Map<String, FoodInfo> foodInfoMap = readFoodInfoCsv(foodInfoPath);

        String outputCsvPath = "combinedData.csv";
        try (Reader reader = new FileReader(combinedCsvPath);
             BufferedWriter writer = new BufferedWriter(new FileWriter(outputCsvPath));
             CSVPrinter csvPrinter = new CSVPrinter(writer, CSVFormat.DEFAULT
                     .withHeader("음식점 이름", "메뉴 이름", "메뉴 가격", "에너지", "탄수화물", "단백질", "지방"));
             CSVParser csvParser = new CSVParser(reader, CSVFormat.DEFAULT.withFirstRecordAsHeader())) {

            for (CSVRecord record : csvParser) {
                String restaurantName = record.get("음식점 이름").trim();
                String menuName = record.get(" 메뉴 이름").trim();
                String menuPriceStr = record.get(" 메뉴 가격").trim();

                int menuPrice;
                try {
                    menuPrice = Integer.parseInt(menuPriceStr.replaceAll("[^0-9]", "").trim());
                } catch (NumberFormatException e) {
                    menuPrice = 0;
                }

                // 메뉴 이름과 비교할 때, 괄호와 특수 문자를 제거하여 비교
                String normalizedMenuName = normalizeString(menuName);

                // 메뉴 이름과 영양정보 음식명 매칭 확인
                FoodInfo foodInfo = foodInfoMap.entrySet()
                        .stream()
                        .filter(entry -> isNameMatched(normalizedMenuName, normalizeString(entry.getKey())))
                        .map(Map.Entry::getValue)
                        .findFirst()
                        .orElse(new FoodInfo(null, null, null, null));  // 기본값: 영양 성분 정보 없음

                if (foodInfo.getCalories() == null) {
                    System.out.printf("메뉴 이름 '%s'에 대한 영양정보가 없습니다.\n", menuName);
                }

                // 새로운 CSV 파일에 결합된 데이터 저장
                csvPrinter.printRecord(
                        restaurantName,
                        menuName,
                        menuPrice,
                        foodInfo.getCalories(),
                        foodInfo.getCarbohydrate(),
                        foodInfo.getProtein(),
                        foodInfo.getFat()
                );

                // 데이터베이스에 저장
                saveToDatabase(restaurantName, menuName, menuPrice, foodInfo);
            }
            System.out.println("CSV 파일을 성공적으로 결합하고 저장했습니다!");

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void saveToDatabase(String restaurantName, String menuName, int menuPrice, FoodInfo foodInfo) {
        RestaurantsEntity restaurant = findOrCreateRestaurant(restaurantName);
        MenuEntity menuEntity = new MenuEntity();
        menuEntity.setRestaurants(restaurant);
        menuEntity.setMenuName(menuName);
        menuEntity.setMenuPrice(menuPrice);
        menuEntity.setMenuCalories(foodInfo.getCalories());
        menuEntity.setMenuCarbohydrate(foodInfo.getCarbohydrate());
        menuEntity.setMenuProtein(foodInfo.getProtein());
        menuEntity.setMenuFat(foodInfo.getFat());
        menuEntity.setMenuType(0);
        menuEntity.setMenuValue(1.0);
        menuRepository.save(menuEntity);
    }

    private RestaurantsEntity findOrCreateRestaurant(String restaurantName) {
        return restaurantsRepository.findByRestaurantsName(restaurantName)
                .orElseGet(() -> {
                    RestaurantsEntity newRestaurant = new RestaurantsEntity();
                    newRestaurant.setRestaurantsName(restaurantName);
                    newRestaurant.setRestaurantsType(RestaurantsEntity.RestaurantsType.RESTAURANTS);
                    return restaurantsRepository.save(newRestaurant);
                });
    }

    private Map<String, FoodInfo> readFoodInfoCsv(String filePath) {
        Map<String, FoodInfo> foodInfoMap = new HashMap<>();
        try (Reader reader = new FileReader(filePath);
             CSVParser csvParser = new CSVParser(reader, CSVFormat.DEFAULT.withFirstRecordAsHeader())) {

            for (CSVRecord record : csvParser) {
                String foodName = record.get("음 식 명").trim();
                Integer calories = parseInteger(record.get("에너지(kcal)"));
                Double carbohydrate = parseDouble(record.get("탄수화물(g)"));
                Double protein = parseDouble(record.get("단백질(g)"));
                Double fat = parseDouble(record.get("지방(g)"));

                foodInfoMap.put(foodName, new FoodInfo(calories, carbohydrate, protein, fat));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return foodInfoMap;
    }

    private boolean isNameMatched(String menuName, String foodName) {
        // 메뉴 이름이 음식명에 포함되거나, 음식명이 메뉴 이름에 포함되는 경우도 포함하여 매칭
        return menuName.contains(foodName) || foodName.contains(menuName);
    }

    private Integer parseInteger(String value) {
        try {
            return value.isEmpty() ? null : Integer.parseInt(value.trim());
        } catch (NumberFormatException e) {
            return null;
        }
    }

    private Double parseDouble(String value) {
        try {
            return value.isEmpty() ? null : Double.parseDouble(value.trim());
        } catch (NumberFormatException e) {
            return null;
        }
    }

    // 공백 및 괄호, 특수문자 제거하여 비교할 수 있게 변환
    private String normalizeString(String str) {
        return str.replaceAll("\\s|\\(|\\)|\\[|\\]|[^\\p{L}\\p{N}]", "").toLowerCase();
    }

    private static class FoodInfo {
        private Integer calories;
        private Double carbohydrate;
        private Double protein;
        private Double fat;

        public FoodInfo(Integer calories, Double carbohydrate, Double protein, Double fat) {
            this.calories = calories;
            this.carbohydrate = carbohydrate;
            this.protein = protein;
            this.fat = fat;
        }

        public Integer getCalories() { return calories; }
        public Double getCarbohydrate() { return carbohydrate; }
        public Double getProtein() { return protein; }
        public Double getFat() { return fat; }
    }
}
