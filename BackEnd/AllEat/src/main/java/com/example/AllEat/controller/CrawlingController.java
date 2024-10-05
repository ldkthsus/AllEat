package com.example.AllEat.controller;

import com.example.AllEat.entity.UserEntity;
import com.example.AllEat.service.*;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/AllEat/crawling")
@RequiredArgsConstructor
public class CrawlingController {

    private final CafeCrawlingService crawlingService;
    private final UserService userService;
    private final RestaurantsCrawlingService restaurantsCrawlingService;
    private final CsvToDatabaseService csvToDatabaseService;

    @PostMapping("/cafe")
    public ResponseEntity<?> cafeCrawling(HttpServletRequest request){
        try {
            UserEntity findUser = userService.findByRequest(request);
            if(findUser == null){
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
            crawlingService.startCrawling();
            return ResponseEntity.status(HttpStatus.OK).build();
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
    @PostMapping("/restaurants")
    public ResponseEntity<?> restaurantsCrawling(HttpServletRequest request){
        try {
            UserEntity findUser = userService.findByRequest(request);
            if(findUser == null){
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
            restaurantsCrawlingService.startCrawling();


            // 3. 현재 작업 디렉토리를 기준으로 파일 경로 설정
            String rootPath = System.getProperty("user.dir"); // 현재 프로젝트의 루트 디렉토리
            String crawledPath = rootPath + "/crawled_data.csv"; // 크롤링된 데이터 CSV 파일 경로
            String foodInfoPath = rootPath + "/foodinfo.csv"; // 영양 정보 CSV 파일 경로

            // 경로가 자주 바뀌거나 동적으로 설정할 경우 이 방식으로 접근
            System.out.println("Crawled Path: " + crawledPath);
            System.out.println("Food Info Path: " + foodInfoPath);

            // 4. CSV 파일을 데이터베이스에 저장
            csvToDatabaseService.saveCsvToDatabase(crawledPath, foodInfoPath);

            return ResponseEntity.status(HttpStatus.OK).body("음식점 정보 크롤링 완료 !");
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}
