package com.dsf.librar.service.impl;

import com.dsf.librar.dto.request.SucursalRequestDto;
import com.dsf.librar.dto.response.SucursalResponseDto;
import com.dsf.librar.entity.Sucursal;
import com.dsf.librar.mapper.SucursalMapper;
import com.dsf.librar.repository.SucursalRepository;
import com.dsf.librar.service.SucursalService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class SucursalServiceImpl implements SucursalService {
    private final SucursalRepository sucursalRepository;
    private final SucursalMapper sucursalMapper;

    @Override
    public void createSucursal(SucursalRequestDto sucursalRequestDto) {
        Sucursal sucursal = sucursalMapper.toEntity(sucursalRequestDto);
        sucursalRepository.save(sucursal);
    }

    @Override
    public List<SucursalResponseDto> listSucursal() {
        return sucursalMapper.listSucursal(sucursalRepository.findAll());
    }

    @Override
    public SucursalResponseDto getSucursalById(Long id) {
        Sucursal sucursal = sucursalRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Sucursal not found"));
        return sucursalMapper.toDto(sucursal);
    }

    @Override
    public void updateSucursal(Long id, SucursalRequestDto sucursalRequestDto) {
        Sucursal sucursal = sucursalRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Sucursal not found"));
        sucursalMapper.updateSucursal(sucursalRequestDto, sucursal);
    }

    @Override
    public void deleteSucursal(Long id) {
        Sucursal sucursal = sucursalRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Sucursal not found"));
        sucursal.setActive(false);
        sucursalRepository.save(sucursal);
    }

    @Override
    public void restoreSucursal(Long id) {
        sucursalRepository.restoreById(id);
    }
}
