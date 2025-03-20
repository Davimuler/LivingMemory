import React from 'react';
import { Box, Typography, Button, Paper, Divider, Grid } from '@mui/material';
import cemeteryImage from '../../../assets/Nway.webp'; // Убедись, что путь правильный

const AdditionalServices = ({ buttonStyle }) => {
    const services = [
        {
            title: "Виготовлення надгробій з граніту",
            description: "Ви можете замовити виготовлення пам'ятника на могилу, і наша компанія докладе всіх зусиль, щоб відповідати вашим очікуванням як за якістю, так і за зовнішнім виглядом готового виробу.",
            imgSrc: "https://mosnarod.com/img/pamyatniki/memorialnye-kompleksy.jpg"
        },
        {
            title: "Надгробна плита з граніту",
            description: "Розмір надгробної плити з граніту може бути різним. Все залежить від конкретного замовлення та ваших побажань. Вона може повністю закривати могилу або бути частиною клумби.",
            imgSrc: "https://mosnarod.com/img/pamyatniki/memorialnye-kompleksy.jpg"
        },
        {
            title: "Благоустрій могил",
            description: "Ми пропонуємо комплексний благоустрій під ключ могил на кладовищі з урахуванням будь-яких побажань та цін. Хочемо розповісти, чому саме наша компанія є найкращим вибором для цього.",
            imgSrc: "https://mosnarod.com/img/pamyatniki/memorialnye-kompleksy.jpg"
        },
        {
            title: "Укладка тротуарної плитки",
            description: "За проханням замовника розраховується вартість на укладку плитки на кладовищі, виходячи з встановленої ціни за квадратний метр поверхні.",
            imgSrc: "https://mosnarod.com/img/pamyatniki/memorialnye-kompleksy.jpg"
        },
        {
            title: "Заливка фундаменту на могилу",
            description: "Наші фахівці самі подбають про закупівлю якісних необхідних матеріалів для заливки фундаменту на кладовищі та привезуть їх.",
            imgSrc: "https://mosnarod.com/img/pamyatniki/memorialnye-kompleksy.jpg"
        },
        {
            title: "Установка столиків на кладовищі",
            description: "У нашій компанії ви можете замовити столики на кладовищі за доступною ціною. Ми не лише виготовимо, але й оформимо установку столиків.",
            imgSrc: "https://mosnarod.com/img/pamyatniki/memorialnye-kompleksy.jpg"
        },
        {
            title: "Купити квітник на могилу",
            description: "У нас ви зможете придбати квітники за оптимальною ціною. Ми прагнемо, щоб елементи надгробного декору були доступними для максимально широкої аудиторії.",
            imgSrc: "https://mosnarod.com/img/pamyatniki/memorialnye-kompleksy.jpg"
        },
        {
            title: "Демонтаж пам'ятників",
            description: "Наша компанія завжди готова допомогти вам з демонтажем пам'ятника на кладовищі. Наші фахівці проведуть всі роботи акуратно, не потурбувавши могил.",
            imgSrc: "https://mosnarod.com/img/pamyatniki/memorialnye-kompleksy.jpg"
        }
    ];

    return (
        <>
            <Grid container spacing={4} alignItems="center" sx={{ px: 4, mt: 6 }}>
                <Grid item xs={12} md={6}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
                        Додаткові послуги
                    </Typography>
                    <Typography variant="body1">
                        Ми пропонуємо широкий спектр послуг для догляду та благоустрою місць пам’яті. Виготовлення та встановлення пам’ятників, укладка плитки, демонтаж старих надгробків та багато іншого.
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box
                        component="img"
                        src={cemeteryImage}
                        alt="Cemetery"
                        sx={{
                            width: '100%',
                            height: '400px', // Уменьшаем высоту на 40%
                            borderRadius: 2,
                            objectFit: 'cover' // Чтобы изображение сохраняло пропорции
                        }}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={4} sx={{ px: 4, mt: 4 }}>
                {services.map((service, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <Paper elevation={3} sx={{ p: 3, textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <Box>
                                <Box
                                    component="img"
                                    src={service.imgSrc}
                                    alt={service.title}
                                    sx={{ width: '100%', height: 'auto', borderRadius: 2, mb: 2 }}
                                />
                                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                                    {service.title}
                                </Typography>
                                <Typography variant="body2" sx={{ mb: 2 }}>
                                    {service.description}
                                </Typography>
                            </Box>
                            <Divider sx={{ mt: 'auto', mb: 2 }} />
                            <Button variant="outlined" sx={buttonStyle} fullWidth>
                                ЗАМОВИТИ
                            </Button>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default AdditionalServices;