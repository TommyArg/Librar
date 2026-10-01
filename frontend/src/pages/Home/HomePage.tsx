import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircleFilled } from '@ant-design/icons';
import { Typography } from 'antd';

const { Title, Text } = Typography;

const HomePage = () => {
    const navigate = useNavigate();
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '80vh',
            textAlign: 'center'
        }}>

            <CheckCircleFilled style={{ fontSize: '72px', color: '#52c41a', marginBottom: '16px' }} />


            <Title level={2} style={{ margin: 0, color: '#262626' }}>
                ¡Bienvenido al Panel de Control!
            </Title>
            <Text type="secondary" style={{ display: 'block', marginTop: '8px', marginBottom: '32px' }}>
                Has ingresado correctamente. Tu rol en el sistema es: ROLE_ADMIN
            </Text>


            <div style={{ display: 'flex', gap: '16px' }}>
                <button
                    style={{ padding: '8px 16px', backgroundColor: '#ff4d4f', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                >
                    Configuraciones Avanzadas
                </button>

                <button
                    onClick={() => navigate('/products')}
                    style={{ padding: '8px 16px', backgroundColor: '#1677ff', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                >
                    Ir a Gestión de Productos
                </button>
            </div>

        </div>
    );
};

export default HomePage;