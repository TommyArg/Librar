package com.dsf.librar.mapper;

import com.dsf.librar.dto.response.CashRegisterResponseDto;
import com.dsf.librar.entity.CashRegister;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CashRegisterMapper {

    @Mapping(target = "sucursalId", source = "sucursal.id")
    @Mapping(target = "userId", source = "user.id")
    @Mapping(target = "expectedAmount", ignore = true)
    @Mapping(target = "difference", ignore = true)
    CashRegisterResponseDto toDto(CashRegister cashRegister);
}
