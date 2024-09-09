package com.example.AllEat.service;


import com.example.AllEat.dto.paytransaction.PayTransactionDTO;
import com.example.AllEat.entity.PayTransactionEntity;
import com.example.AllEat.entity.RestaurantsEntity;
import com.example.AllEat.entity.UserEntity;
import com.example.AllEat.jwt.JwtUtil;
import com.example.AllEat.repository.PayTransactionRepository;
import com.example.AllEat.repository.RestaurantsRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PayTransactionService {

    @Autowired
    private PayTransactionRepository paytransactionRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private RestaurantsRepository restaurantsRepository;

    public PayTransactionEntity payTransactionCreate(PayTransactionDTO payTransactionDTO,HttpServletRequest request){
        PayTransactionEntity payTransactionEntity = new PayTransactionEntity();
        UserEntity user = userService.findByRequest(request);
        System.out.println("aaa");
        System.out.println(payTransactionDTO.getRestaurantId());
        RestaurantsEntity restaurant = restaurantsRepository.findById(payTransactionDTO.getRestaurantId()).get();
        payTransactionEntity.setRestaurant(restaurant);

        payTransactionEntity.setUser(user);

        payTransactionEntity.setTransactionType(payTransactionDTO.getTransactionType());
        payTransactionEntity.setAmount(payTransactionDTO.getAmount());
        if (payTransactionDTO.getTransactionType() == 0){
            payTransactionEntity.setRecord(true);

        } else{
            payTransactionEntity.setRecord(false);
        }

        return paytransactionRepository.save(payTransactionEntity);

    }

}
