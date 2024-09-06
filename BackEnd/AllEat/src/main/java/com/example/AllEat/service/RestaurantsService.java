package com.example.AllEat.service;

import com.example.AllEat.entity.RestaurantsEntity;
import com.example.AllEat.entity.UserEntity;
import com.example.AllEat.dto.restaurants.RestaurantsCreateDTO;
import com.example.AllEat.jwt.JwtUtil;
import com.example.AllEat.repository.RestaurantsRepository;
import com.example.AllEat.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RestaurantsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RestaurantsRepository restaurantsRepository;

    private final JwtUtil jwtUtil;

    public RestaurantsService(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    // 레스토랑 생성
    public RestaurantsEntity createRestaurant(RestaurantsCreateDTO restaurantsCreateDTO, HttpServletRequest request) {
        UserEntity user = findByRequest(request);

        RestaurantsEntity restaurantsEntity = new RestaurantsEntity();
        restaurantsEntity.setRestaurantsName(restaurantsCreateDTO.getRestaurantsName());
        restaurantsEntity.setRestaurantsType(RestaurantsEntity.RestaurantsType.valueOf(restaurantsCreateDTO.getRestaurantsType()));

        return restaurantsRepository.save(restaurantsEntity);
    }

    // 레스토랑 삭제
    public void deleteRestaurant(Integer id, HttpServletRequest request) {
        UserEntity user = findByRequest(request);  // 유저 인증 (필요에 따라 검증)
        RestaurantsEntity restaurant = restaurantsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Restaurant not found"));
        restaurantsRepository.delete(restaurant);
    }

    // 유저 정보를 요청에서 추출 (토큰 사용)
    private UserEntity findByRequest(HttpServletRequest request) {
        String token = request.getHeader("Authorization").substring(7);  // "Bearer " 제거
        String email = jwtUtil.getEmail(token);
        return userRepository.findByEmail(email);
    }
}
