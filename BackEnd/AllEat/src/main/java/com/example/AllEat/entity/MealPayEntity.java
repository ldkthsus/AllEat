package com.example.AllEat.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "mealpay")
public class MealPayEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer mealPayId;

    @Column(name = "amount")
    private Integer amount;

    @OneToOne
    @JoinColumn(name = "paytransaction_id")
    private PayTransactionEntity payTransaction;

    @ManyToOne
    @JoinColumn(name = "diary_id")
    private DiaryEntity diary;

}
