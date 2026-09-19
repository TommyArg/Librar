package com.dsf.librar.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RoleRequestDto {
    @NotBlank(message = "El nombre del rol no puede estar vacío")
    private String name;
}
