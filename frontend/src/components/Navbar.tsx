import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Layout, Button, Space, Typography } from 'antd';
import { LogoutOutlined, HomeOutlined } from '@ant-design/icons';

const { Header } = Layout;
const { Text } = Typography;

export const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <Header style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: '#ffffff',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            padding: '0 24px',
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            width: '100%'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <Text strong style={{ fontSize: '18px', color: '#262626', cursor: 'pointer' }} onClick={() => navigate('/')}>
                    Librar App
                </Text>
                {location.pathname !== '/' && (
                    <Button
                        icon={<HomeOutlined />}
                        onClick={() => navigate('/')}
                        type="text"
                    >
                        Inicio
                    </Button>
                )}
            </div>

            <div style={{ marginRight: '32px' }}>
                <Space>
                    <Button
                        danger
                        type="primary"
                        icon={<LogoutOutlined />}
                        onClick={handleLogout}
                    >
                        Cerrar Sesión
                    </Button>
                </Space>
            </div>
        </Header>
    );
};