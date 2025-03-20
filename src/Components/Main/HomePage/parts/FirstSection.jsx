import React from 'react';
import { Box, Typography, Card, CardContent, Button, CardMedia, Grid, Divider } from '@mui/material';
import pageImage from '../../../../assets/new.webp';
import monumentPage from '../../../../assets/monumentPage.webp';
import qrGeneration from '../../../../assets/mon.webp';
import { useLang } from "../../../useLang"; // Импортируем хук

function FirstSection({ t }) { // Принимаем пропс t с переводами
    const { goTo } = useLang(); // Используем хук для получения функции goTo

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
            {/* Стих из Библии и место из Писания */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" component="h1" sx={{ color: '#CE8946', textAlign: 'left' }}>
                    {t.bibleVerse} {/* Используем перевод для стиха */}
                </Typography>
                <Typography variant="h5" component="h2" sx={{ color: '#CE8946', textAlign: 'left', mt: 1 }}>
                    {t.bibleReference} {/* Используем перевод для ссылки на стих */}
                </Typography>
            </Box>

            {/* Картки з послугами */}
            <Grid container spacing={4} justifyContent="center">
                {/* Перша картка: СТОРІНКИ ПАМ'ЯТІ */}
                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', p: 2 }}>
                        <CardMedia
                            component="img"
                            height="300"
                            image={pageImage}
                            alt={t.memoryPagesTitle} // Используем перевод для alt
                            sx={{ borderRadius: '4px', mb: 2 }}
                        />
                        <CardContent sx={{ flexGrow: 1 }}>
                            <Typography variant="h5" component="h2" sx={{ mb: 1, textTransform: 'uppercase', fontWeight: 'normal' }}>
                                {t.memoryPagesTitle} {/* Используем перевод для заголовка */}
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 0.5 }}>
                                {t.memoryPagesDescription} {/* Используем перевод для описания */}
                            </Typography>
                        </CardContent>
                        <Divider sx={{ my: 0.5, borderColor: 'transparent' }} />
                        <Button variant="outlined" sx={buttonStyle} onClick={() => goTo("/createpage")} fullWidth>
                            {t.createPageButton} {/* Используем перевод для текста кнопки */}
                        </Button>
                    </Card>
                </Grid>

                {/* Друга картка: QR-КОД ТАБЛИЦЯ НА ПАМ'ЯТНИКУ */}
                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', p: 2 }}>
                        <CardMedia
                            component="img"
                            height="300"
                            image={monumentPage}
                            alt={t.qrMonumentTitle} // Используем перевод для alt
                            sx={{ borderRadius: '4px', mb: 2 }}
                        />
                        <CardContent sx={{ flexGrow: 1 }}>
                            <Typography variant="h5" component="h2" sx={{ mb: 1, textTransform: 'uppercase' }}>
                                {t.qrMonumentTitle} {/* Используем перевод для заголовка */}
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 0.5 }}>
                                {t.qrMonumentDescription} {/* Используем перевод для описания */}
                            </Typography>
                        </CardContent>
                        <Divider sx={{ my: 0.5, borderColor: 'transparent' }} />
                        <Button variant="outlined" sx={buttonStyle} onClick={() => goTo("/dashboard/#profiles")} fullWidth>
                            {t.orderQrButton} {/* Используем перевод для текста кнопки */}
                        </Button>
                    </Card>
                </Grid>

                {/* Третя картка: QR-КОД ГЕНЕРАЦІЯ */}
                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', p: 2 }}>
                        <CardMedia
                            component="img"
                            height="300"
                            image={qrGeneration}
                            alt={t.monumentCatalogTitle} // Используем перевод для alt
                            sx={{ borderRadius: '4px', mb: 2 }}
                        />
                        <CardContent sx={{ flexGrow: 1 }}>
                            <Typography variant="h5" component="h2" sx={{ mb: 1, textTransform: 'uppercase' }}>
                                {t.monumentCatalogTitle} {/* Используем перевод для заголовка */}
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 0.5 }}>
                                {t.monumentCatalogDescription} {/* Используем перевод для описания */}
                            </Typography>
                        </CardContent>
                        <Divider sx={{ my: 0.5, borderColor: 'transparent' }} />
                        <Button variant="outlined" sx={buttonStyle} onClick={() => goTo("/monuments")} fullWidth>
                            {t.orderMonumentButton} {/* Используем перевод для текста кнопки */}
                        </Button>
                    </Card>
                </Grid>
            </Grid>
        </>
    );
}

export default FirstSection;