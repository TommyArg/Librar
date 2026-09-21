import React from 'react';
import { Button, Result } from 'antd';
import { getUserRole } from '../../utils/auth';

export const HomePage: React.FC = () => {
    const role = getUserRole();

    return (
        <div style={{ padding: '50px' }}>
            <Result
                status="success"
                title="¡Bienvenido al Panel de Control!"
                subTitle={`Has ingresado correctamente. Tu rol en el sistema es: ${role || 'Desconocido'}`}
            />

            {/* button ONLY visible if you have have the admin role */}
            {role === 'ROLE_ADMIN' && (
                <Button type="primary" danger>
                    Configuraciones Avanzadas
                </Button>
            )}
        </div>
    );
};