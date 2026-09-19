package com.dsf.librar.mapper;

import com.dsf.librar.dto.UserRequestDto;
import com.dsf.librar.dto.UserResponseDto;
import com.dsf.librar.entity.User;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mapping(target = "role", ignore = true)
    @Mapping(target = "sucursal", ignore = true)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "active", ignore = true)
    User toEntity(UserRequestDto dto);

    @Mapping(target = "role", source = "role.id")
    @Mapping(target = "sucursal", source = "sucursal.id")
    UserResponseDto toDto(User user);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "password", ignore = true)
    @Mapping(target = "role", ignore = true)
    @Mapping(target = "sucursal", ignore = true)
    @Mapping(target = "active", ignore = true)
    void updateUser(UserRequestDto dto, @MappingTarget User user);

    List<UserResponseDto> listUser(List<User> users);
}
