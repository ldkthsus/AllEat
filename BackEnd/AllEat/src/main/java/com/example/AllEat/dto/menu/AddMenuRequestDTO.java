package com.example.AllEat.dto.menu;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class AddMenuRequestDTO {

    @JsonProperty("menu_id")
    private Integer menuId;

    @JsonProperty("diary_time")
    private String diaryTime;
}
