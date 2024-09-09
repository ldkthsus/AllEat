package com.example.AllEat.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "Alarm")
public class AlarmEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "alarm_id")
    private Integer id;

    @Column(name = "breakfast_alarm")
    private java.sql.Time breakfastAlarm;

    @Column(name = "lunch_alarm")
    private java.sql.Time lunchAlarm;

    @Column(name = "dinner_alarm")
    private java.sql.Time dinnerAlarm;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserEntity user;
}
