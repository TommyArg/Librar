package com.dsf.librar.controller;

import com.dsf.librar.dto.LoginRequestDto;
import com.dsf.librar.dto.LoginResponseDto;
import com.dsf.librar.dto.RegisterRequestDto;
import com.dsf.librar.security.JwtService;
import com.dsf.librar.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class LoginController {

    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;
    private final JwtService jwtService;
    private final UserService userService;


    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(@RequestBody LoginRequestDto request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );
        final UserDetails userDetails = userDetailsService.loadUserByUsername(request.getUsername());
        final String jwt = jwtService.generateToken(userDetails);
        return ResponseEntity.ok(new LoginResponseDto(jwt));
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@Valid @RequestBody RegisterRequestDto request) {
        userService.registerUser(request);
        return ResponseEntity.status(HttpStatus.CREATED).body("Usuario registrado exitosamente");
    }

}