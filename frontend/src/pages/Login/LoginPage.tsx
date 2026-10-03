import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Card, message, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { axiosClient } from '../../services/axiosClient';

const { Title } = Typography;

export const LoginPage: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem('token');
    }, []);
    // onFinish only runs if all inputs are filled
    const onFinish = async (values: any) => {
        setLoading(true);

        // just to be sure, we remove the previous token (in case there is)
        localStorage.removeItem('token');

        try {
            const response = await axiosClient.post('/auth/login', {
                username: values.username,
                password: values.password
            });

            // we save the new token
            localStorage.setItem('token', response.data.token);

            message.success('¡Login exitoso!');
            navigate('/');
        } catch (error) {
            message.error('Usuario o contraseña incorrectos');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f2f5' }}>
            <Card style={{ width: 400, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                <div style={{ textAlign: 'center', marginBottom: 24 }}>
                    <Title level={3}>Acceso a Librar</Title>
                </div>

                <Form name="login_form" onFinish={onFinish} layout="vertical">
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Por favor ingresa tu usuario' }]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="Usuario" size="large" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Por favor ingresa tu contraseña' }]}
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder="Contraseña" size="large" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" size="large" block loading={loading}>
                            Ingresar
                        </Button>
                    </Form.Item>

                    <div style={{ textAlign: 'center', marginTop: '16px' }}>
                        <Typography.Text>¿No tienes usuario registrado? </Typography.Text>
                        <Button type="link" onClick={() => navigate('/register')} style={{ padding: 0 }}>
                            Crear Usuario
                        </Button>
                    </div>
                </Form>
            </Card>
        </div>
    );
};