package com.example.AllEat.controller;

import com.example.AllEat.entity.UserEntity;
import com.example.AllEat.service.CrawlingService;
import com.example.AllEat.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/AllEat/crawling")
@RequiredArgsConstructor
public class CrawlingController {

    private final CrawlingService crawlingService;
    private final UserService userService;

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
}
