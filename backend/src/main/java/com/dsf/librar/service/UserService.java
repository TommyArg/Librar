package com.dsf.librar.service;

import com.dsf.librar.dto.UserRequestDto;
import com.dsf.librar.dto.UserResponseDto;

import java.util.List;

public interface UserService {
    void createUser(UserRequestDto userRequestDto);
    List<UserResponseDto> listUser();
    UserResponseDto listUserId(Long id);
    UserResponseDto editUser(Long id, UserRequestDto userRequestDto);
    void restoreUser(Long id);
    void deleteUser(Long id);
}

