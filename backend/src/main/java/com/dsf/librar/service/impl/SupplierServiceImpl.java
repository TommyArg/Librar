package com.dsf.librar.service.impl;

import com.dsf.librar.dto.request.SupplierRequestDto;
import com.dsf.librar.dto.response.SupplierResponseDto;
import com.dsf.librar.entity.Supplier;
import com.dsf.librar.mapper.SupplierMapper;
import com.dsf.librar.repository.SupplierRepository;
import com.dsf.librar.service.SupplierService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class SupplierServiceImpl implements SupplierService {

    private final SupplierRepository supplierRepository;
    private final SupplierMapper supplierMapper;

    @Override
    public void createSupplier(SupplierRequestDto supplierRequestDto) {
        Supplier supplier = supplierMapper.toEntity(supplierRequestDto);
        supplierRepository.save(supplier);
    }

    @Override
    public List<SupplierResponseDto> listSupplier() {
        return supplierMapper.listSupplier(supplierRepository.findAll());
    }

    @Override
    public SupplierResponseDto getSupplierById(Long id) {
        Supplier supplier = supplierRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Supplier not found"));
        return supplierMapper.toDto(supplier);
    }

    @Override
    public void updateSupplier(Long id, SupplierRequestDto supplierRequestDto) {
        Supplier supplier = supplierRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Supplier not found"));
        supplierMapper.updateSupplier(supplierRequestDto, supplier);
    }

    @Override
    public void deleteSupplier(Long id) {
        Supplier supplier = supplierRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Supplier not found"));
        supplier.setActive(false);
        supplierRepository.save(supplier);
    }

    @Override
    public void restoreSupplier(Long id) {
        supplierRepository.restoreById(id);
    }
}
