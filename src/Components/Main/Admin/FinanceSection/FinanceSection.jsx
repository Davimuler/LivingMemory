import React, { useState } from 'react';
import {
    Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, Card, CardContent, Grid, Select, MenuItem, FormControl, InputLabel, Accordion,
    AccordionSummary, AccordionDetails
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Моковые данные для финансов
const mockFinanceData = {
    registrationEarnings: {
        total: 1500, // Загальний дохід від реєстрацій
        byMonth: [
            { month: '2023-10', amount: 1000 },
            { month: '2023-09', amount: 500 },
        ],
    },
    qrCodeEarnings: {
        total: 800, // Загальний дохід від генерації QR-кодів
        byMonth: [
            { month: '2023-10', amount: 500 },
            { month: '2023-09', amount: 300 },
        ],
    },
    agentPayments: {
        total: 1200, // Загальні витрати на виплати агентам
        byMonth: [
            { month: '2023-10', amount: 800 },
            { month: '2023-09', amount: 400 },
        ],
    },
    partnerPayments: {
        total: 900, // Загальні витрати на виплати партнерам
        byMonth: [
            { month: '2023-10', amount: 600 },
            { month: '2023-09', amount: 300 },
        ],
    },
    userPaymentHistory: [ // Історія платежів користувачів
        { id: 1, date: '2023-10-01', user: 'Користувач 1', amount: 100, type: 'Оплата' },
        { id: 2, date: '2023-10-05', user: 'Користувач 2', amount: 200, type: 'Оплата' },
        { id: 3, date: '2023-10-10', user: 'Користувач 3', amount: 150, type: 'Повернення' },
    ],
    partnerWithdrawals: [ // Виведення коштів партнерам
        { id: 1, date: '2023-10-02', partner: 'Партнер 1', amount: 300, status: 'Виконано' },
        { id: 2, date: '2023-10-07', partner: 'Партнер 2', amount: 250, status: 'В обробці' },
        { id: 3, date: '2023-10-12', partner: 'Партнер 3', amount: 400, status: 'Виконано' },
    ],
    agentWithdrawals: [ // Виведення коштів агентам
        { id: 1, date: '2023-10-03', agent: 'Агент 1', amount: 200, status: 'Виконано' },
        { id: 2, date: '2023-10-08', agent: 'Агент 2', amount: 150, status: 'В обробці' },
        { id: 3, date: '2023-10-13', agent: 'Агент 3', amount: 300, status: 'Виконано' },
    ],
};

// Компонент для відображення фінансової секції
const FinanceSection = () => {
    const [selectedMonth, setSelectedMonth] = useState('all');

    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
    };

    const getCurrentMonthData = (data) => {
        const currentMonth = new Date().toISOString().slice(0, 7); // Отримуємо поточний місяць у форматі YYYY-MM
        return data.byMonth.find(monthData => monthData.month === currentMonth)?.amount || 0;
    };

    const getSelectedMonthData = (data) => {
        if (selectedMonth === 'all') {
            return data.total;
        }
        return data.byMonth.find(monthData => monthData.month === selectedMonth)?.amount || 0;
    };

    return (
        <Box sx={{ p: 3, textAlign: 'left' }}>
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
                Фінанси
            </Typography>

            {/* Дохід від реєстрацій */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                Дохід від реєстрацій
                            </Typography>
                            <Typography variant="body1" sx={{ mt: 1 }}>
                                За цей місяць: ${getCurrentMonthData(mockFinanceData.registrationEarnings)}
                            </Typography>
                            <Typography variant="body1" sx={{ mt: 1 }}>
                                За весь час: ${mockFinanceData.registrationEarnings.total}
                            </Typography>
                            <FormControl fullWidth sx={{ mt: 2 }}>
                                <InputLabel>Оберіть місяць</InputLabel>
                                <Select value={selectedMonth} onChange={handleMonthChange}>
                                    <MenuItem value="all">Весь час</MenuItem>
                                    {mockFinanceData.registrationEarnings.byMonth.map((monthData) => (
                                        <MenuItem key={monthData.month} value={monthData.month}>
                                            {monthData.month}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <Typography variant="body1" sx={{ mt: 2 }}>
                                Обраний період: ${getSelectedMonthData(mockFinanceData.registrationEarnings)}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Дохід від генерації QR-кодів */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                Дохід від генерації QR-кодів
                            </Typography>
                            <Typography variant="body1" sx={{ mt: 1 }}>
                                За цей місяць: ${getCurrentMonthData(mockFinanceData.qrCodeEarnings)}
                            </Typography>
                            <Typography variant="body1" sx={{ mt: 1 }}>
                                За весь час: ${mockFinanceData.qrCodeEarnings.total}
                            </Typography>
                            <FormControl fullWidth sx={{ mt: 2 }}>
                                <InputLabel>Оберіть місяць</InputLabel>
                                <Select value={selectedMonth} onChange={handleMonthChange}>
                                    <MenuItem value="all">Весь час</MenuItem>
                                    {mockFinanceData.qrCodeEarnings.byMonth.map((monthData) => (
                                        <MenuItem key={monthData.month} value={monthData.month}>
                                            {monthData.month}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <Typography variant="body1" sx={{ mt: 2 }}>
                                Обраний період: ${getSelectedMonthData(mockFinanceData.qrCodeEarnings)}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Витрати на виплати агентам */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                Витрати на виплати агентам
                            </Typography>
                            <Typography variant="body1" sx={{ mt: 1 }}>
                                За цей місяць: ${getCurrentMonthData(mockFinanceData.agentPayments)}
                            </Typography>
                            <Typography variant="body1" sx={{ mt: 1 }}>
                                За весь час: ${mockFinanceData.agentPayments.total}
                            </Typography>
                            <FormControl fullWidth sx={{ mt: 2 }}>
                                <InputLabel>Оберіть місяць</InputLabel>
                                <Select value={selectedMonth} onChange={handleMonthChange}>
                                    <MenuItem value="all">Весь час</MenuItem>
                                    {mockFinanceData.agentPayments.byMonth.map((monthData) => (
                                        <MenuItem key={monthData.month} value={monthData.month}>
                                            {monthData.month}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <Typography variant="body1" sx={{ mt: 2 }}>
                                Обраний період: ${getSelectedMonthData(mockFinanceData.agentPayments)}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Витрати на виплати партнерам */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                Витрати на виплати партнерам
                            </Typography>
                            <Typography variant="body1" sx={{ mt: 1 }}>
                                За цей місяць: ${getCurrentMonthData(mockFinanceData.partnerPayments)}
                            </Typography>
                            <Typography variant="body1" sx={{ mt: 1 }}>
                                За весь час: ${mockFinanceData.partnerPayments.total}
                            </Typography>
                            <FormControl fullWidth sx={{ mt: 2 }}>
                                <InputLabel>Оберіть місяць</InputLabel>
                                <Select value={selectedMonth} onChange={handleMonthChange}>
                                    <MenuItem value="all">Весь час</MenuItem>
                                    {mockFinanceData.partnerPayments.byMonth.map((monthData) => (
                                        <MenuItem key={monthData.month} value={monthData.month}>
                                            {monthData.month}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <Typography variant="body1" sx={{ mt: 2 }}>
                                Обраний період: ${getSelectedMonthData(mockFinanceData.partnerPayments)}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Виведення коштів партнерам */}
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                        Виведення коштів партнерам
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <TableContainer component={Paper} sx={{ mb: 4 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Дата</TableCell>
                                    <TableCell>Партнер</TableCell>
                                    <TableCell>Сума</TableCell>
                                    <TableCell>Статус</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {mockFinanceData.partnerWithdrawals.map((withdrawal) => (
                                    <TableRow key={withdrawal.id}>
                                        <TableCell>{withdrawal.date}</TableCell>
                                        <TableCell>{withdrawal.partner}</TableCell>
                                        <TableCell>${withdrawal.amount}</TableCell>
                                        <TableCell>{withdrawal.status}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </AccordionDetails>
            </Accordion>

            {/* Виведення коштів агентам */}
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                        Виведення коштів агентам
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <TableContainer component={Paper} sx={{ mb: 4 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Дата</TableCell>
                                    <TableCell>Агент</TableCell>
                                    <TableCell>Сума</TableCell>
                                    <TableCell>Статус</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {mockFinanceData.agentWithdrawals.map((withdrawal) => (
                                    <TableRow key={withdrawal.id}>
                                        <TableCell>{withdrawal.date}</TableCell>
                                        <TableCell>{withdrawal.agent}</TableCell>
                                        <TableCell>${withdrawal.amount}</TableCell>
                                        <TableCell>{withdrawal.status}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
};

export default FinanceSection;