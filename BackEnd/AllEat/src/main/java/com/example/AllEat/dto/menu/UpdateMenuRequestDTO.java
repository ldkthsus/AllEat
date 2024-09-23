package com.example.AllEat.dto.menu;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UpdateMenuRequestDTO {

    private LocalDate date;
    private List<AddMenuRequestDTO> addMenuRequestDTOList;
}
