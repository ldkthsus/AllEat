package com.example.AllEat.controller;

import com.example.AllEat.dto.user.AuthenticationRequest;
import com.example.AllEat.dto.user.AuthenticationResponse;
import com.example.AllEat.dto.user.UserJoinDTO;
import com.example.AllEat.entity.UserEntity;
import com.example.AllEat.jwt.JwtUtil;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import com.example.AllEat.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
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

//    @PostMapping("/login")
//    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) throws Exception {
//        authenticationManager.authenticate(
//                new UsernamePasswordAuthenticationToken(authenticationRequest.getEmail(), authenticationRequest.getPassword())
//        );
//
//        final String accessToken = jwtUtil.generateToken(userDetails.get());
//        final String refreshToken = jwtUtil.generateRefreshToken(userDetails.getUsername());
//
//        return ResponseEntity.ok(new AuthenticationResponse(accessToken, refreshToken));
//    }


}
