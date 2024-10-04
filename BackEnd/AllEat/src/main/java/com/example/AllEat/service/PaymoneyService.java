package com.example.AllEat.service;

import com.example.AllEat.entity.PaymoneyEntity;
import com.example.AllEat.entity.UserEntity;
import com.example.AllEat.jwt.JwtUtil;
import com.example.AllEat.repository.PaymoneyRepository;
import com.google.firebase.messaging.FirebaseMessagingException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaymoneyService {

    @Autowired
    private PaymoneyRepository paymoneyRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserService userService;

    @Autowired
    private NotificationService notificationService;

    public PaymoneyEntity createPaymoney(HttpServletRequest request) {
        UserEntity user = userService.findByRequest(request);

        PaymoneyEntity paymoneyEntity = new PaymoneyEntity();
        paymoneyEntity.setBalance(0);
        paymoneyEntity.setUser(user);

        return paymoneyRepository.save(paymoneyEntity);
    }

    public PaymoneyEntity modifyPaymoneyBalance(Integer balance, String restaurantName, HttpServletRequest request) throws FirebaseMessagingException {
        UserEntity user = userService.findByRequest(request);

        PaymoneyEntity paymoney = paymoneyRepository.findByUser(user);
        paymoney.setBalance(paymoney.getBalance() + balance);

        String response = notificationService.sendNotification(user.getFcmToken(), balance, restaurantName, user);
        System.out.println(response);

        return paymoneyRepository.save(paymoney);

    }

}
