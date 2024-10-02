package com.example.AllEat.controller;

import com.example.AllEat.dto.log.LogResponseDTO;
import com.example.AllEat.service.LogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
public class LogController {

    private final LogService logService;

    @Autowired
    public LogController(LogService logService) {
        this.logService = logService;
    }

    // GET 요청 처리
    @GetMapping("/AllEat/mealpay")
    public ResponseEntity<List<LogResponseDTO>> getMealPayLogs(
            @RequestParam("start_date") String startDate,
            HttpServletRequest request) {

        // 서비스에서 30일치 데이터를 가져옴
        List<LogResponseDTO> mealPayLogs = logService.getMealPayLogs(startDate, request);

        return ResponseEntity.ok(mealPayLogs);
    }
}
