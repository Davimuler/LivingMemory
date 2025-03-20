import React, {useState} from 'react';
import {Box, Button, Card, TextField, Typography} from "@mui/material";



function AccountSettings(props) {



    const [openPasswordForm, setOpenPasswordForm] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleChangePassword = () => {
        // Заглушка для запиту на зміну пароля
        if (oldPassword === "correctPassword") {
            // Замініть на реальну перевірку з бекенду
            props.setSnackbarMessage("Пароль успішно змінено");
            props.setSnackbarSeverity("success");
            props.setSnackbarOpen(true);
            setOpenPasswordForm(false);
        } else {
            props.setSnackbarMessage("Старий пароль введено невірно");
            props.setSnackbarSeverity("error");
            props.setSnackbarOpen(true);
        }
    };

    return (
        <Card sx={{ p: 2, mt: 4, mb: 4, boxShadow: 3, borderRadius: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h6">Налаштування акаунта</Typography>
            {openPasswordForm ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                        label="Старий пароль"
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                    />
                    <TextField
                        label="Новий пароль"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <Button
                        sx={{
                            backgroundColor: '#1E90FF',
                            color: '#fff',
                            borderRadius: '10px',
                            whiteSpace: 'nowrap',
                            '&:hover': {
                                backgroundColor: '#00BFFF',
                            },
                        }}
                        onClick={handleChangePassword}
                    >
                        Підтвердити зміну пароля
                    </Button>
                </Box>
            ) : (
                <Button
                    sx={{
                        backgroundColor: '#1E90FF',
                        color: '#fff',
                        borderRadius: '10px',
                        whiteSpace: 'nowrap',
                        '&:hover': {
                            backgroundColor: '#00BFFF',
                        },
                    }}
                    onClick={() => setOpenPasswordForm(true)}
                >
                    Змінити пароль
                </Button>
            )}
            <Button variant="contained" color="error">
                Видалити акаунт
            </Button>
        </Card>
    );
}

export default AccountSettings;