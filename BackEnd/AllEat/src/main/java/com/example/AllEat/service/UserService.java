package com.example.AllEat.service;

import com.example.AllEat.dto.user.UserJoinDTO;
import com.example.AllEat.entity.UserEntity;
import com.example.AllEat.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import jakarta.servlet.http.HttpServletRequest;


@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserEntity findByRequest(HttpServletRequest request) {

        System.out.println(request.toString());
        System.out.println(request);
        String token = request.getHeader("Authorization").substring(7);
        UserEntity user = userRepository.findByEmail("test@example.com");
//        UserEntity user = userRepository.findByEmail(jwtUtil.getEmail(token));
        return user;

    }

    public UserEntity registerUser(UserJoinDTO userJoinDTO) {
        // 이메일 중복 체크
        if (userRepository.findByEmail(userJoinDTO.getEmail()) != null) {
            throw new IllegalArgumentException("Email already in use");
        }

        // DTO를 엔티티로 변환
        UserEntity userEntity = new UserEntity();
        userEntity.setEmail(userJoinDTO.getEmail());
        userEntity.setPassword(passwordEncoder.encode(userJoinDTO.getPassword()));
        userEntity.setName(userJoinDTO.getName());
        userEntity.setUserHeight(userJoinDTO.getUserHeight());
        userEntity.setUserGender(userJoinDTO.getUserGender());
        userEntity.setUserAge(userJoinDTO.getUserAge());
        userEntity.setRole("ROLE_USER");

        // 사용자 정보 저장
        return userRepository.save(userEntity);
    }

}
