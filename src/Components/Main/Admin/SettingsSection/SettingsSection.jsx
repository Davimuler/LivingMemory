import React, { useState, useEffect } from 'react';
import {
    Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, TextField, Button, Grid, IconButton, Snackbar, Alert
} from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import axios from 'axios';

const SiteSettings = () => {
    const [rates, setRates] = useState({
        exclusivePartner: 20,
        clientDiscount: 5,
        manufacturerRates: [
            { clients: 10, percent: 10 },
            { clients: 20, percent: 15 },
            { clients: 30, percent: 20 },
            { clients: 31, percent: 25 },
        ],
        siteOwner: 50,
    });

    // Состояние для Snackbar
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // 'success', 'error', 'info', 'warning'

    // Загрузка данных с сервера при монтировании компонента
    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/settings`); // Используем переменную окружения
                setRates(response.data); // Устанавливаем данные в состояние
            } catch (error) {
                console.error('Помилка завантаження налаштувань:', error);
                showSnackbar('Помилка завантаження налаштувань', 'error');
            }
        };
        fetchSettings();
    }, []);

    // Обработчик изменения значений для полей exclusivePartner, clientDiscount, siteOwner
    const handleRateChange = (field, value) => {
        setRates((prevRates) => ({
            ...prevRates,
            [field]: Math.min(100, Math.max(0, prevRates[field] + value)),
        }));
    };

    // Обработчик изменения значений для manufacturerRates
    const handleManufacturerRateChange = (index, field, value) => {
        const updatedRates = [...rates.manufacturerRates];
        updatedRates[index][field] = value;
        setRates({ ...rates, manufacturerRates: updatedRates });
    };

    // Обработчик сохранения изменений
    const handleSave = async () => {
        try {
            const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/settings`, rates); // Используем переменную окружения
            console.log('Збережені налаштування:', response.data);
            showSnackbar('Налаштування успішно збережено!', 'success');
        } catch (error) {
            console.error('Помилка збереження налаштувань:', error);
            showSnackbar('Помилка збереження налаштувань. Спробуйте ще раз.', 'error');
        }
    };

    // Функция для отображения Snackbar
    const showSnackbar = (message, severity) => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(true);
    };

    // Закрытие Snackbar
    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
                Налаштування сайту
            </Typography>

            {/* Поля для exclusivePartner, clientDiscount, siteOwner */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                {[
                    { label: 'Ексклюзивний партнер', field: 'exclusivePartner' },
                    { label: 'Знижка для клієнтів', field: 'clientDiscount' },
                    { label: 'Власник сайту', field: 'siteOwner' },
                ].map(({ label, field }) => (
                    <Grid item xs={12} md={4} key={field}>
                        <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
                            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                                {label}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <IconButton onClick={() => handleRateChange(field, -1)}>
                                    <Remove />
                                </IconButton>
                                <TextField
                                    value={rates[field]}
                                    variant="outlined"
                                    sx={{ mx: 2, width: 80, textAlign: 'center' }}
                                    inputProps={{ readOnly: true }}
                                />
                                <IconButton onClick={() => handleRateChange(field, 1)}>
                                    <Add />
                                </IconButton>
                            </Box>
                        </Paper>
                    </Grid>
                ))}
            </Grid>

            {/* Таблица для manufacturerRates */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12}>
                    <Paper elevation={3} sx={{ p: 2 }}>
                        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                            Відсотки для виробників пам’ятників
                        </Typography>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Кількість клієнтів</TableCell>
                                        <TableCell>Відсоток</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rates.manufacturerRates.map((rate, index) => (
                                        <TableRow key={index}>
                                            <TableCell>
                                                <TextField
                                                    type="number"
                                                    value={rate.clients}
                                                    onChange={(e) => handleManufacturerRateChange(index, 'clients', e.target.value)}
                                                    label="Клієнти"
                                                    fullWidth
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    type="number"
                                                    value={rate.percent}
                                                    onChange={(e) => handleManufacturerRateChange(index, 'percent', e.target.value)}
                                                    label="Відсоток"
                                                    fullWidth
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>
            </Grid>

            {/* Кнопка сохранения */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                <Button variant="contained" color="primary" onClick={handleSave}>
                    Зберегти зміни
                </Button>
            </Box>

            {/* Snackbar для уведомлений */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000} // Автоматическое закрытие через 6 секунд
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }} // Позиция Snackbar
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity={snackbarSeverity}
                    sx={{ width: '100%' }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default SiteSettings;