import React, { useEffect, useState } from 'react';
import { Table, Typography, Card, message, Tag, Switch, Space } from 'antd';
import axios from 'axios';

const { Title, Text } = Typography;

const StockPage = () => {
    const [stocks, setStocks] = useState([]);
    const [products, setProducts] = useState({});
    const [sucursales, setSucursales] = useState({});
    const [loading, setLoading] = useState(false);
    const [showOnlyLowStock, setShowOnlyLowStock] = useState(false);

    const fetchData = async (isLowStockView) => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };

            // if the Switch is on, we call the low-stock endpoint
            const stockEndpoint = isLowStockView
                ? 'http://localhost:8080/api/stocksucursal/low-stock'
                : 'http://localhost:8080/api/stocksucursal/list';

            const [stocksRes, productsRes, sucursalesRes] = await Promise.all([
                axios.get(stockEndpoint, config),
                axios.get('http://localhost:8080/api/product/list', config),
                axios.get('http://localhost:8080/api/sucursal/list', config)
            ]);

            setStocks(stocksRes.data);

            const prodMap = {};
            productsRes.data.forEach(p => prodMap[p.id] = p);
            setProducts(prodMap);

            const sucMap = {};
            sucursalesRes.data.forEach(s => sucMap[s.id] = s);
            setSucursales(sucMap);

        } catch (error) {
            console.error(error);
            message.error("Error al cargar los datos del inventario");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(showOnlyLowStock);
        //runs again when the user turns it on/off
    }, [showOnlyLowStock]);

    const columns = [
        {
            title: 'Sucursal',
            dataIndex: 'sucursal',
            key: 'sucursal',
            render: (sucursalId) => sucursales[sucursalId]?.name || `ID Desconocido (${sucursalId})`,
            // order sucursal by name
            sorter: (a, b) => {
                const nameA = sucursales[a.sucursal]?.name || '';
                const nameB = sucursales[b.sucursal]?.name || '';
                return nameA.localeCompare(nameB);
            }
        },
        {
            title: 'Producto',
            dataIndex: 'product',
            key: 'product',
            render: (productId) => products[productId]?.name || `ID Desconocido (${productId})`,
            // order product by name
            sorter: (a, b) => {
                const nameA = products[a.product]?.name || '';
                const nameB = products[b.product]?.name || '';
                return nameA.localeCompare(nameB);
            }
        },
        {
            title: 'Cantidad Actual',
            dataIndex: 'amount',
            key: 'amount',
            render: (amount) => <strong>{amount}</strong>,
            // order products by amount
            sorter: (a, b) => a.amount - b.amount,
            // lower amounts are by default higher
            defaultSortOrder: 'ascend'
        },
        {
            title: 'Estado del Inventario',
            key: 'status',
            render: (_, record) => {
                const realProduct = products[record.product];
                const minStock = realProduct?.minimumStock || 0;
                const isLow = record.amount <= minStock;

                return isLow ? (
                    <Tag color="red">Stock Bajo (Mín: {minStock})</Tag>
                ) : (
                    <Tag color="green">Normal (Mín: {minStock})</Tag>
                );
            }
        }
    ];

    return (
        <div style={{ padding: '24px' }}>
            <Card>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <Title level={3} style={{ margin: 0 }}>Stock por Sucursal</Title>

                    <Space>
                        <Text strong>Ver solo Stocks Bajos:</Text>
                        <Switch
                            checked={showOnlyLowStock}
                            onChange={(checked) => setShowOnlyLowStock(checked)}
                            checkedChildren="Sí"
                            unCheckedChildren="No"
                        />
                    </Space>
                </div>

                <Table
                    dataSource={stocks}
                    columns={columns}
                    rowKey="id"
                    loading={loading}
                    pagination={{ pageSize: 10 }}
                />
            </Card>
        </div>
    );
};

export default StockPage;