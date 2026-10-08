package com.dsf.librar.service;

import com.dsf.librar.dto.request.CashRegisterCloseRequestDto;
import com.dsf.librar.dto.request.CashRegisterOpenRequestDto;
import com.dsf.librar.dto.response.CashRegisterCountResponseDto;
import com.dsf.librar.dto.response.CashRegisterResponseDto;

public interface CashRegisterService {
    CashRegisterResponseDto open(Long sucursalId, CashRegisterOpenRequestDto request);
    CashRegisterResponseDto close(Long cashRegisterId, CashRegisterCloseRequestDto request);
    CashRegisterResponseDto getCurrent(Long sucursalId);
    CashRegisterCountResponseDto count(Long cashRegisterId);
}
