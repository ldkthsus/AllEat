package com.example.AllEat.controller;

import com.example.AllEat.dto.mealPay.MealPayRequestDTO;
import com.example.AllEat.entity.MealPayEntity;
import com.example.AllEat.entity.UserEntity;
import com.example.AllEat.service.MealPayService;
import com.example.AllEat.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("AllEat/record")
@RequiredArgsConstructor
public class MealPayController {

    private final MealPayService mealPayService;
    private final UserService userService;

    @PostMapping("/meal-pay")
    public ResponseEntity<?> recordMealPay(MealPayRequestDTO mealPayRequest, HttpServletRequest request) {
        UserEntity findUserEntity = userService.findByRequest(request);
        if (findUserEntity != null) {
            MealPayEntity mealPayEntity = mealPayService.getMealPayResult(mealPayRequest);
            return ResponseEntity.status(HttpStatus.OK).body(mealPayEntity);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
}
