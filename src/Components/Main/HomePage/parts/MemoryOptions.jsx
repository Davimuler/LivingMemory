import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import DescriptionIcon from '@mui/icons-material/Description';
import { useLang } from "../../../useLang"; // Импортируем хук
import { translationsMemoryOptions } from './translationsMemoryOptions';
import {useLocation} from "react-router"; // Импортируем переводы

function MemoryOptions() {
    const { lang } = useLang(); // Используем хук для получения текущего языка

    // Выбираем нужный объект с переводами
    const location = useLocation();
    const pathParts = location.pathname.split("/");
    const currentLanguage = pathParts[1] === "eng" ? "eng" : "ua";
    const t = translationsMemoryOptions[currentLanguage];

    // Иконки для опций
    const icons = {
        video: <VideoLibraryIcon fontSize="large" sx={{ color: '#CE8946' }} />,
        photo: <PhotoLibraryIcon fontSize="large" sx={{ color: '#CE8946' }} />,
        text: <DescriptionIcon fontSize="large" sx={{ color: '#CE8946' }} />,
    };

    return (
        <Box sx={{ maxWidth: '1200px', margin: 'auto', p: 3, mt: 8, textAlign: 'center' }}>
            <Typography variant="h2" component="h2" sx={{ textTransform: 'uppercase', mb: 4, fontSize: '2.7rem' }}>
                {t.sectionTitle} {/* Используем перевод для заголовка */}
            </Typography>
            <Grid container spacing={4} justifyContent="center">
                {t.options.map((option, index) => (
                    <Grid item xs={12} sm={4} key={index}>
                        <Box sx={{ textAlign: 'center' }}>
                            {icons[option.icon]} {/* Используем иконку из объекта icons */}
                            <Typography variant="h5" sx={{ fontWeight: 'bold', mt: 2 }}>
                                {option.title} {/* Используем перевод для заголовка опции */}
                            </Typography>
                            <Typography variant="body1" sx={{ mt: 1 }}>
                                {option.description} {/* Используем перевод для описания опции */}
                            </Typography>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default MemoryOptions;