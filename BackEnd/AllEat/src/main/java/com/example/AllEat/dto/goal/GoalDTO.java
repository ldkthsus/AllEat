package com.example.AllEat.dto.goal;

import jakarta.persistence.Column;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GoalDTO {
    private Integer id;
    @Column(name = "goal_weight")
    private double goalWeight;
    @Column(name = "goal_cost")
    private Integer goalCost;

}
