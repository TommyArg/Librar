package com.dsf.librar.controller;

import com.dsf.librar.dto.request.CashRegisterCloseRequestDto;
import com.dsf.librar.dto.request.CashRegisterOpenRequestDto;
import com.dsf.librar.dto.response.CashRegisterCountResponseDto;
import com.dsf.librar.dto.response.CashRegisterResponseDto;
import com.dsf.librar.service.CashRegisterService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/cashregister")
public class CashRegisterController {
    private final CashRegisterService cashRegisterService;

    @PostMapping("/open")
    public ResponseEntity<CashRegisterResponseDto> open(@RequestParam Long sucursalId,
                                                        @Valid @RequestBody CashRegisterOpenRequestDto request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(cashRegisterService.open(sucursalId, request));
    }

    @PostMapping("/{id}/close")
    public ResponseEntity<CashRegisterResponseDto> close(@PathVariable Long id,
                                                         @Valid @RequestBody CashRegisterCloseRequestDto request) {
        return ResponseEntity.ok(cashRegisterService.close(id, request));
    }

    @GetMapping("/current")
    public ResponseEntity<CashRegisterResponseDto> getCurrent(@RequestParam Long sucursalId) {
        return ResponseEntity.ok(cashRegisterService.getCurrent(sucursalId));
    }

    @GetMapping("/{id}/count")
    public ResponseEntity<CashRegisterCountResponseDto> count(@PathVariable Long id) {
        return ResponseEntity.ok(cashRegisterService.count(id));
    }
}
