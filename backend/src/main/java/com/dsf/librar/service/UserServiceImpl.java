package com.dsf.librar.service;

import com.dsf.librar.dto.UserRequestDto;
import com.dsf.librar.dto.UserResponseDto;
import com.dsf.librar.entity.Role;
import com.dsf.librar.entity.User;
import com.dsf.librar.mapper.UserMapper;
import com.dsf.librar.repository.RoleRepository;
import com.dsf.librar.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void createUser(UserRequestDto userRequestDto) {
        Role role = roleRepository.findById(userRequestDto.getRole())
                .orElseThrow(() -> new RuntimeException("Role not found"));
        User user = userMapper.toEntity(userRequestDto);
        //step over the plain text password with the encrypted version of the password
        user.setPassword(passwordEncoder.encode(userRequestDto.getPassword()));

        user.setRole(role);
        user.setSucursal(null);
        user.setActive(true);

        userRepository.save(user);
    }

    @Override
    public List<UserResponseDto> listUser() {
        return userMapper.listUser(userRepository.findAll());
    }

    @Override
    public UserResponseDto listUserId(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return userMapper.toDto(user);
    }

    @Override
    public UserResponseDto editUser(Long id, UserRequestDto userRequestDto) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        userMapper.updateUser(userRequestDto, user);
        if (userRequestDto.getPassword() != null && !userRequestDto.getPassword().isBlank()) {
            // this line would make the passwords plain text instead of saving them encrypted
            // user.setPassword(userRequestDto.getPassword());

            //so now we encode the password before saving it in the DB
            user.setPassword(passwordEncoder.encode(userRequestDto.getPassword()));
        }
        if (userRequestDto.getRole() != null) {
            Role role = roleRepository.findById(userRequestDto.getRole())
                    .orElseThrow(() -> new RuntimeException("Role not found"));
            user.setRole(role);
        }
        return userMapper.toDto(userRepository.save(user));
    }

    @Override
    @Transactional
    public void restoreUser(Long id) {
        userRepository.restoreById(id);
    }

    @Override
    @Transactional
    public void deleteUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setActive(false);
        userRepository.save(user);
    }
}
