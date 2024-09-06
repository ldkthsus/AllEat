package com.example.AllEat.controller;


import com.example.AllEat.dto.paymoney.PaymoneyDTO;
import com.example.AllEat.dto.weight.WeightDTO;
import com.example.AllEat.entity.PaymoneyEntity;
import com.example.AllEat.entity.UserEntity;
import com.example.AllEat.repository.PaymoneyRepository;
import com.example.AllEat.service.PaymoneyService;
import com.example.AllEat.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/AllEat/paymoney")
public class PaymoneyController {
    @Autowired
    private PaymoneyService paymoneyService;

    @Autowired
    private UserService userService;

    @Autowired
    private PaymoneyRepository paymoneyRepository;

    @PostMapping("")
    public ResponseEntity<?> createPaymoney(HttpServletRequest request) {
        try{
            paymoneyService.createPaymoney(request);
            return ResponseEntity.ok("Successfully Created");
        }catch (Exception e){
            System.out.println(e);
            return ResponseEntity.ok(e.getMessage());

        }
    }

    @GetMapping("")
    public ResponseEntity<?> getBalance(HttpServletRequest request) {
        try{
            UserEntity user = userService.findByRequest(request);
            PaymoneyEntity paymoney = paymoneyRepository.findByUser(user);

            return ResponseEntity.ok(paymoney);
        }catch (Exception e){
            System.out.println(e);
            return ResponseEntity.ok(e.getMessage());

        }
    }

    @PostMapping("/balance")
    public ResponseEntity<?> plusBalance(HttpServletRequest request, @RequestBody PaymoneyDTO balance) {
        try{
            PaymoneyEntity paymoney = paymoneyService.modifyPaymoneyBalance(balance, request);

            return ResponseEntity.ok(paymoney);

        } catch (Exception e){
            System.out.println(e);
            return ResponseEntity.ok(e.getMessage());
        }
    }

}
