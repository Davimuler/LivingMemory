import React from 'react';
import { Box, Container, Typography, Paper, Button } from '@mui/material';

function Footer() {
    return (
        <Box sx={{ backgroundColor: 'secondary.main', color: '#fff', py: 3, mt: 5 }}>
            <Container>
                <Typography variant="body2" align="center">
                    © 2025 Всі права захищені
                </Typography>


            </Container>
        </Box>
    );
}

export default Footer;
