import React from 'react';
import { Box, Typography, Card, CardContent, Button, CardMedia, Grid, Divider } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh'; // Импортируем иконку обновления
import { useLang } from "../../../useLang"; // Импортируем хук
import { translations } from './TranslationsSecondSection';
import {useLocation} from "react-router"; // Импортируем переводы

function SecondSection() {
    const { lang } = useLang(); // Используем хук для получения текущего языка
    const { goTo } = useLang(); // Используем хук для получения функции goTo

    const location = useLocation();
    const pathParts = location.pathname.split("/");
    const currentLanguage = pathParts[1] === "eng" ? "eng" : "ua";
    const t = translations[currentLanguage];

    const buttonStyle = {
        borderColor: '#CE8946',
        color: '#CE8946',
        backgroundColor: 'transparent',
        fontSize: '1rem',
        fontWeight: 'bold',
        padding: '12px 16px',
        '&:hover': {
            backgroundColor: 'rgba(255, 215, 0, 0.1)',
            borderColor: '#FFD700',
        },
    };

    return (
        <>
            {/* Нова секція: Сторінки пам'яті */}
            <Box sx={{ mt: 8, mb: 6 }}>
                <Grid container spacing={4} alignItems="center">
                    <Grid item xs={12} md={6}>
                        <Typography variant="h2" component="h2" sx={{ textTransform: 'uppercase', fontWeight: 'normal' }}>
                            {t.memoryPagesTitle} {/* Используем перевод для заголовка */}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.6 }}>
                            {t.memoryPagesDescription} {/* Используем перевод для описания */}
                        </Typography>
                    </Grid>
                </Grid>
            </Box>

            {/* Великий бокс з кнопками та картками */}
            <Box sx={{ maxWidth: '1200px', margin: 'auto', p: 3 }}>
                {/* Кнопки зверху */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                    <Button
                        variant="outlined"
                        sx={buttonStyle}
                        startIcon={<RefreshIcon />}
                        onClick={() => goTo("/refresh")} // Пример обработки кнопки "Оновити"
                    >
                        {t.refreshButton} {/* Используем перевод для текста кнопки */}
                    </Button>
                    {/*<Button*/}
                    {/*    variant="outlined"*/}
                    {/*    sx={buttonStyle}*/}
                    {/*    onClick={() => goTo("/#about")} // Пример обработки кнопки "Про 'Жива пам'ять'"*/}
                    {/*>*/}
                    {/*    {t.aboutButton} /!* Используем перевод для текста кнопки *!/*/}
                    {/*</Button>*/}
                </Box>

                {/* Картки з людьми */}
                <Grid container spacing={4}>
                    {[1, 2, 3].map((item) => (
                        <Grid item xs={12} sm={6} md={4} key={item}>
                            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', p: 2 }}>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image="https://media.istockphoto.com/id/184612767/ru/%D1%84%D0%BE%D1%82%D0%BE/%D1%81%D0%B5%D1%80%D1%8C%D0%B5%D0%B7%D0%BD%D1%8B%D0%B5-%D0%B8%D1%81%D0%BF%D0%B0%D0%BD%D0%B5%D1%86-%D1%87%D0%B5%D0%BB%D0%BE%D0%B2%D0%B5%D0%BA-%D0%BE%D0%B1%D1%8B%D1%87%D0%BD%D1%8B%D0%B5-%D0%BB%D1%8E%D0%B4%D0%B8.jpg?s=1024x1024&w=is&k=20&c=evMjcSDGzfBgWHaL1NZ6FhsVFIYCx5x82WLK-X1Rrbg="
                                    alt={t.personPhotoAlt} // Используем перевод для alt
                                    sx={{ borderRadius: '4px', mb: 2 }}
                                />
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography variant="h6" component="h3" sx={{ mb: 1 }}>
                                        {t.personName} {/* Используем перевод для имени */}
                                    </Typography>
                                    <Typography variant="body2" sx={{ mb: 1 }}>
                                        {t.personYears} {/* Используем перевод для годов жизни */}
                                    </Typography>
                                    <Typography variant="body1" sx={{ mb: 2 }}>
                                        {t.personDescription} {/* Используем перевод для описания */}
                                    </Typography>
                                </CardContent>
                                <Divider sx={{ my: 1, borderColor: 'transparent' }} />
                                <Button
                                    variant="outlined"
                                    sx={buttonStyle}
                                    onClick={() => goTo(`/profile/${item}`)} // Пример обработки кнопки "Переглянути"
                                >
                                    {t.viewButton} {/* Используем перевод для текста кнопки */}
                                </Button>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </>
    );
}

export default SecondSection;