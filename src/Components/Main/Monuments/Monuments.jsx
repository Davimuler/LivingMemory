import React from 'react';
import {Box, Typography, Button, Container, Paper, Divider, Grid} from '@mui/material';
import MaterialsSection from "./MaterialsSection";
const Monuments = () => {

    const scrollToSection = () => {
        const element = document.getElementById("contact-section");
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    // Стилі для кнопок
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
        <Container sx={{ py: 4 }}>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" component="h1" sx={{ textAlign: 'left' }}>
                    "Ісус сказав їй: «Я — воскресіння і життя. Хто вірує в Мене, хоч би й помер, — житиме."
                </Typography>
                <Typography variant="h5" component="h2" sx={{ color: '#FFD700', textAlign: 'left', mt: 1 }}>
                    Іван 11:25
                </Typography>
            </Box>


            <MaterialsSection scrollToSection={scrollToSection} buttonStyle={buttonStyle} />

        </Container>
    );
};

export default Monuments;