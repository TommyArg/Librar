package com.dsf.librar.repository;

import com.dsf.librar.entity.CashMovement;
import com.dsf.librar.enums.CashMovementReason;
import com.dsf.librar.enums.CashMovementType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface CashMovementRepository extends JpaRepository<CashMovement, Long> {
    List<CashMovement> findByCashRegisterId(Long cashRegisterId);

    List<CashMovement> findByCashRegisterIdAndType(
            Long cashRegisterId,
            CashMovementType type
    );

    List<CashMovement> findByCashRegisterIdAndReason(
            Long cashRegisterId,
            CashMovementReason reason
    );

    List<CashMovement> findByCashRegisterIdAndOccurredAtBetween(
            Long cashRegisterId,
            LocalDateTime from,
            LocalDateTime to
    );
}