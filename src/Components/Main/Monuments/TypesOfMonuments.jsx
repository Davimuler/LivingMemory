import React from 'react';
import { Box, Typography, Button, Paper, Divider } from '@mui/material';

const TypesOfMonuments = ({ scrollToSection ,buttonStyle }) => {
    const types = [
        {
            title: "Горизонтальні пам'ятники",
            description: "На горизонтальні пам'ятники поміщається більше тексту та художнього оформлення. Вони зарекомендували себе як сімейні надгробки.",
            imgSrc: "https://mosnarod.com/img/pamyatniki/memorialnye-kompleksy.jpg"
        },
        {
            title: "Вертикальні пам'ятники",
            description: "Комбіновані одинарні пам'ятники — це гарний варіант, щоб вшанувати пам'ять близької людини. У виробництві використовується кілька матеріалів одночасно.",
            imgSrc: "https://mosnarod.com/img/pamyatniki/memorialnye-kompleksy.jpg"
        },
        {
            title: "Дитячі пам'ятники",
            description: "Наші майстри вислухають побажання родини щодо виготовлення дитячого пам'ятника, запропонуючи варіанти, техніки та стилі оформлення.",
            imgSrc: "https://mosnarod.com/img/pamyatniki/memorialnye-kompleksy.jpg"
        }
    ];

    return (
        <>
            <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'center' }}>
                {types.map((type, index) => (
                    <Paper key={index} elevation={3} sx={{ p: 3, flex: 1, textAlign: 'center', maxWidth: '300px', display: 'flex', flexDirection: 'column' }}>
                        <Box>
                            <Box
                                component="img"
                                src={type.imgSrc}
                                alt={type.title}
                                sx={{ width: '100%', height: 'auto', borderRadius: 2, mb: 2 }}
                            />
                            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                                {type.title}
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 2 }}>
                                {type.description}
                            </Typography>
                        </Box>
                        <Divider sx={{ mt: 'auto', mb: 2 }} />
                        <Button onClick={scrollToSection} variant="outlined" sx={buttonStyle} fullWidth>
                            ЗАМОВИТИ
                        </Button>
                    </Paper>
                ))}
            </Box>
        </>
    );
};

export default TypesOfMonuments;