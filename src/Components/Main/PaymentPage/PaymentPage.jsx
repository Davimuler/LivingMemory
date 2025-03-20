import React from "react";
import { Container, Typography, Card, CardContent, Button, Grid, Box } from "@mui/material";

function PaymentPage({ draftId }) {
    // Данные о тарифах
    const pricingPlans = [
        {
            title: "Базовий",
            price: "100 грн",
            features: [
                "Створення сторінки пам'яті",
                "1 фото в галереї",
                "Без підтримки відео",
                "Без QR-коду",
            ],
            buttonText: "Обрати Базовий",
        },
        {
            title: "Стандарт",
            price: "200 грн",
            features: [
                "Створення сторінки пам'яті",
                "До 5 фото в галереї",
                "Підтримка відео з YouTube",
                "QR-код для сторінки",
            ],
            buttonText: "Обрати Стандарт",
        },
        {
            title: "Преміум",
            price: "300 грн",
            features: [
                "Створення сторінки пам'яті",
                "До 10 фото в галереї",
                "Підтримка відео з YouTube",
                "QR-код для сторінки",
                "Пріоритетна підтримка",
            ],
            buttonText: "Обрати Преміум",
        },
    ];

    // Обработчик выбора тарифа
    const handleSelectPlan = (plan) => {
        console.log(`Обрано тариф: ${plan.title}, ID черновика: ${draftId}`);
        // Здесь можно добавить логику для обработки оплаты
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" align="center" sx={{ fontWeight: "bold", mb: 4 }}>
                Виберіть тарифний план
            </Typography>

            <Grid container spacing={4} justifyContent="center">
                {pricingPlans.map((plan, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4}>
                        <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography variant="h5" align="center" sx={{ fontWeight: "bold", mb: 2 }}>
                                    {plan.title}
                                </Typography>
                                <Typography variant="h4" align="center" sx={{ color: "primary.main", mb: 3 }}>
                                    {plan.price}
                                </Typography>
                                <Box sx={{ mb: 3 }}>
                                    {plan.features.map((feature, idx) => (
                                        <Typography key={idx} variant="body1" align="center" sx={{ mb: 1 }}>
                                            {feature}
                                        </Typography>
                                    ))}
                                </Box>
                            </CardContent>
                            <Box sx={{ p: 2, textAlign: "center" }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    onClick={() => handleSelectPlan(plan)}
                                >
                                    {plan.buttonText}
                                </Button>
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default PaymentPage;