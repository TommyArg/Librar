package com.dsf.librar.repository;

import com.dsf.librar.entity.CashRegister;
import com.dsf.librar.enums.CashRegisterStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CashRegisterRepository extends JpaRepository<CashRegister, Long> {
    Optional<CashRegister> findBySucursalIdAndStatus(
            Long sucursalId,
            CashRegisterStatus status
    );

    boolean existsBySucursalIdAndStatus(
            Long sucursalId,
            CashRegisterStatus status
    );
}