import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Paper, Divider, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { useLocation } from 'react-router-dom'; // Добавляем useLocation
import { langResources } from './UserMonumentsTexts'; // Импортируем языковые ресурсы

const UserMonuments = ({ userEmail }) => {
    const [monuments, setMonuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const location = useLocation(); // Хук для получения текущего пути
    const pathLang = location.pathname.split('/')[1]; // Извлекаем язык из URL (например, "/en/dashboard" -> "en")
    const language = langResources[pathLang] ? pathLang : 'en'; // Определяем язык по умолчанию
    const texts = langResources[language]; // Тексты для текущего языка

    // Функция для загрузки данных
    useEffect(() => {
        const fetchMonuments = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/monuments/creator/${userEmail}`);
                setMonuments(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchMonuments();
    }, [userEmail]);

    // Функция для удаления карточки
    const handleDeleteMonument = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/monuments/${id}`);
            // Обновляем состояние, удаляя карточку из списка
            setMonuments(monuments.filter(monument => monument._id !== id));
        } catch (err) {
            console.error('Помилка при видаленні пам\'ятника:', err);
        }
    };

    if (loading) {
        return <Typography>{texts.loadingMessage}</Typography>;
    }

    if (error) {
        return <Typography color="error">{texts.errorMessage} {error}</Typography>;
    }

    if (monuments.length === 0) {
        return <Typography>{texts.noMonumentsMessage}</Typography>;
    }

    return (
        <Box sx={{ mb: 6 }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4, textAlign: 'center' }}>
                {texts.myMonumentsTitle}
            </Typography>

            <Grid container spacing={4}>
                {monuments.map((monument, index) => (
                    <Grid item key={index} xs={12} sm={6} md={6} lg={4}>
                        <Paper elevation={3} sx={{ p: 3, textAlign: 'center', display: 'flex', flexDirection: 'column', position: 'relative' }}>
                            {/* Иконка удаления */}
                            <IconButton
                                sx={{ position: 'absolute', bottom: 8, right: 8 }}
                                onClick={() => handleDeleteMonument(monument._id)}
                            >
                                <DeleteIcon color="error" />
                            </IconButton>

                            <Box>
                                <Box
                                    component="img"
                                    src={monument.imgSrc || 'https://via.placeholder.com/300'}
                                    alt="Прев'ю пам'ятника"
                                    sx={{ width: '100%', height: 'auto', borderRadius: 2, mb: 2 }}
                                    onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/300';
                                    }}
                                />
                                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                                    {monument.title}
                                </Typography>
                                <Typography variant="body2" sx={{ mb: 2 }}>
                                    {monument.description}
                                </Typography>
                            </Box>
                            <Divider sx={{ mt: 'auto', mb: 2 }} />
                            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, textAlign: 'left' }}>
                                {monument.price}
                            </Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default UserMonuments;