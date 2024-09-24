package com.example.AllEat.service;

import com.example.AllEat.dto.mealPay.MealPayRequestDTO;
import com.example.AllEat.entity.DiaryEntity;
import com.example.AllEat.entity.MealPayEntity;
import com.example.AllEat.entity.PayTransactionEntity;
import com.example.AllEat.repository.DiaryRepository;
import com.example.AllEat.repository.MealPayRepository;
import com.example.AllEat.repository.PayTransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MealPayService {

    private final MealPayRepository mealPayRepository;
    private final PayTransactionRepository payTransactionRepository;
    private final DiaryRepository diaryRepository;

    public MealPayEntity getMealPayResult(MealPayRequestDTO mealPayRequest){
        PayTransactionEntity findPayTransaction = payTransactionRepository.findById(mealPayRequest.getTransactionId()).orElseThrow(()-> new IllegalArgumentException("거래 내역을 찾을 수 없습니다. "));
        DiaryEntity findDiary = diaryRepository.findById(mealPayRequest.getDiaryId()).orElseThrow(()-> new IllegalArgumentException("한 끼 식단을 찾을 수 없습니다. "));
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
