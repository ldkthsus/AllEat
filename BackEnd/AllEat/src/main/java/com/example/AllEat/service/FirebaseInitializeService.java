package com.example.AllEat.service;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.FileInputStream;

@Service
public class FirebaseInitializeService {

    @PostConstruct
    public void initialize() {
        try{
            FileInputStream serviceAccount =
                    new FileInputStream("./src/main/resources/alleat-d122f-firebase-adminsdk-cj6bq-baf5dde3ab.json");

            FirebaseOptions options = new FirebaseOptions.Builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .build();

            FirebaseApp.initializeApp(options);
        } catch (Exception e) {
            System.out.println(e);
        }
    }
}
