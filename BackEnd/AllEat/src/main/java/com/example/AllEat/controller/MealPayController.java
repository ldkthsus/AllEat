package com.example.AllEat.controller;

import com.example.AllEat.dto.mealPay.MealPayAmountDTO;
import com.example.AllEat.dto.mealPay.MealPayRequestDTO;
import com.example.AllEat.entity.MealPayEntity;
import com.example.AllEat.entity.MonthlyMealPayEntity;
import com.example.AllEat.entity.UserEntity;
import com.example.AllEat.service.MealPayService;
import com.example.AllEat.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.AllEat.repository.MonthlyMealPayRepository;

import java.time.YearMonth;

@RestController
@RequestMapping("AllEat/record")
@RequiredArgsConstructor
public class MealPayController {

    private final MonthlyMealPayRepository monthlyMealPayRepository;
    private final MealPayService mealPayService;
    private final UserService userService;

    @PostMapping("/meal-pay")
    public ResponseEntity<?> recordMealPay(@RequestBody MealPayRequestDTO mealPayRequest, HttpServletRequest request) {
        UserEntity findUserEntity = userService.findByRequest(request);
        if (findUserEntity != null) {
            MealPayEntity mealPayEntity = mealPayService.getMealPayResult(mealPayRequest, findUserEntity);
            return ResponseEntity.status(HttpStatus.OK).body(mealPayEntity);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @GetMapping("/meal-pay")
    public ResponseEntity<?> getMealPayAmount(HttpServletRequest request){
        UserEntity user = userService.findByRequest(request);
        
        MonthlyMealPayEntity findMonth =  monthlyMealPayRepository.findByUserAndDate(user, YearMonth.now()).get(0);
        MealPayAmountDTO mealPayAmountDTO = new MealPayAmountDTO();

        if (findMonth != null){
            mealPayAmountDTO.setAmount(findMonth.getAmount());
            return ResponseEntity.status(HttpStatus.OK).body(mealPayAmountDTO);
        } else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

    }

}
