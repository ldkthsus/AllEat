package com.example.AllEat.service;

import com.example.AllEat.dto.user.UpdateRequestDTO;
import com.example.AllEat.dto.user.UserJoinDTO;
import com.example.AllEat.dto.user.UserResponseDTO;
import com.example.AllEat.entity.GoalEntity;
import com.example.AllEat.entity.UserEntity;
import com.example.AllEat.jwt.JwtUtil;
import com.example.AllEat.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import jakarta.servlet.http.HttpServletRequest;


@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final @Lazy PasswordEncoder passwordEncoder;

    private final JwtUtil jwtUtil;


    public UserEntity findByRequest(HttpServletRequest request) {

        System.out.println(request.toString());
        System.out.println(request);
        String token = request.getHeader("Authorization").substring(7);
        UserEntity user = userRepository.findByEmail(jwtUtil.getEmail(token));
        return user;

    }

    public UserEntity registerUser(UserJoinDTO userJoinDTO) {
        // 이메일 중복 체크
        if (userRepository.findByEmail(userJoinDTO.getEmail()) != null) {
            throw new IllegalArgumentException("Email already in use");
        }

        // DTO를 엔티티로 변환
        UserEntity userEntity = UserEntity.builder()
                .email(userJoinDTO.getEmail())
                .password(passwordEncoder.encode(userJoinDTO.getPassword()))
                .role("ROLE_USER")
                .build();

        // 사용자 정보 저장
        return userRepository.save(userEntity);
    }
    public void deleteUserInfo(HttpServletRequest request) {
        UserEntity userEntity = findByRequest(request);
        if (userEntity != null) {
            userRepository.delete(userEntity); // 유저 정보를 삭제
        } else {
            throw new RuntimeException("User not found");
        }
    }

    public UserEntity updateUserInfo(String email, UpdateRequestDTO updateRequest, String prifileUrl) {
        UserEntity findUser = userRepository.findByEmail(email);
        if(findUser != null) {
            String encodedPassword = passwordEncoder.encode(updateRequest.getPassword1());
            findUser.updateInfo(updateRequest, prifileUrl, encodedPassword);
            userRepository.save(findUser);
            return findUser;
        }
        else {
            throw new RuntimeException("User not found");
        }
    }

    public boolean comparePassword(String firstPassword, String secondPassword) {
        if (firstPassword == null || secondPassword == null){
            return false;
        }
        return firstPassword.equals(secondPassword);
    }

    public UserResponseDTO getUserDTO(UserEntity userEntity) {
        UserResponseDTO userResponseDTO = new UserResponseDTO();
        userResponseDTO.fromEntity(userEntity);
        return userResponseDTO;
    }

}
