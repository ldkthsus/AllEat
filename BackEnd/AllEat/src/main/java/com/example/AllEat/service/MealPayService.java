package com.example.AllEat.service;

import com.example.AllEat.dto.mealPay.MealPayAmountDTO;
import com.example.AllEat.dto.mealPay.MealPayRequestDTO;
import com.example.AllEat.entity.*;
import com.example.AllEat.repository.DiaryRepository;
import com.example.AllEat.repository.MealPayRepository;
import com.example.AllEat.repository.MonthlyMealPayRepository;
import com.example.AllEat.repository.PayTransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.YearMonth;

@Service
@RequiredArgsConstructor
public class MealPayService {

    private final MealPayRepository mealPayRepository;
    private final PayTransactionRepository payTransactionRepository;
    private final DiaryRepository diaryRepository;
    private final MonthlyMealPayRepository monthlyMealPayRepository;

    public MealPayEntity getMealPayResult(MealPayRequestDTO mealPayRequest, UserEntity user){
        PayTransactionEntity findPayTransaction = payTransactionRepository.findById(mealPayRequest.getTransactionId()).orElseThrow(()-> new IllegalArgumentException("거래 내역을 찾을 수 없습니다. "));
        DiaryEntity findDiary = diaryRepository.findById(mealPayRequest.getDiaryId()).orElseThrow(()-> new IllegalArgumentException("한 끼 식단을 찾을 수 없습니다. "));

        // monthly mealpay 업데이트
//        YearMonth payTransactionMonth = YearMonth.from(findPayTransaction.getTransactionDate().toLocalDateTime().toLocalDate());
//        MonthlyMealPayEntity findMonth = monthlyMealPayRepository.findByUserAndDate(user, payTransactionMonth).get(0);
//        if (findMonth != null){
//            findMonth.setAmount(findMonth.getAmount() - mealPayRequest.getAmount());
//            monthlyMealPayRepository.save(findMonth);
//
//        }else{
//            MonthlyMealPayEntity monthlyMealPayEntity = new MonthlyMealPayEntity();
//            monthlyMealPayEntity.setUser(user);
//            monthlyMealPayEntity.setAmount(mealPayRequest.getAmount());
//            monthlyMealPayEntity.setDate(payTransactionMonth);
//            monthlyMealPayRepository.save(monthlyMealPayEntity);
//
//        }

        MealPayEntity findMealPay = mealPayRepository.findByPayTransaction_id(findPayTransaction.getId());
        if(findMealPay == null){
            MealPayEntity mealPay = MealPayEntity.builder()
                    .payTransaction(findPayTransaction)
                    .amount(findPayTransaction.getAmount())
                    .diary(findDiary)
                    .build();

            mealPayRepository.save(mealPay);
            return mealPay;
        }

        Integer amount = findMealPay.getAmount();
        amount -= findPayTransaction.getAmount();
        findMealPay.updateAmount(amount);
        mealPayRepository.save(findMealPay);
        return findMealPay;
    }


}
