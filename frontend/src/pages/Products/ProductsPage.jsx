import React, { useEffect, useState } from 'react';
import { Table, Typography, Card, message, Input, Button, Modal, Form, InputNumber, Space } from 'antd';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import axios from 'axios';
import ExcelUploadButton from '../../components/ExcelUploadButton';

const { Title } = Typography;
const { Search } = Input;

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [form] = Form.useForm();

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8080/api/product/list', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setProducts(response.data);
        } catch (error) {
            console.error(error);
            message.error("Error al cargar los productos");
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async (value) => {
        if (!value || value.trim() === '') {
            fetchProducts();
            return;
        }
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:8080/api/product/search?q=${value}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setProducts(response.data);
        } catch (error) {
            console.error(error);
            message.error("Error al buscar productos");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const showCreateModal = () => {
        setEditingProduct(null);
        form.resetFields();
        setIsModalVisible(true);
    };

    const showEditModal = (record) => {
        setEditingProduct(record);
        form.setFieldsValue(record);
        setIsModalVisible(true);
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
    };

    const handleModalSubmit = async (values) => {
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };

            if (editingProduct) {
                await axios.put(`http://localhost:8080/api/product/update/${editingProduct.id}`, values, config);
                message.success('Producto actualizado correctamente');
            } else {
                await axios.post('http://localhost:8080/api/product', values, config);
                message.success('Producto creado correctamente');
            }

            setIsModalVisible(false);
            fetchProducts();
        } catch (error) {
            console.error(error);
            message.error('Error al guardar el producto');
        }
    };

    const columns = [
        { title: 'Código', dataIndex: 'barcode', key: 'barcode' },
        { title: 'Nombre', dataIndex: 'name', key: 'name' },
        { title: 'Precio Compra', dataIndex: 'purchasePrice', key: 'purchasePrice', render: (price) => `$${price}` },
        { title: 'Precio Venta', dataIndex: 'sellingPrice', key: 'sellingPrice', render: (price) => `$${price}` },
        { title: 'Stock Mínimo', dataIndex: 'minimumStock', key: 'minimumStock' },
        {
            title: 'Acciones',
            key: 'actions',
            render: (_, record) => (
                <Button type="link" icon={<EditOutlined />} onClick={() => showEditModal(record)}>
                    Editar
                </Button>
            ),
        },
    ];

    return (
        <div style={{ padding: '24px' }}>
            <Card>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', gap: '16px' }}>
                    <Title level={3} style={{ margin: 0 }}>Gestión de Productos</Title>

                    <div style={{ display: 'flex', gap: '16px', flex: 1, justifyContent: 'flex-end' }}>
                        <Search
                            placeholder="Buscar por nombre o código..."
                            allowClear
                            onSearch={handleSearch}
                            style={{ maxWidth: 300 }}
                        />
                        <Button type="primary" icon={<PlusOutlined />} onClick={showCreateModal}>
                            Nuevo Producto
                        </Button>
                        <ExcelUploadButton onUploadSuccess={fetchProducts} />
                    </div>
                </div>

                <Table
                    dataSource={products}
                    columns={columns}
                    rowKey="id"
                    loading={loading}
                    pagination={{ pageSize: 8 }}
                />
            </Card>

            <Modal
                title={editingProduct ? "Editar Producto" : "Nuevo Producto"}
                open={isModalVisible}
                onCancel={handleModalCancel}
                onOk={() => form.submit()}
                okText="Guardar"
                cancelText="Cancelar"
                destroyOnClose
            >
                <Form form={form} layout="vertical" onFinish={handleModalSubmit}>
                    <Form.Item name="barcode" label="Código de Barras" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="name" label="Nombre del Producto" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Space style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                        <Form.Item name="purchasePrice" label="Precio Compra" rules={[{ required: true }]}>
                            <InputNumber min={0} style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item name="sellingPrice" label="Precio Venta" rules={[{ required: true }]}>
                            <InputNumber min={0} style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item name="minimumStock" label="Stock Mínimo" rules={[{ required: true }]}>
                            <InputNumber min={0} style={{ width: '100%' }} />
                        </Form.Item>
                    </Space>

                    <Space style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                        <Form.Item name="category" label="ID Categoría" rules={[{ required: true }]}>
                            <InputNumber min={1} style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item name="supplier" label="ID Proveedor" rules={[{ required: true }]}>
                            <InputNumber min={1} style={{ width: '100%' }} />
                        </Form.Item>
                    </Space>
                </Form>
            </Modal>
        </div>
    );
};

export default ProductsPage;