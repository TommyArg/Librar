import React, { useState } from 'react';
import { Table, Button, Form, Input, Space, Typography, message } from 'antd';
import { PlusOutlined, FolderOutlined } from '@ant-design/icons';

const { Title } = Typography;

interface Category {
    id: number;
    name: string;
}

const CategoryPage: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([
        { id: 1, name: 'Novelas' },
        { id: 2, name: 'Textos Escolares' },
        { id: 3, name: 'Papelería' },
    ]);
    const [form] = Form.useForm();

    const handleAddCategory = (values: { name: string }) => {
        const newCategory: Category = {
            id: Date.now(),
            name: values.name,
        };
        setCategories([...categories, newCategory]);
        form.resetFields();
        message.success('¡Categoría agregada con éxito!');
    };

    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id', width: 80 },
        { title: 'Nombre de la Categoría', dataIndex: 'name', key: 'name' },
    ];

    return (
        <div style={{ maxWidth: 800, margin: '0 auto', width: '100%' }}>
            <Title level={2} style={{ marginBottom: 24 }}>Gestión de Categorías</Title>

            <Form form={form} layout="inline" onFinish={handleAddCategory} style={{ marginBottom: 24, display: 'flex', gap: '12px' }}>
                <Form.Item name="name" rules={[{ required: true, message: 'Ingresa el nombre de la categoría' }]} style={{ flex: 1, margin: 0 }}>
                    <Input placeholder="Nombre de la nueva categoría..." size="large" prefix={<FolderOutlined />} />
                </Form.Item>
                <Form.Item style={{ margin: 0 }}>
                    <Button type="primary" htmlType="submit" icon={<PlusOutlined />} size="large">
                        Agregar
                    </Button>
                </Form.Item>
            </Form>

            <Table
                dataSource={categories}
                columns={columns}
                rowKey="id"
                scroll={{ x: 'max-content' }}
            />
        </div>
    );
};

export default CategoryPage;