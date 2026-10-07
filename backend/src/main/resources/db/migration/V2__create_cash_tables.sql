-- table: caja
CREATE TABLE cash_register
(
    id             BIGINT AUTO_INCREMENT PRIMARY KEY,
    sucursal_id      BIGINT         NOT NULL,
    user_id        BIGINT         NOT NULL,
    opening_amount DECIMAL(12, 2) NOT NULL,
    closing_amount DECIMAL(12, 2),
    opened_at      DATETIME       NOT NULL,
    closed_at      DATETIME,
    status         ENUM('OPEN', 'CLOSED') NOT NULL DEFAULT 'OPEN',
    notes          TEXT,
    CONSTRAINT fk_cash_register_sucursal
        FOREIGN KEY (sucursal_id) REFERENCES sucursal (id),
    CONSTRAINT fk_cash_register_user
        FOREIGN KEY (user_id) REFERENCES user (id)
);

-- table: movimiento caja
CREATE TABLE cash_movement
(
    id               BIGINT PRIMARY KEY AUTO_INCREMENT,
    cash_register_id BIGINT         NOT NULL,
    type             ENUM('CASH_IN', 'CASH_OUT') NOT NULL,
    reason           ENUM(
        'SALE',
        'REFUND',
        'DEPOSIT',
        'WITHDRAWAL',
        'ADJUSTMENT'
    ) NOT NULL,
    amount           DECIMAL(12, 2) NOT NULL,
    description      VARCHAR(255),
    occurred_at      DATETIME       NOT NULL,
    CONSTRAINT fk_cash_movement_cash_register
        FOREIGN KEY (cash_register_id)
            REFERENCES cash_register (id)
);

