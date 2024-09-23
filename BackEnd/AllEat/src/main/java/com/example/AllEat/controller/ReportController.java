package com.example.AllEat.controller;
import com.example.AllEat.service.WeekReportService;
import com.example.AllEat.service.MonthReportService;
import com.example.AllEat.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import java.util.List;
import java.util.HashMap;

import jakarta.servlet.http.HttpServletRequest;
import java.util.Map;

@RestController
@RequestMapping("/AllEat")
public class ReportController {

    private final ReportService reportService;
    private final WeekReportService weekReportService;
    private final MonthReportService monthReportService;

    @Autowired
    public ReportController(ReportService reportService, WeekReportService weekReportService, MonthReportService monthReportService) {
        this.reportService = reportService;
        this.weekReportService = weekReportService;
        this.monthReportService = monthReportService;
    }

    @PostMapping("/day-report")
    public ResponseEntity<?> getDayReport(
            @RequestBody Map<String, String> requestBody,
            HttpServletRequest request) {

        // JSON 데이터에서 'day' 값 추출
        String day = requestBody.get("day");
        if (day == null || day.isEmpty()) {
            return ResponseEntity.badRequest().body("The 'day' parameter is missing or empty.");
        }

        // 사용자 식별 및 데이터 수집
        Object reportData = reportService.collectDayReport(day, request);

        // FastAPI로 데이터 전송
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();

        // Authorization 헤더를 그대로 전달
        String authorization = request.getHeader("Authorization");
        if (authorization == null || authorization.isEmpty()) {
            return ResponseEntity.status(401).body("Unauthorized");
        }
        headers.set("Authorization", authorization);

        HttpEntity<Object> requestEntity = new HttpEntity<>(reportData, headers);

        // FastAPI 서버로 요청을 보냄
        ResponseEntity<String> response = restTemplate.postForEntity("http://localhost:8000/fast-api/report/day", requestEntity, String.class);

        // 그날 먹은 모든 음식의 정보 가져오기
        List<Map<String, Object>> dailyFoodInfo = reportService.collectDayFoodInfo(day, request); // 새롭게 추가된 메서드

        // FastAPI로부터 받은 response와 먹은 음식 정보를 하나의 JSON으로 합침
        Map<String, Object> fullResponse = new HashMap<>();
        fullResponse.put("gptResponse", response.getBody());
        fullResponse.put("foodDetails", dailyFoodInfo);

        return ResponseEntity.ok(fullResponse);
    }


    // 주간 레포트 생성
    @PostMapping("/week-report")
    public ResponseEntity<?> getWeekReport(
            HttpServletRequest request) {

        // 사용자 식별 및 데이터 수집
        Object reportData = weekReportService.collectWeekReport(request);

        // FastAPI로 데이터 전송
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();

        // Authorization 헤더를 그대로 전달
        String authorization = request.getHeader("Authorization");
        if (authorization == null || authorization.isEmpty()) {
            return ResponseEntity.status(401).body("Unauthorized");
        }
        headers.set("Authorization", authorization);

        HttpEntity<Object> requestEntity = new HttpEntity<>(reportData, headers);

        // FastAPI 서버로 요청을 보냄
        ResponseEntity<String> response = restTemplate.postForEntity("http://localhost:8000/fast-api/report/week", requestEntity, String.class);

        return ResponseEntity.ok(response.getBody());
    }

    @PostMapping("/month-report")
    public ResponseEntity<?> getMonthReport(
            @RequestBody Map<String, String> requestBody,
            HttpServletRequest request) {

        // JSON 데이터에서 'year_month' 값 추출
        String yearMonth = requestBody.get("year_month");
        if (yearMonth == null || yearMonth.isEmpty()) {
            return ResponseEntity.badRequest().body("The 'year_month' parameter is missing or empty.");
        }

        // 사용자 식별 및 데이터 수집
        Object reportData = monthReportService.collectMonthReport(yearMonth, request);

        // FastAPI로 데이터 전송
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();

        // Authorization 헤더를 그대로 전달
        String authorization = request.getHeader("Authorization");
        if (authorization == null || authorization.isEmpty()) {
            return ResponseEntity.status(401).body("Unauthorized");
        }
        headers.set("Authorization", authorization);

        HttpEntity<Object> requestEntity = new HttpEntity<>(reportData, headers);

        // FastAPI 서버로 요청을 보냄
        ResponseEntity<String> response = restTemplate.postForEntity("http://localhost:8000/fast-api/report/month", requestEntity, String.class);

        return ResponseEntity.ok(response.getBody());
    }
}
