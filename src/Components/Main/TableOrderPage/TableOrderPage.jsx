import React, { useState } from 'react';
import { Snackbar, Alert, Container, Typography, Box, Grid, Card, CardMedia, IconButton } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material'; // Импорт иконок стрелок
import TableOrder from '../Dashboard/TableOrder/TableOrder';
import ex from '../../../assets/gg.jpg'
import ox from '../../../assets/ggg.jpg'
import gg from  '../../../assets/gggg.jpg'

function OrderPage() {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    // Состояние для управления текущим индексом фотографии в карусели
    const [currentIndex, setCurrentIndex] = useState(0);

    // Пример массива фотографий для карусели
    const gallery = [
        ex,
        ox,
        gg,
    ];

    // Функция для перехода к предыдущей фотографии
    const prevPhoto = () => {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
    };

    // Функция для перехода к следующей фотографии
    const nextPhoto = () => {
        setCurrentIndex((prev) => (prev < gallery.length - 2 ? prev + 1 : prev));
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    // Функция для извлечения ID видео из YouTube URL
    const getYouTubeVideoId = (url) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    // Пример URL видео из YouTube
    const youtubeVideoUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}> {/* Увеличили maxWidth до "md" */}
            <Typography variant="h4" gutterBottom>Додайте QR-код до пам'ятника, щоб зберігати історію та спогади</Typography>
            <TableOrder
                setSnackbarOpen={setSnackbarOpen}
                setSnackbarMessage={setSnackbarMessage}
                setSnackbarSeverity={setSnackbarSeverity}
            />

            {/* Секция с каруселью фотографий */}
            <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>Приклади табличок</Typography>
            <Box sx={{ mt: 4, position: 'relative' }}>
                <Grid container spacing={2} justifyContent="center">
                    {gallery.slice(currentIndex, currentIndex + 2).map((photo, index) => (
                        <Grid item key={index} xs={6}>
                            <Card sx={{ boxShadow: 2, borderRadius: 2 }}>
                                <CardMedia
                                    component="img"
                                    height="400"
                                    image={photo}
                                    alt={`Фото ${index}`}
                                    sx={{ objectFit: 'cover' }} /* Добавили object-fit */
                                />
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {/* Кнопка для перехода к предыдущей фотографии */}
                <IconButton
                    onClick={prevPhoto}
                    disabled={currentIndex === 0}
                    sx={{
                        position: 'absolute',
                        left: -40,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        color: 'white',
                        '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        },
                    }}
                >
                    <ArrowBack />
                </IconButton>

                {/* Кнопка для перехода к следующей фотографии */}
                <IconButton
                    onClick={nextPhoto}
                    disabled={currentIndex >= gallery.length - 2}
                    sx={{
                        position: 'absolute',
                        right: -40,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        color: 'white',
                        '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        },
                    }}
                >
                    <ArrowForward />
                </IconButton>
            </Box>

            {/* Секция с видео из YouTube */}
            <Box sx={{ mt: 4, mb: 4 }}>
                <Typography variant="h5" gutterBottom>Як це буде виглядати у вас</Typography>
                {getYouTubeVideoId(youtubeVideoUrl) ? (
                    <iframe
                        width="100%"
                        height="500"
                        src={`https://www.youtube.com/embed/${getYouTubeVideoId(youtubeVideoUrl)}`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                ) : (
                    <Typography variant="body2" color="error">
                        Невірне посилання на YouTube. Будь ласка, введіть коректну URL-адресу.
                    </Typography>
                )}
            </Box>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
}

export default OrderPage;