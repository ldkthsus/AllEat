package com.example.AllEat.service;

import com.example.AllEat.dto.paymoney.PaymoneyDTO;
import com.example.AllEat.dto.weight.WeightDTO;
import com.example.AllEat.entity.PaymoneyEntity;
import com.example.AllEat.entity.UserEntity;
import com.example.AllEat.entity.WeightEntity;
import com.example.AllEat.jwt.JwtUtil;
import com.example.AllEat.repository.PaymoneyRepository;
import com.example.AllEat.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaymoneyService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PaymoneyRepository paymoneyRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserService userService;

    public PaymoneyEntity createPaymoney(HttpServletRequest request) {
        UserEntity user = userService.findByRequest(request);

        PaymoneyEntity paymoneyEntity = new PaymoneyEntity();
        paymoneyEntity.setBalance(0);
        paymoneyEntity.setUser(user);

        return paymoneyRepository.save(paymoneyEntity);
    }

    public PaymoneyEntity modifyPaymoneyBalance(PaymoneyDTO balance, HttpServletRequest request) {
        UserEntity user = userService.findByRequest(request);

        PaymoneyEntity paymoney = paymoneyRepository.findByUser(user);
        paymoney.setBalance(paymoney.getBalance() + balance.getBalance());

        return paymoneyRepository.save(paymoney);

    }

}
