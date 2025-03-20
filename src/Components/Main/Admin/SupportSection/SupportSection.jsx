import React, { useState, useEffect } from 'react';
import {
    Box, Typography, List, ListItem, ListItemText, TextField, Button,
    Paper, Divider, Avatar, Grid, IconButton
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';

// Компонент для відображення чату підтримки
const SupportChat = () => {
    const [tickets, setTickets] = useState([]); // Список звернень
    const [selectedTicket, setSelectedTicket] = useState(null); // Обране звернення
    const [newMessage, setNewMessage] = useState(''); // Нове повідомлення

    // Отримання всіх звернень при завантаженні компонента
    useEffect(() => {
        fetchTickets();
    }, []);

    // Функція для отримання всіх звернень
    const fetchTickets = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/support/tickets');
            setTickets(response.data);
        } catch (error) {
            console.error('Помилка при отриманні звернень:', error);
        }
    };

    // Обробник вибору звернення
    const handleTicketSelect = async (ticket) => {
        try {
            // Запит на отримання конкретного звернення за userEmail
            const response = await axios.get('http://localhost:5000/api/support/tickets/gmail', {
                params: { userEmail: ticket.userEmail }, // Тут має бути точна відповідність
            });
            console.log(response.data);
             setSelectedTicket(response.data); // Встановлюємо обране звернення
        } catch (error) {
            console.error('Помилка при отриманні чату:', error);
        }
    };

    // Обробник відправлення повідомлення
    const handleSendMessage = async () => {
        if (newMessage.trim() === '') return;

        try {
            const response = await axios.post('http://localhost:5000/api/support/tickets/messages ', {
                userEmail: selectedTicket.userEmail,
                sender: 'support',
                text: newMessage,
            });

            setSelectedTicket(response.data); // Оновлюємо обране звернення
            setNewMessage(''); // Очищаємо поле введення
        } catch (error) {
            console.error('Помилка при відправленні повідомлення:', error);
        }
    };

    // Обробник закриття звернення
    const handleCloseTicket = async () => {
        try {
            await axios.post('http://localhost:5000/api/support/close', { userEmail: selectedTicket.userEmail });
            fetchTickets(); // Оновлюємо список звернень
            setSelectedTicket(null); // Очищаємо обране звернення
        } catch (error) {
            console.error('Помилка при закритті звернення:', error);
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
                Зворотній зв'язок і підтримка
            </Typography>

            <Grid container spacing={3}>
                {/* Список звернень */}
                <Grid item xs={12} md={4}>
                    <Paper elevation={3} sx={{ p: 2 }}>
                        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                            Список звернень
                        </Typography>
                        <List>
                            {tickets.map((ticket) => (
                                <ListItem
                                    button
                                    key={ticket._id}
                                    onClick={() => handleTicketSelect(ticket)}
                                    sx={{
                                        bgcolor: selectedTicket?._id === ticket._id ? '#e0e0e0' : 'inherit',
                                        borderRadius: 1,
                                        mb: 1,
                                    }}
                                >
                                    <Avatar sx={{ mr: 2 }}>{ticket.userEmail[0]}</Avatar>
                                    <ListItemText
                                        primary={ticket.userEmail}
                                        secondary={`Статус: ${ticket.status === 'open' ? 'Відкритий' : 'Закритий'}`}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                </Grid>

                {/* Чат з обраним зверненням */}
                <Grid item xs={12} md={8}>
                    <Paper elevation={3} sx={{ p: 2, height: '70vh', display: 'flex', flexDirection: 'column' }}>
                        {selectedTicket ? (
                            <>
                                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                                    Чат з {selectedTicket.userEmail}
                                </Typography>
                                <Box sx={{ flexGrow: 1, overflowY: 'auto', mb: 2 }}>
                                    {selectedTicket.messages.map((message) => (
                                        <Box
                                            key={message._id}
                                            sx={{
                                                display: 'flex',
                                                flexDirection: message.sender === 'support' ? 'row-reverse' : 'row',
                                                mb: 2,
                                            }}
                                        >
                                            <Avatar sx={{ mx: 2 }}>
                                                {message.sender === 'support' ? 'S' : selectedTicket.userEmail[0]}
                                            </Avatar>
                                            <Paper
                                                elevation={1}
                                                sx={{
                                                    p: 2,
                                                    bgcolor: message.sender === 'support' ? '#e3f2fd' : '#f5f5f5',
                                                    borderRadius: message.sender === 'support' ? '20px 20px 0 20px' : '20px 20px 20px 0',
                                                }}
                                            >
                                                <Typography variant="body1">{message.text}</Typography>
                                                <Typography variant="caption" sx={{ display: 'block', mt: 1, color: 'text.secondary' }}>
                                                    {new Date(message.timestamp).toLocaleString()}
                                                </Typography>
                                            </Paper>
                                        </Box>
                                    ))}
                                </Box>
                                <Divider sx={{ mb: 2 }} />
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        placeholder="Введіть повідомлення..."
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                    />
                                    <IconButton color="primary" onClick={handleSendMessage} sx={{ ml: 2 }}>
                                        <SendIcon />
                                    </IconButton>
                                </Box>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={handleCloseTicket}
                                    sx={{ mt: 2 }}
                                >
                                    Закрити звернення
                                </Button>
                            </>
                        ) : (
                            <Typography variant="h6" sx={{ textAlign: 'center', mt: 4 }}>
                                Виберіть звернення для перегляду чату
                            </Typography>
                        )}
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default SupportChat;