import React, { useEffect, useState } from 'react';
import { Table, Typography, Space, Card, message } from 'antd';
import axios from 'axios';
import ExcelUploadButton from '../../components/ExcelUploadButton';

const { Title } = Typography;

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    // GET to fill the table
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

    // mount components and search
    useEffect(() => {
        fetchProducts();
    }, []);

    // exact mapping of the names in the DTO of ProductResponse
    const columns = [
        { title: 'Código', dataIndex: 'barcode', key: 'barcode' },
        { title: 'Nombre', dataIndex: 'name', key: 'name' },
        { title: 'Precio Compra', dataIndex: 'purchasePrice', key: 'purchasePrice', render: (price) => `$${price}` },
        { title: 'Precio Venta', dataIndex: 'sellingPrice', key: 'sellingPrice', render: (price) => `$${price}` },
        { title: 'Stock Mínimo', dataIndex: 'minimumStock', key: 'minimumStock' },
    ];

    return (
        <div style={{ padding: '24px' }}>
            <Card>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <Title level={3} style={{ margin: 0 }}>Gestión de Productos</Title>
                    <ExcelUploadButton onUploadSuccess={fetchProducts} />
                </div>

                <Table
                    dataSource={products}
                    columns={columns}
                    rowKey="id"
                    loading={loading}
                    pagination={{ pageSize: 8 }}
                />
            </Card>
        </div>
    );
};

export default ProductsPage;