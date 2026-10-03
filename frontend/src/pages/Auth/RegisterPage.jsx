import React, { useState } from 'react';
import { Form, Input, Button, Card, message, Typography, InputNumber, Space } from 'antd';
import { UserOutlined, LockOutlined, IdcardOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import { axiosClient } from '../../services/axiosClient';

const { Title, Text } = Typography;

export const RegisterPage = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');

            // if there is no token, we enter first-time mode
            if (!token || token === "null") {
                await axiosClient.post('/auth/register', {
                    username: values.username,
                    password: values.password,
                    completeName: values.completeName
                    // no role nor sucursal, autofilled by being the admin
                });
                message.success('¡Administrador principal creado! Por favor, inicia sesión.');
                navigate('/login');
            }
            // if there is a token, we are creating a new employee
            else {
                await axiosClient.post('/api/users', {
                    username: values.username,
                    password: values.password,
                    completeName: values.completeName,
                    role: values.roleId,
                    sucursal: values.sucursalId
                }, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                message.success('¡Empleado registrado con éxito en el sistema!');
                navigate('/');
            }
        } catch (error) {
            console.error(error);
            message.error('Error al procesar el registro. Verifica los datos.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f0f2f5', padding: '20px' }}>
            <Card style={{ width: 450, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                <div style={{ textAlign: 'center', marginBottom: 24 }}>
                    <Title level={3}>Registrar Primer Administrador</Title>
                    <Text type="secondary">Configuración inicial del sistema</Text>
                </div>

                <Form name="register_form" onFinish={onFinish} layout="vertical">
                    <Form.Item
                        name="completeName"
                        label="Nombre Completo"
                        rules={[{ required: true, message: 'Por favor ingresa el nombre real' }]}
                    >
                        <Input prefix={<IdcardOutlined />} placeholder="Ej. Matikanefukukitaru" size="large" />
                    </Form.Item>

                    <Form.Item
                        name="username"
                        label="Nombre de Usuario (Login)"
                        rules={[{ required: true, message: 'Por favor ingresa un usuario' }]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="Ej. Fukukitaru" size="large" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Contraseña"
                        rules={[{ required: true, message: 'Por favor ingresa una contraseña' }]}
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder="Contraseña segura" size="large" />
                    </Form.Item>

                    <Space style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                        <Form.Item
                            name="roleId"
                            label="ID del Rol"
                            rules={[{ required: true, message: 'Requerido' }]}
                        >
                            <InputNumber min={1} style={{ width: '100%' }} size="large" placeholder="Ej. 1" />
                        </Form.Item>

                        <Form.Item
                            name="sucursalId"
                            label="ID de Sucursal"
                            rules={[{ required: true, message: 'Requerido' }]}
                        >
                            <InputNumber min={1} style={{ width: '100%' }} size="large" placeholder="Ej. 1" />
                        </Form.Item>
                    </Space>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" size="large" block loading={loading}>
                            Crear Cuenta
                        </Button>
                    </Form.Item>

                    <div style={{ textAlign: 'center' }}>
                        <Text>¿Ya tienes cuenta? </Text>
                        <Link to="/login">Volver al Login</Link>
                    </div>
                </Form>
            </Card>
        </div>
    );
};