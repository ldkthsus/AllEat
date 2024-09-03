package com.example.AllEat.controller;


import com.example.AllEat.dto.user.UserJoinDTO;
import com.example.AllEat.entity.UserEntity;
import com.example.AllEat.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/AllEat/users")
public class AuthController {

    private final UserService userService;


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
}
