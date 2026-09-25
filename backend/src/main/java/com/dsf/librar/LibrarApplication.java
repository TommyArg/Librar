package com.dsf.librar;

import com.dsf.librar.entity.Role;
import com.dsf.librar.repository.RoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;


@SpringBootApplication
public class LibrarApplication {

    public static void main(String[] args) {
        SpringApplication.run(LibrarApplication.class, args);
    }

    //this creates new roles, if for any reason there are no instances of roleRepository (first time launching, for example)
    @Bean
    public CommandLineRunner initRoles(RoleRepository roleRepository) {
        return args -> {
            if (roleRepository.count() == 0) {
                Role adminRole = new Role();
                adminRole.setName("ADMIN");

                Role userRole = new Role();
                userRole.setName("USER");

                roleRepository.saveAll(java.util.List.of(adminRole, userRole));
                System.out.println("====== Roles ADMIN y USER inicializados en MariaDB ======");
            }
        };
    }

}
