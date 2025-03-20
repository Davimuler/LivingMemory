import React from 'react';
import { Box, Typography, Grid, CardMedia, Button } from '@mui/material';
import partnerImage from '../../../../assets/partner.webp';
import { useLang } from "../../../useLang"; // Импортируем хук
import { translationsPartnerSection } from './translationsPartnerSection';
import {useLocation} from "react-router"; // Импортируем переводы

function PartnerSection({ buttonStyle }) {
    const { lang } = useLang(); // Используем хук для получения текущего языка
    const { goTo } = useLang(); // Используем хук для получения функции goTo

    const location = useLocation();
    const pathParts = location.pathname.split("/");
    const currentLanguage = pathParts[1] === "eng" ? "eng" : "ua";
    const t = translationsPartnerSection[currentLanguage];

    // Функція для обробки натискання на кнопку
    const handlePartnerClick = () => {
        goTo("/dashboard"); // Перехід на сторінку dashboard з урахуванням мови
    };

    return (
        <Box sx={{ maxWidth: '1200px', margin: 'auto', p: 3, mt: 8 }}>
            <Grid container spacing={4} alignItems="center">
                {/* Текст зліва */}
                <Grid item xs={12} md={6}>
                    <Typography variant="h2" component="h2" sx={{ textTransform: 'uppercase', fontWeight: 'bold', mb: 2 }}>
                        {t.sectionTitle} {/* Используем перевод для заголовка */}
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.6, mb: 2 }}>
                        {t.description1} {/* Используем перевод для первого описания */}
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.6, mb: 4 }}>
                        {t.description2} {/* Используем перевод для второго описания */}
                    </Typography>

                    {/* Кнопка "Стати партнером" */}
                    <Button
                        variant="outlined"
                        sx={buttonStyle} // Використовуємо стилі з пропсів
                        onClick={handlePartnerClick} // Додаємо обробник події
                    >
                        {t.partnerButton} {/* Используем перевод для текста кнопки */}
                    </Button>
                </Grid>

                {/* Картинка справа */}
                <Grid item xs={12} md={6}>
                    <CardMedia
                        component="img"
                        image={partnerImage}
                        alt={t.partnerImageAlt}
                        sx={{ borderRadius: '4px', width: '100%', height: 'auto' }}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}

export default PartnerSection;