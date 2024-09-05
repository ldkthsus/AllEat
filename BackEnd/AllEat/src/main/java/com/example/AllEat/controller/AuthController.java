package com.example.AllEat.controller;

import com.example.AllEat.dto.user.UserJoinDTO;
import com.example.AllEat.entity.UserEntity;
import com.example.AllEat.jwt.JwtUtil;

import com.example.AllEat.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/AllEat/users")
public class AuthController {

    private final UserService userService;

    private JwtUtil jwtUtil;

    @Autowired
    public AuthController(UserService userService) {
        this.userService = userService;
    }

    // 회원가입
    @PostMapping("/join")
    public ResponseEntity<String> registerUser(@Validated @RequestBody UserJoinDTO userJoinDTO) {
        try {
            userService.registerUser(userJoinDTO);
            return ResponseEntity.ok("User registered successfully");
        } catch (IllegalArgumentException e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // 유저 정보 조회
    @GetMapping("/info")
    public ResponseEntity<?> getUser(HttpServletRequest request) {
        try {
            UserEntity userEntity = userService.findByRequest(request);
            return new ResponseEntity<>(userEntity, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}
