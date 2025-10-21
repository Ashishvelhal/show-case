import React, { useState, useEffect } from 'react';
import { Table, Tag, Button, Select, Modal, Typography, Space, Input, Alert, Spin } from 'antd';
import { DeleteOutlined, EyeOutlined, ReloadOutlined } from '@ant-design/icons';
import { buildApiUrl } from '../components/common/apiConfig';

const { Option } = Select;
const { Text } = Typography;

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [orders, selectedStatus]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch(buildApiUrl('/api/orders'));
      if (!response.ok) throw new Error('Failed to fetch orders');
      const data = await response.json();
      setOrders(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filterOrders = () => {
    if (selectedStatus === 'all') {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(orders.filter(order => order.status === selectedStatus));
    }
  };

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(orders.map(order =>
      order._id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const handleDeleteOrder = async (orderId) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        const response = await fetch(buildApiUrl(`/api/orders/${orderId}`), {
          method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete order');
        setOrders(orders.filter(order => order._id !== orderId));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setDetailOpen(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'orange';
      case 'processing': return 'blue';
      case 'shipped': return 'cyan';
      case 'delivered': return 'green';
      case 'cancelled': return 'red';
      default: return 'default';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const columns = [
    {
      title: 'Product Name',
      dataIndex: ['product', 'name'],
      key: 'productName',
      width: 200,
    },
    {
      title: 'Customer Name',
      dataIndex: ['customer', 'fullName'],
      key: 'customerName',
      width: 150,
    },
    {
      title: 'Phone',
      dataIndex: ['customer', 'primaryNumber'],
      key: 'phone',
      width: 150,
    },
    {
      title: 'Price',
      dataIndex: ['product', 'price'],
      key: 'price',
      render: (price) => `₹${price}`,
      width: 100,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: 'Pending', value: 'pending' },
        { text: 'Processing', value: 'processing' },
        { text: 'Shipped', value: 'shipped' },
        { text: 'Delivered', value: 'delivered' },
        { text: 'Cancelled', value: 'cancelled' },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status) => <Tag color={getStatusColor(status)}>{status.toUpperCase()}</Tag>,
      width: 120,
    },
    {
      title: 'Ordered Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => formatDate(date),
      width: 150,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<EyeOutlined />}
            size="small"
            onClick={() => handleViewDetails(record)}
          >
            View
          </Button>
          <Select
            value={record.status}
            style={{ width: 120 }}
            onChange={(value) => handleStatusChange(record._id, value)}
            size="small"
          >
            <Option value="pending">Pending</Option>
            <Option value="processing">Processing</Option>
            <Option value="shipped">Shipped</Option>
            <Option value="delivered">Delivered</Option>
            <Option value="cancelled">Cancelled</Option>
          </Select>
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            size="small"
            onClick={() => handleDeleteOrder(record._id)}
          >
            Delete
          </Button>
        </Space>
      ),
      width: 250,
    },
  ];

  if (loading) return <Spin size="large" />;
  if (error) return <Alert message={error} type="error" />;

  return (
    <>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '16px', alignItems: 'center' }}>
      </div>

      <Table
        columns={columns}
        dataSource={filteredOrders}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
        locale={{ emptyText: 'No orders found' }}
      />

      {/* Order Details Modal */}
      <Modal
        title="Order Details"
        open={detailOpen}
        onCancel={() => setDetailOpen(false)}
        footer={null}
        width={800}
      >
        {selectedOrder && (
          <div>
            <Typography.Title level={5}>Product Information</Typography.Title>
            <Text>Name: {selectedOrder.product.name}</Text><br />
            <Text>Price: ₹{selectedOrder.product.price}</Text><br />
            {selectedOrder.product.image && <Text>Image: {selectedOrder.product.image}</Text>}

            <Typography.Title level={5} style={{ marginTop: '20px' }}>Customer Information</Typography.Title>
            <Text>Full Name: {selectedOrder.customer.fullName}</Text><br />
            <Text>Primary Number: {selectedOrder.customer.primaryNumber}</Text><br />
            {selectedOrder.customer.secondaryNumber && <Text>Secondary Number: {selectedOrder.customer.secondaryNumber}</Text>}<br />
            <Text>Address: {selectedOrder.customer.address}</Text><br />
            <Text>Landmark: {selectedOrder.customer.landmark}</Text><br />
            <Text>City: {selectedOrder.customer.city}</Text><br />
            <Text>State: {selectedOrder.customer.state}</Text><br />
            <Text>Pincode: {selectedOrder.customer.pincode}</Text>

            <Typography.Title level={5} style={{ marginTop: '20px' }}>Order Information</Typography.Title>
            <Text>Order Date: {formatDate(selectedOrder.createdAt)}</Text><br />
            <Text>Status: {selectedOrder.status}</Text>
          </div>
        )}
      </Modal>
    </>
  );
};

export default Orders;
