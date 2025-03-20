import React, { useState, useEffect } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography } from '@mui/material';
import axios from 'axios'; // Імпортуємо axios для HTTP-запитів

const QrOrdersSection = () => {
    const [orders, setOrders] = useState([]); // Стан для зберігання замовлень
    const [loading, setLoading] = useState(true); // Стан для відстеження завантаження даних
    const [error, setError] = useState(null); // Стан для відстеження помилок

    // Отримання даних з бекенду
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/order/orders'); // Виконуємо GET-запит до API
                setOrders(response.data.orders); // Оновлюємо стан з отриманими даними
                setLoading(false); // Вказуємо, що дані завантажено
            } catch (error) {
                setError('Помилка при отриманні замовлень'); // Встановлюємо повідомлення про помилку
                setLoading(false); // Вказуємо, що завантаження завершено (з помилкою)
                console.error('Помилка при отриманні замовлень:', error);
            }
        };

        fetchOrders(); // Викликаємо функцію для отримання даних
    }, []); // Порожній масив залежностей означає, що ефект виконається лише раз при монтажі компонента

    // Функція для оновлення статусу замовлення на "Виконано"
    const handleCompleteOrder = async (orderId) => {
        try {
            // Виконуємо PUT-запит для оновлення статусу замовлення
            const response = await axios.put(`http://localhost:5000/api/order/order/${orderId}/status`, { status: 'completed' });
            const updatedOrder = response.data.order;

            // Оновлюємо стан замовлень
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
                                    {order.customerName} ({order.pageName}) {/* Додаємо назву сторінки */}
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