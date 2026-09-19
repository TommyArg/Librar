package com.dsf.librar.security;

import com.dsf.librar.entity.User;
import com.dsf.librar.repository.UserRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    public UserDetailsServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // search username
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado: " + username));

        // Spring Security wants roles to start with "ROLE_", for example, "ROLE_ADMIN", "ROLE_EMPLOYEE"
        SimpleGrantedAuthority authority = new SimpleGrantedAuthority(user.getRole().getName());

        // returns object User (Spring Security, NOT the user entity)
        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                //parameters: active field, active account, active credentials, not blocked account
                user.getActive() != null ? user.getActive() : false, true, true, true,
                Collections.singletonList(authority)
        );
    }
}