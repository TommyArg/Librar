package com.dsf.librar.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StockSucursalResponseDto {
    private Long id;
    private Long product;
    private Long sucursal;
    private Integer amount;
}
