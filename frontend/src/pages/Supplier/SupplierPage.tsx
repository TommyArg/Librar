import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, Space, Typography, message, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { Title } = Typography;

interface Supplier {
    id: number;
    name: string;
    cellphone?: string;
    phone?: string;
    email?: string;
    note?: string;
    active: boolean;
}

const SupplierPage: React.FC = () => {
    const [suppliers, setSuppliers] = useState<Supplier[]>([
        { id: 1, name: 'Editorial Alfa S.A.', cellphone: '3704123456', email: 'ventas@alfa.com', active: true },
    ]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    const handleAddSupplier = (values: any) => {
        const newSupplier: Supplier = {
            id: Date.now(),
            ...values,
            active: true,
        };
        setSuppliers([...suppliers, newSupplier]);
        setIsModalVisible(false);
        form.resetFields();
        message.success('¡Proveedor registrado con éxito!');
    };

    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id', width: 70 },
        { title: 'Nombre', dataIndex: 'name', key: 'name' },
        { title: 'Celular', dataIndex: 'cellphone', key: 'cellphone' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        {
            title: 'Estado',
            dataIndex: 'active',
            key: 'active',
            render: (active: boolean) => (
                <Tag color={active ? 'green' : 'red'}>
                    {active ? 'ACTIVO' : 'INACTIVO'}
                </Tag>
            )
        },
    ];

    return (
        <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <Title level={2} style={{ margin: 0 }}>Gestión de Proveedores</Title>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)}>
                    Nuevo Proveedor
                </Button>
            </div>

            <Table
                dataSource={suppliers}
                columns={columns}
                rowKey="id"
                scroll={{ x: 'max-content' }}
            />

            <Modal
                title="Registrar Nuevo Proveedor"
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
            >
                <Form form={form} layout="vertical" onFinish={handleAddSupplier}>
                    <Form.Item name="name" label="Nombre / Empresa" rules={[{ required: true, message: 'El nombre es obligatorio' }]}>
                        <Input placeholder="Ej. Librería Mayorista SRL" />
                    </Form.Item>
                    <Form.Item name="cellphone" label="Celular">
                        <Input placeholder="Ej. 3704..." />
                    </Form.Item>
                    <Form.Item name="phone" label="Teléfono Fijo">
                        <Input placeholder="Ej. 442..." />
                    </Form.Item>
                    <Form.Item name="email" label="Correo Electrónico">
                        <Input type="email" placeholder="correo@proveedor.com" />
                    </Form.Item>
                    <Form.Item name="note" label="Notas u Observaciones">
                        <Input.TextArea rows={3} placeholder="Detalles de entrega, días de visita..." />
                    </Form.Item>
                    <Form.Item style={{ textAlign: 'right', marginBottom: 0 }}>
                        <Space>
                            <Button onClick={() => setIsModalVisible(false)}>Cancelar</Button>
                            <Button type="primary" htmlType="submit">Guardar Proveedor</Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default SupplierPage;