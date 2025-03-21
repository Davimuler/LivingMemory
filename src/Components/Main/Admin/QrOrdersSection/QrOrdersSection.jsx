import React, { useState, useEffect } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography } from '@mui/material';
import axios from 'axios';

const QrOrdersSection = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Отримання даних з бекенду
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/order/orders`); // Використовуємо змінну оточення
                setOrders(response.data.orders);
                setLoading(false);
            } catch (error) {
                setError('Помилка при отриманні замовлень');
                setLoading(false);
                console.error('Помилка при отриманні замовлень:', error);
            }
        };

        fetchOrders();
    }, []);

    // Функція для оновлення статусу замовлення на "Виконано"
    const handleCompleteOrder = async (orderId) => {
        try {
            const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/order/order/${orderId}/status`, { status: 'completed' }); // Використовуємо змінну оточення
            const updatedOrder = response.data.order;

            setOrders(orders.map(order =>
                order._id === updatedOrder._id ? updatedOrder : order
            ));
        } catch (error) {
            console.error('Помилка при оновленні статусу замовлення:', error);
        }
    };

    // Відображення стану завантаження
    if (loading) {
        return <Typography>Завантаження даних...</Typography>;
    }

    // Відображення помилки
    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    return (
        <Box sx={{ mt: 3 }}>
            <Typography variant="h5" gutterBottom>
                Замовлення QR-табличок
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID замовлення</TableCell>
                            <TableCell>Ім'я замовника (Назва сторінки)</TableCell>
                            <TableCell>Дата замовлення</TableCell>
                            <TableCell>Статус</TableCell>
                            <TableCell>Дії</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order._id}>
                                <TableCell>{order._id}</TableCell>
                                <TableCell>
                                    {order.customerName} ({order.pageName})
                                </TableCell>
                                <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                                <TableCell>{order.status === 'completed' ? 'Виконано' : 'В обробці'}</TableCell>
                                <TableCell>
                                    {order.status !== 'completed' && (
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => handleCompleteOrder(order._id)}
                                        >
                                            Виконано
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default QrOrdersSection;