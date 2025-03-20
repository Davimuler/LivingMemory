import React from 'react';
import { Box, Typography, Button, Paper, Divider, Grid } from '@mui/material';
import cemeteryImage from "../../../assets/WayMonuments.webp";

const MemorialComplexes = ({scrollToSection, imgSrc, buttonStyle }) => {
    return (
        <Grid container spacing={3} sx={{ maxWidth: '70%', margin: '0 auto', mb: 4, alignItems: 'center' }}>
            <Grid item xs={12} md={5}>
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
            <Grid item xs={12} md={7}>
                <Paper elevation={0} sx={{ p: 3, textAlign: 'center', height: '100%' }}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
                        Меморіальні комплекси
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 3 }}>
                        Забезпечити місцю поховання завжди охайний вигляд без додаткових зусиль дає можливість встановлення меморіального комплексу. Гідно увічнити пам'ять про близьку вам людину.
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Button onClick={scrollToSection} variant="outlined" sx={buttonStyle} fullWidth>
                        ЗАМОВИТИ
                    </Button>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default MemorialComplexes;