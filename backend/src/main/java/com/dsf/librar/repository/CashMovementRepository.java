package com.dsf.librar.repository;

import com.dsf.librar.entity.CashMovement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CashMovementRepository extends JpaRepository<CashMovement, Long> {
}