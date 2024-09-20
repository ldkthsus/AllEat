package com.example.AllEat.dto.user;

import com.fasterxml.jackson.annotation.JsonProperty;
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
    private String name;
    @JsonProperty("user_height")
    private Double userHeight;
    @JsonProperty("user_gender")
    private Integer userGender;
    @JsonProperty("user_age")
    private Integer userAge;
    @JsonProperty("activity")
    private Integer amountActivity;
}
