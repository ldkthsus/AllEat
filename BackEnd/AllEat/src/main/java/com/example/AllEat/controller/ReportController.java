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
import java.util.HashMap;
import jakarta.servlet.http.HttpServletRequest;
import java.util.Map;
import java.util.List;

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

        String day = requestBody.get("day");
        if (day == null || day.isEmpty()) {
            return ResponseEntity.badRequest().body("The 'day' parameter is missing or empty.");
        }

        // 데이터 수집
        Object reportData = reportService.collectDayReport(day, request);

        // FastAPI 전송
        ResponseEntity<String> response = sendToFastApi(reportData, request, "http://localhost:8000/fast-api/report/day");

        List<Map<String, Object>> dailyFoodInfo = reportService.collectDayFoodInfo(day, request);

        Map<String, Object> fullResponse = new HashMap<>();
        fullResponse.put("gptResponse", response.getBody());
        fullResponse.put("foodDetails", dailyFoodInfo);

        return ResponseEntity.ok(fullResponse);
    }

    @PostMapping("/week-report")
    public ResponseEntity<?> getWeekReport(
            @RequestBody Map<String, String> requestBody,
            HttpServletRequest request) {

        // JSON 데이터에서 'day' 값 추출
        String day = requestBody.get("day");
        if (day == null || day.isEmpty()) {
            return ResponseEntity.badRequest().body("The 'day' parameter is missing or empty.");
        }

        // 데이터 수집 수행 (collectWeekReport 호출)
        Map<String, Object> collectedData = weekReportService.collectWeekReport(day, request);

        // FastAPI로 데이터 전송만 수행하고 응답받기
        Map<String, Object> fastApiResponse = weekReportService.sendWeekReportToFastApi(collectedData, request);

        // 프론트엔드에 반환할 데이터를 구성
        Map<String, Object> finalReport = weekReportService.prepareFrontendResponse(fastApiResponse, collectedData);

        return ResponseEntity.ok(finalReport);
    }

    @PostMapping("/month-report")
    public ResponseEntity<?> getMonthReport(
            @RequestBody Map<String, String> requestBody,
            HttpServletRequest request) {

        // year_month 값을 추출
        String yearMonth = requestBody.get("year_month");
        if (yearMonth == null || yearMonth.isEmpty()) {
            return ResponseEntity.badRequest().body("The 'year_month' parameter is missing or empty.");
        }

        // 데이터 수집 수행 (collectMonthReport 호출)
        Map<String, Object> collectedData = monthReportService.collectMonthReport(yearMonth, request);

        // FastAPI로 데이터 전송만 수행하고 응답받기
        Map<String, Object> fastApiResponse = monthReportService.sendMonthReportToFastApi(collectedData, request);

        // 프론트엔드에 반환할 데이터를 구성
        Map<String, Object> finalReport = monthReportService.prepareFrontendResponse(fastApiResponse, collectedData);

        return ResponseEntity.ok(finalReport);
    }

    private ResponseEntity<String> sendToFastApi(Object reportData, HttpServletRequest request, String url) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();

        // Authorization 헤더를 추가
        String authorization = request.getHeader("Authorization");
        if (authorization == null || authorization.isEmpty()) {
            throw new RuntimeException("Unauthorized - Missing Authorization header");
        }
        headers.set("Authorization", authorization);

        HttpEntity<Object> requestEntity = new HttpEntity<>(reportData, headers);

        return restTemplate.postForEntity(url, requestEntity, String.class);
    }
}
