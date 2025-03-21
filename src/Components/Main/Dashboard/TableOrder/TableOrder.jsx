import React, { useState, useEffect } from 'react';
import { Box, Button, Card, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { langResources } from './langResourcesTableOrder';

function TableOrder(props) {
    const [tabletSize, setTabletSize] = useState('10x15'); // Розмір таблички
    const [deliveryAddress, setDeliveryAddress] = useState(''); // Адреса доставки
    const [paymentMethod, setPaymentMethod] = useState('card'); // Спосіб оплати
    const [country, setCountry] = useState(''); // Країна
    const [city, setCity] = useState(''); // Місто
    const [isButtonDisabled, setIsButtonDisabled] = useState(true); // Стан кнопки

    const location = useLocation(); // Хук для получения текущего пути
    const pathLang = location.pathname.split('/')[1]; // Извлекаем язык из URL (например, "/en/dashboard" -> "en")
    const language = langResources[pathLang] ? pathLang : 'en'; // Определяем язык по умолчанию
    const texts = langResources[language]; // Тексты для текущего языка

    // Отримуємо назву сторінки з пропсів (selectedCard.name)
    const pageName = props.selectedCard?.name || '';

    // Перевіряємо, чи всі поля заповнені
    useEffect(() => {
        if (pageName && deliveryAddress && tabletSize && paymentMethod && country && city) {
            setIsButtonDisabled(false); // Кнопка активна
        } else {
            setIsButtonDisabled(true); // Кнопка неактивна
        }
    }, [pageName, deliveryAddress, tabletSize, paymentMethod, country, city]);

    const handleOrderQRTablet = async () => {
        if (pageName && deliveryAddress && tabletSize && paymentMethod && country && city) {
            try {
                const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/order/order`, { // Используем переменную окружения
                    pageName,
                    tabletSize,
                    deliveryAddress,
                    paymentMethod,
                    country,
                    city,
                    email: props.email,
                });
                props.setSnackbarMessage(texts.snackbarSuccess);
                props.setSnackbarSeverity("success");
                props.setSnackbarOpen(true);
            } catch (error) {
                props.setSnackbarMessage(texts.snackbarError);
                props.setSnackbarSeverity("error");
                props.setSnackbarOpen(true);
            }
        } else {
            props.setSnackbarMessage(texts.snackbarIncompleteFields);
            props.setSnackbarSeverity("error");
            props.setSnackbarOpen(true);
        }
    };

    return (
        <Card sx={{ p: 2, mb: 4, boxShadow: 3, borderRadius: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>{texts.orderTitle}</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                    fullWidth
                    label={texts.pageNameLabel}
                    value={pageName}
                    disabled // Поле тільки для відображення
                />
                <FormControl fullWidth>
                    <InputLabel>{texts.tabletSizeLabel}</InputLabel>
                    <Select
                        value={tabletSize}
                        label={texts.tabletSizeLabel}
                        onChange={(e) => setTabletSize(e.target.value)}
                    >
                        <MenuItem value="10x15">{texts.tabletSizeOptions.small}</MenuItem>
                        <MenuItem value="15x20">{texts.tabletSizeOptions.medium}</MenuItem>
                        <MenuItem value="20x30">{texts.tabletSizeOptions.large}</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    fullWidth
                    label={texts.countryLabel}
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                />
                <TextField
                    fullWidth
                    label={texts.cityLabel}
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <TextField
                    fullWidth
                    label={texts.deliveryAddressLabel}
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                />
                <FormControl fullWidth>
                    <InputLabel>{texts.paymentMethodLabel}</InputLabel>
                    <Select
                        value={paymentMethod}
                        label={texts.paymentMethodLabel}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                        <MenuItem value="card">{texts.paymentMethodOptions.card}</MenuItem>
                        <MenuItem value="paypal">{texts.paymentMethodOptions.paypal}</MenuItem>
                        <MenuItem value="googlepay">{texts.paymentMethodOptions.googlepay}</MenuItem>
                        <MenuItem value="applepay">{texts.paymentMethodOptions.applepay}</MenuItem>
                    </Select>
                </FormControl>
                <Button
                    variant="outlined"
                    sx={props.buttonStyle}
                    onClick={handleOrderQRTablet}
                    disabled={isButtonDisabled} // Кнопка неактивна, якщо не всі поля заповнені
                >
                    {texts.orderButton}
                </Button>
            </Box>
        </Card>
    );
}

export default TableOrder;