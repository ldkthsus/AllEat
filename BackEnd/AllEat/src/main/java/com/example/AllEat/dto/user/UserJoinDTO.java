package com.example.AllEat.dto.user;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserJoinDTO {
    @NotBlank(message = "Email is mandatory")
    private String email;

    @NotBlank(message = "Password is mandatory")
    private String password;

    @NotBlank(message = "Name is mandatory")
    private String name;

    private Double userHeight;
    private int userGender;
    private int userAge;
}
