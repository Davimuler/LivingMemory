import React from 'react';
import { Box, Typography, Card, CardContent, Button, CardMedia, Grid, Divider } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import qrcode from "../../../../assets/qrcode.jpg";
import QrCodeIcon from '@mui/icons-material/QrCode';
import { useLang } from "../../../useLang";
import { translationsThirdSection } from './translationsThirdSection';
import {useLocation} from "react-router";

function ThirdSection() {
    const { lang } = useLang();
    const { goTo } = useLang();
    const location = useLocation();
    const pathParts = location.pathname.split("/");
    const currentLanguage = pathParts[1] === "eng" ? "eng" : "ua";
    const t = translationsThirdSection[currentLanguage];

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
        <Box sx={{ maxWidth: '1200px', margin: 'auto', p: 3, mt: 8 }}>
            <Grid container spacing={4} alignItems="center">
                {/* Заголовок та опис */}
                <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
                    <Typography variant="h2" component="h2" sx={{
                        textTransform: 'uppercase',
                        fontWeight: 'bold',
                        mb: 2,
                        fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' } // Адаптивный размер шрифта
                    }}>
                        {t.qrMonumentTitle}
                    </Typography>
                    <Typography variant="body1" sx={{
                        fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' }, // Адаптивный размер шрифта
                        lineHeight: 1.6
                    }}>
                        {t.qrMonumentDescription}
                    </Typography>
                </Grid>

                {/* Картка з фотографією та QR-кодом */}
                <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
                    <Card sx={{ p: 2 }}>
                        <CardMedia
                            component="img"
                            height={{ xs: 300, sm: 400, md: 500 }} // Адаптивная высота изображения
                            image={qrcode}
                            alt={t.qrMonumentAlt}
                            sx={{ borderRadius: '4px', mb: 2 }}
                        />
                        <Box sx={{ textAlign: 'center', mb: 2 }}>
                            <QrCodeIcon sx={{ fontSize: { xs: 40, sm: 50, md: 60 }, color: '#CE8946' }} />
                            <Typography variant="body1" sx={{ mt: 1 }}>
                                {t.qrMonumentIconText}
                            </Typography>
                        </Box>

                        {/* Кнопка Замовити табличку */}
                        <Box sx={{ textAlign: 'center' }}>
                            <Button
                                sx={buttonStyle}
                                variant="outlined"
                                onClick={() => goTo("/dashboard/#profiles")}
                            >
                                {t.orderPlaqueButton}
                            </Button>
                        </Box>
                    </Card>
                </Grid>
            </Grid>

            {/* Опис справа */}
            <Box sx={{ mt: 4, textAlign: 'right' }}>
                <Typography variant="body1" sx={{
                    color: 'rgba(0, 0, 0, 0.6)',
                    fontStyle: 'italic',
                    fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' } // Адаптивный размер шрифта
                }}>
                    {t.serviceDescription}
                </Typography>
            </Box>
        </Box>
    );
}

export default ThirdSection;