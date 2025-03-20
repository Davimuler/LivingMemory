import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, CardMedia, Grid, IconButton, Typography, Divider, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import axios from 'axios';
import { useSelector } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';
import { useLang } from '../../../useLang';

function LinkedCreatedProfileCards(props) {
    const [cards, setCards] = useState([]);
    const email = useSelector((state) => state.auth.user.email);
    const navigate = useNavigate();
   // const { lang } = useParams(); // Получаем текущий язык из URL

    // Функция для получения данных с бекенда
    const fetchDrafts = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/drafts/email/${email}`);
            setCards(response.data.drafts);
        } catch (error) {
            console.error("Ошибка при получении данных:", error);
        }
    };
    const { lang, goTo } = useLang(); // Используем хук useLang

    // Выполняем запрос при монтировании компонента
    useEffect(() => {
        fetchDrafts();
    }, []);


    const handleEdit = (id) => {
        goTo(`editpage/${id}`);
    };

    const handleView = (id) => {
        goTo(`page/${id}`);
    };

    // Функция для обработки заказа QR-кода
    const handleOrderQRCode = (id, name) => {
        if (props.onOrderQRCode) {
            props.onOrderQRCode(id, name); // Передаем ID и имя карточки в родительский компонент
        }
    };

    return (
        <Grid container spacing={3}>
            {cards.map((card) => (
                <Grid item xs={12} sm={6} md={4} key={card._id}>
                    <Card
                        sx={{
                            boxShadow: 3,
                            borderRadius: 3,
                            cursor: 'pointer',
                            '&:hover': {
                                boxShadow: 6,
                            },
                        }}
                        onClick={() => handleView(card._id)} // Просто вызываем handleView при клике на карточку
                    >
                        <CardMedia component="img" height="200" image={card.mainPhoto} alt="Головне фото" />
                        <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                                {card.name}
                            </Typography>
                            <Typography variant="body1" sx={{ fontStyle: "italic", color: "gray", mt: 1 }}>
                                "{card.quote}"
                            </Typography>
                            <Typography variant="body2" sx={{ mt: 2, color: "text.secondary" }}>
                                {card.description}
                            </Typography>
                        </CardContent>
                        <Divider />
                        <Box sx={{ p: 2 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <IconButton
                                    onClick={(e) => {
                                        e.stopPropagation(); // Останавливаем всплытие
                                        handleEdit(card._id);
                                    }}
                                >
                                    <EditIcon />
                                </IconButton>
                                <Typography variant="body2" sx={{ color: card.paid ? 'green' : 'red', fontWeight: 'bold' }}>
                                    {card.paid ? 'Оплачено' : 'Не оплачено'}
                                </Typography>
                            </Box>
                            {!card.paid && (
                                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                                    <Button
                                        variant="contained"
                                        sx={{
                                            borderColor: '#CE8946',
                                            color: '#CE8946',
                                            backgroundColor: 'transparent',
                                            '&:hover': {
                                                backgroundColor: 'rgba(255, 215, 0, 0.1)',
                                                borderColor: '#FFD700',
                                            },
                                        }}
                                        onClick={(e) => {
                                            e.stopPropagation(); // Останавливаем всплытие
                                            console.log('Кнопка "Оплатити" нажата');
                                        }}
                                    >
                                        Оплатити
                                    </Button>
                                </Box>
                            )}
                            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                                <Button
                                    variant="contained"
                                    sx={{
                                        borderColor: '#CE8946',
                                        color: '#CE8946',
                                        backgroundColor: 'transparent',
                                        '&:hover': {
                                            backgroundColor: 'rgba(255, 215, 0, 0.1)',
                                            borderColor: '#FFD700',
                                        },
                                    }}
                                    onClick={(e) => {
                                        e.stopPropagation(); // Останавливаем всплытие
                                        handleOrderQRCode(card._id, card.name);
                                    }}
                                >
                                    Замовити QR-код табличку
                                </Button>
                            </Box>
                        </Box>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}

export default LinkedCreatedProfileCards;