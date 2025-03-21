import React, { useState, useEffect } from 'react';
import { Box, IconButton, Typography, Paper, Collapse, TextField, List, ListItem, ListItemText } from '@mui/material';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import { useSelector } from 'react-redux';

const SupportWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]); // Повідомлення чату
    const [inputValue, setInputValue] = useState(''); // Текст введення
    const [userEmail, setUserEmail] = useState(''); // Пошта користувача
    const userR = useSelector((state) => state.auth.user); // Отримуємо користувача з Redux

    // Підвантажуємо пошту користувача при зміні userR
    useEffect(() => {
        if (userR?.email) {
            setUserEmail(userR.email);
        }
    }, [userR]);

    // Підвантажуємо історію чату при відкритті віджета або зміні пошти
    useEffect(() => {
        if (isOpen && userEmail) {
            loadChatHistory();
        }
    }, [isOpen, userEmail]);

    // Функція для завантаження історії чату
    const loadChatHistory = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/support/tickets/gmail`, {
                params: { userEmail }, // Передаємо пошту як параметр запиту
            });

            if (response.data && response.data.messages) {
                setMessages(response.data.messages); // Оновлюємо повідомлення
            }
        } catch (error) {
            console.error('Помилка при завантаженні історії чату:', error);
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: 'Помилка при завантаженні історії чату.', sender: 'support' },
            ]);
        }
    };

    const toggleWidget = () => {
        setIsOpen(!isOpen);
    };

    const handleSendMessage = async () => {
        if (inputValue.trim() && userEmail) {
            const newMessage = { text: inputValue, sender: 'user' };
            setMessages([...messages, newMessage]); // Додаємо повідомлення до локального стану
            setInputValue(''); // Очищаємо поле введення

            try {
                // Відправляємо повідомлення на бекенд
                const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/support/tickets`, {
                    userEmail,
                    message: inputValue,
                });

                if (response.data) {
                    setMessages((prevMessages) => [
                        ...prevMessages,
                        { text: 'Дякуємо за ваше повідомлення! Ми зв’яжемося з вами найближчим часом.', sender: 'support' },
                    ]);
                }
            } catch (error) {
                console.error('Помилка при відправці повідомлення:', error);
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { text: 'Помилка при відправці повідомлення. Спробуйте ще раз.', sender: 'support' },
                ]);
            }
        } else if (!userEmail) {
            // Якщо пошта користувача відсутня
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: 'Помилка: електронна пошта не знайдена. Увійдіть у систему.', sender: 'support' },
            ]);
        }
    };

    return (
        <Box
            sx={{
                position: 'fixed',
                bottom: 16,
                right: 16,
                zIndex: 1000,
            }}
        >
            <Collapse in={isOpen}>
                <Paper
                    sx={{
                        padding: 2,
                        width: 300,
                        borderRadius: 2,
                        boxShadow: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 400,
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: 2,
                        }}
                    >
                        <Typography variant="h6">Чат з підтримкою</Typography>
                        <IconButton onClick={toggleWidget} size="small">
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    {/* Вікно повідомлень */}
                    <Box
                        sx={{
                            flexGrow: 1,
                            overflowY: 'auto',
                            marginBottom: 2,
                            border: '1px solid #ddd',
                            borderRadius: 1,
                            padding: 1,
                        }}
                    >
                        <List>
                            {messages.map((message, index) => (
                                <ListItem
                                    key={index}
                                    sx={{
                                        justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                                    }}
                                >
                                    <ListItemText
                                        primary={message.text}
                                        sx={{
                                            backgroundColor: message.sender === 'user' ? '#e3f2fd' : '#f5f5f5',
                                            padding: 1,
                                            borderRadius: 1,
                                            maxWidth: '70%',
                                            wordWrap: 'break-word',
                                        }}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Box>

                    {/* Поле введення та іконка відправки */}
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Напишіть повідомлення..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    handleSendMessage();
                                }
                            }}
                        />
                        <IconButton
                            onClick={handleSendMessage}
                            sx={{ color: 'primary.main' }}
                            disabled={!inputValue.trim() || !userEmail} // Вимкнути, якщо поле порожнє або пошта відсутня
                        >
                            <SendIcon />
                        </IconButton>
                    </Box>
                </Paper>
            </Collapse>

            {!isOpen && (
                <IconButton
                    onClick={toggleWidget}
                    sx={{
                        position: 'fixed',
                        bottom: 16,
                        right: 0,
                        backgroundColor: 'primary.main',
                        color: 'white',
                        borderRadius: '50% 0 0 50%',
                        padding: 2,
                        boxShadow: 3,
                        transform: 'translateX(0)',
                        '&:hover': {
                            transform: 'translateX(-8px)',
                        },
                        transition: 'transform 0.2s ease-in-out',
                    }}
                >
                    <SupportAgentIcon />
                </IconButton>
            )}
        </Box>
    );
};

export default SupportWidget;