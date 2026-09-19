package com.dsf.librar.repository;

import com.dsf.librar.entity.StockSucursal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StockSucursalRepository extends JpaRepository<StockSucursal, Long> {
}