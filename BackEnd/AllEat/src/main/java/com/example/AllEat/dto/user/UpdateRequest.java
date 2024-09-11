package com.example.AllEat.dto.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UpdateRequest {

    private String password1;
    private String password2;
    private double goalWeight;
    private Integer goalCost;
    private float weight;
}
