package com.dsf.librar.repository;

import com.dsf.librar.entity.CashMovement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;

@Repository
public interface CashMovementRepository extends JpaRepository<CashMovement, Long> {
    @Query(value = """
        SELECT
            COALESCE(SUM(
                CASE WHEN type = 'CASH_IN' THEN amount ELSE 0 END
            ), 0) AS cashIn,
            COALESCE(SUM(
                CASE WHEN type = 'CASH_OUT' THEN amount ELSE 0 END
            ), 0) AS cashOut
        FROM cash_movement
        WHERE cash_register_id = :cashRegisterId
        """, nativeQuery = true)
    CashMovementTotals calculateTotals(
            @Param("cashRegisterId") Long cashRegisterId
    );

    interface CashMovementTotals {
        BigDecimal getCashIn();
        BigDecimal getCashOut();
    }
}