package com.dsf.librar.dto.response;

import com.dsf.librar.enums.CashRegisterStatus;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record CashRegisterResponseDto(
        Long id,
        Long sucursalId,
        Long userId,
        BigDecimal openingAmount,
        BigDecimal closingAmount,
        BigDecimal expectedAmount,
        BigDecimal difference,
        LocalDateTime openedAt,
        LocalDateTime closedAt,
        CashRegisterStatus status,
        String notes
) {
}
