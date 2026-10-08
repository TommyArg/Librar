package com.dsf.librar.service;

import com.dsf.librar.dto.request.SucursalRequestDto;
import com.dsf.librar.dto.response.SucursalResponseDto;

import java.util.List;

public interface SucursalService {
    void createSucursal(SucursalRequestDto sucursalRequestDto);
    List<SucursalResponseDto> listSucursal();
    SucursalResponseDto getSucursalById(Long id);
    void updateSucursal(Long id, SucursalRequestDto sucursalRequestDto);
    void deleteSucursal(Long id);
    void restoreSucursal(Long id);
}
