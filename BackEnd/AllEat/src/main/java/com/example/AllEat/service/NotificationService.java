package com.example.AllEat.service;

import com.google.firebase.messaging.*;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import com.google.firebase.messaging.Notification;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;
@Service
public class NotificationService {

    private final UserService userService; // 모든 사용자 목록을 가져오는 서비스

    public NotificationService(UserService userService) {
        this.userService = userService;
    }

    // 매일 오전 9시에 스케줄된 작업 실행
    @Scheduled(cron = "0 0 9  * * *")
    public void sendDailyNotifications() throws FirebaseMessagingException {
        System.out.println("왜 작동을 안해???");
        List<String> userTokens = userService.getAllUserTokens(); // 모든 사용자 FCM 토큰 목록
        MulticastMessage message = MulticastMessage.builder()
                .putData("score", "850")
                .putData("time", "2:45")
                .addAllTokens(userTokens)
                .build();

        BatchResponse response = FirebaseMessaging.getInstance().sendMulticast(message);
        System.out.println(response.getSuccessCount() + " messages were sent successfully");
        System.out.println("뭔가 하긴 했음");
    }

    // 결제 알림 전송 메서드
    public String sendNotification(String token, String title, String body) throws FirebaseMessagingException {

        Message message = Message.builder()
                        .setNotification(Notification.builder()
                                .setTitle("aa")
                                .setBody("bb")
                                .build())
                        .setToken(token)
                        .build();

        String response = FirebaseMessaging.getInstance().send(message);
        return "Successfully sent message: " + response;

    }
}