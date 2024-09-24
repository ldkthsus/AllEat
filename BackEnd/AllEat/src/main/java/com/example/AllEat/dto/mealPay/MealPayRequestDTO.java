package com.example.AllEat.dto.mealPay;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MealPayRequestDTO {

    @JsonProperty("transaction_id")
    private Integer transactionId;

    @JsonProperty("diary_id")
    private Integer diaryId;

    @JsonProperty("amount")
    private Integer amount;
}
