import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardMedia, CardContent, Button, Container, Snackbar, Alert } from '@mui/material';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import QrCode2Icon from '@mui/icons-material/QrCode2'; // Иконка для QR-кода
import Page from "../Main/Page/Page";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import imgg from "../../assets/imgf.png";
import { useLang } from "../useLang"; // Импортируем хук

const PostView = () => {
    const [openSnackbar, setOpenSnackbar] = useState(true); // Состояние для отображения Snackbar
    const { goTo } = useLang(); // Используем хук для получения функции goTo

    // Закрытие Snackbar
    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    // Автоматическое закрытие Snackbar через 10 секунд
    useEffect(() => {
        if (openSnackbar) {
            const timer = setTimeout(() => {
                setOpenSnackbar(false);
            }, 10000); // 10 секунд
            return () => clearTimeout(timer);
        }
    }, [openSnackbar]);

    const buttonStyle = {
        borderColor: '#FFD700',
        color: '#FFCC00',
        backgroundColor: 'transparent',
        fontSize: '1rem',
        fontWeight: 'bold',
        padding: '12px 16px',
        '&:hover': {
            backgroundColor: 'rgba(255, 215, 0, 0.1)',
            borderColor: '#FFD700',
        },
    };

    // Данные для карточек услуг
    const services = [
        { id: 5, image: 'https://mosnarod.com/img/pamyatniki/izgotovlenie-nadgrobij-iz-granita.jpg', description: 'Виготовлення надгробій з граніту' },
        { id: 6, image: 'https://mosnarod.com/img/pamyatniki/blagoustrojstvo-mogil-na-kladbishche-ceny.jpg', description: 'Благоустрій могил' },
        { id: 7, image: 'https://mosnarod.com/img/pamyatniki/ukladka-trotuarnoj-plitki-na-kladbishche.jpg', description: 'Укладка тротуарної плитки' },
        { id: 8, image: 'https://mosnarod.com/img/blagoustrojstvo/zalit-styazhku-na-kladbishche.jpg', description: 'Заливка фундаменту на могилу' },
        { id: 9, image: 'https://mosnarod.com/img/blagoustrojstvo/ustanovka-stolikov.jpg', description: 'Установка столиків на кладовищі' },
    ];

    // Настройки для карусели
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    // Кастомные стрелки для карусели
    function SampleNextArrow(props) {
        const { onClick } = props;
        return (
            <Button
                onClick={onClick}
                sx={{
                    position: 'absolute',
                    right: -40,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 1,
                    minWidth: 'auto',
                }}
            >
                <ArrowForwardIosIcon />
            </Button>
        );
    }

    function SamplePrevArrow(props) {
        const { onClick } = props;
        return (
            <Button
                onClick={onClick}
                sx={{
                    position: 'absolute',
                    left: -40,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 1,
                    minWidth: 'auto',
                }}
            >
                <ArrowBackIosIcon />
            </Button>
        );
    }

    return (
        <Box sx={{ padding: 3 }}>
            {/* Snackbar для отображения сообщения об успешном создании профиля */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={10000} // Автоматическое закрытие через 10 секунд
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Позиция Snackbar
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity="success"
                    sx={{ width: '100%' }}
                    icon={<CheckCircleIcon fontSize="large" />} // Иконка успеха
                >
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        Ваш профіль успішно створено!
                    </Typography>
                    <Typography variant="body1">
                        Тепер ви можете переглянути його.
                    </Typography>
                </Alert>
            </Snackbar>

            {/* Компонент страницы профиля */}
            <Page />
            <Box sx={{ width: '100%', height: '1px', backgroundColor: 'rgba(0, 0, 0, 0.1)', my: 2 }} />

            {/* Блок для заказа таблички с QR-кодом */}
            <Container sx={{ mt: 6, textAlign: 'center' }}>
                <Box
                    sx={{
                        backgroundColor: 'background.paper',
                        padding: 4,
                        borderRadius: 2,
                        boxShadow: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 2,
                    }}
                >
                    <QrCode2Icon sx={{ fontSize: 60, color: '#FFCC00' }} />
                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                        Також ви можете замовити QR-код табличку для вашого пам'ятнику
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                        Додайте QR-код до пам'ятника, щоб зберігати історію та спогади.
                    </Typography>

                    {/* Пример фотографии таблички */}
                    <Card sx={{ maxWidth: 400, margin: '20px auto' }}>
                        <CardMedia
                            component="img"
                            height="200"
                            image={imgg}
                            sx={{ borderRadius: 1 }}
                        />
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                Приклад таблички з QR-кодом
                            </Typography>
                        </CardContent>
                    </Card>

                    <Button
                        variant="outlined"
                        fullWidth
                        sx={buttonStyle}
                        onClick={() => goTo("/order-qr")} // Используем goTo для навигации
                    >
                        Замовити табличку
                    </Button>
                </Box>

                {/* Надпись перед каруселью */}
                <Typography variant="h6" sx={{ textAlign: 'center', mb: 3, fontWeight: 'bold' }}>
                    Можливо вас цікавить:
                </Typography>
                <Box sx={{ maxWidth: 1200, margin: '0 auto' }}>
                    <Slider {...settings}>
                        {services.map((service) => (
                            <Box key={service.id} sx={{ padding: 1 }} >
                                <Card onClick={() => goTo("/monuments")} sx={{ cursor: 'pointer', maxWidth: 300, height: 300, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', margin: '0 auto' }}>
                                    <CardMedia component="img" height="180" image={service.image} alt={service.description} />
                                    <CardContent sx={{ height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Typography gutterBottom variant="h6" component="div" sx={{ fontSize: '1rem', textAlign: 'center' }}>{service.description}</Typography>
                                    </CardContent>
                                </Card>
                            </Box>
                        ))}
                    </Slider>
                </Box>
            </Container>
        </Box>
    );
};

export default PostView;