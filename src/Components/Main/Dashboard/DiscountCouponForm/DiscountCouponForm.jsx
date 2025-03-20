import React, { useState } from 'react';
import { Box, Button, Card, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom'; // Добавляем useLocation
import { langResources } from './langResourcesDiscountForm'; // Импортируем языковые ресурсы
import { setReferralCount, setDiscountStatus, setReferralCode } from '../../../../redux/authSlice';

function DiscountCouponForm(props) {
    const [discountCode, setDiscountCode] = useState('');
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const location = useLocation(); // Хук для получения текущего пути
    const pathLang = location.pathname.split('/')[1]; // Извлекаем язык из URL (например, "/en/dashboard" -> "en")
    const language = langResources[pathLang] ? pathLang : 'en'; // Определяем язык по умолчанию
    const texts = langResources[language]; // Тексты для текущего языка

    const handleApplyDiscount = async () => {
        if (!discountCode) {
            props.setSnackbarMessage(texts.snackbarInvalidCode);
            props.setSnackbarSeverity("error");
            props.setSnackbarOpen(true);
            return;
        }

        try {
            // Отправляем запрос на сервер для инкремента referralCount
            const referralResponse = await axios.post('http://localhost:5000/api/auth/incrementReferral', {
                referralCode: discountCode, // Используем введенный код купона
            });
            const discountResponse = await axios.put('http://localhost:5000/api/auth/updateDiscountStatus', {
                userId: props.id, // Используем ID текущего пользователя
                isDiscount: true, // Устанавливаем isDiscount в true
            });

            dispatch(setDiscountStatus(true));

            // Если запрос успешен, обновляем состояние referralCount
            if (referralResponse.data.success) {
                const newReferralCount = user.referralCount + 1; // Инкрементируем referralCount
                dispatch(setReferralCount(newReferralCount)); // Обновляем состояние в Redux

                if (discountResponse.data.success) {
                    props.setSnackbarMessage(texts.snackbarSuccess);
                    props.setSnackbarSeverity("success");
                    props.setSnackbarOpen(true);
                } else {
                    props.setSnackbarMessage(texts.snackbarDiscountUpdateError);
                    props.setSnackbarSeverity("error");
                    props.setSnackbarOpen(true);
                }
            } else {
                props.setSnackbarMessage(referralResponse.data.message || texts.snackbarError);
                props.setSnackbarSeverity("error");
                props.setSnackbarOpen(true);
            }
        } catch (error) {
            console.error("Помилка при застосуванні купона:", error);
            props.setSnackbarMessage(texts.snackbarError);
            props.setSnackbarSeverity("error");
            props.setSnackbarOpen(true);
        }
    };

    return (
        <Card sx={{ p: 2, mb: 4, boxShadow: 3, borderRadius: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
                {texts.discountCouponTitle}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                    fullWidth
                    label={texts.discountCouponLabel}
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                />
                <Button
                    variant="outlined"
                    sx={props.buttonStyle}
                    onClick={handleApplyDiscount}
                >
                    {texts.applyButton}
                </Button>
            </Box>
        </Card>
    );
}

export default DiscountCouponForm;