import React, {useEffect, useRef} from 'react';
import { Box, Typography, Card, CardContent, Button, CardMedia, Grid, Divider } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh'; // Імпортуємо іконку оновлення
import QrCodeIcon from '@mui/icons-material/QrCode'; // Імпортуємо іконку QR-коду
import pageImage from '../../../assets/new.webp';
import monumentPage from '../../../assets/monumentPage.webp';
import qrGeneration from '../../../assets/qrGeneration.webp';
import TableMonument from '../../../assets/TableMonument.jpg';
import qrcode from "../../../assets/qrcode.jpg";
import FirstSection from "./parts/FirstSection";
import SecondSection from "./parts/SecondSection";
import ThirdSection from "./parts/ThirdSection";
import MemoryOptions from "./parts/MemoryOptions";
import imgage from "../../../assets/imga.png";
import PartnerSection from "./parts/PartnerSection";
import { useLang } from "../../useLang";
import { translations } from './translationsHomePage';
import {useLocation} from "react-router"; // Импортируем переводы



function HomePage() {
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

    const { lang, goTo } = useLang();
    const location = useLocation();
    const pathParts = location.pathname.split("/");
    const currentLanguage = pathParts[1] === "eng" ? "eng" : "ua";
    const aboutRef = useRef(null);
    const t = translations[currentLanguage]; // Выбираем нужный объект с переводами
    useEffect(() => {
        if (window.location.hash === "#about" && aboutRef.current) {
            aboutRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);
    return (
        <Box sx={{ textAlign: 'center', mt: 5 }}>
            <FirstSection goTo={goTo} t={t} />
            <SecondSection goTo={goTo} t={t} />
            <ThirdSection goTo={goTo} t={t} />

            <Box sx={{ maxWidth: '1200px', margin: 'auto', p: 3, mt: 8 }}>
                <Grid container spacing={4} alignItems="center">
                    <Grid item xs={12} md={6}>
                        <Card sx={{ p: 2 }}>
                            <CardMedia
                                component="img"
                                height="500"
                                image={TableMonument}
                                alt="Фото пам'ятника"
                                sx={{ borderRadius: '4px', mb: 2 }}
                            />
                            <Box sx={{ textAlign: 'center', mb: 2 }}>
                                <Button variant="outlined" sx={buttonStyle} onClick={() => goTo("/createpage")}>
                                    {t.createPage}
                                </Button>
                            </Box>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h2" component="h2" sx={{ textTransform: 'uppercase', fontWeight: 'bold', mb: 2 }}>
                            {t.qrGeneration}
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.6 }}>
                            {t.qrDescription}
                        </Typography>
                        <Box sx={{ textAlign: 'center', mt: 4 }}>
                            <img
                                src="https://global.discourse-cdn.com/brave/original/3X/7/c/7cd1856476d58b2df6f3cd6b352170a06c78e96a.png"
                                alt="QR-код"
                                style={{
                                    width: '100%',
                                    maxWidth: '300px',
                                    borderRadius: '4px',
                                }}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Box>

            <Box sx={{ maxWidth: '1200px', margin: 'auto', p: 3, mt: 8 }}>
                <section  id="about">
                    <Typography variant="h2" component="h2" sx={{ textTransform: 'uppercase', fontWeight: 'bold', mb: 4, textAlign: 'center' }}>
                        {t.aboutUs}
                    </Typography>
                </section>
                <Grid container spacing={4} alignItems="center">
                    <Grid item xs={12} md={6}>
                        <Typography variant="h4" component="h4" sx={{ fontWeight: 'bold', textAlign: 'left' }}>
                            {t.whatIsMemoryPage}
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.6, textAlign: 'left', mt: 2 }}>
                            {t.memoryPageDescription1}
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.6, mt: 2, textAlign: 'left' }}>
                            {t.memoryPageDescription2}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                            <CardMedia
                                component="img"
                                image={imgage}
                                alt="Сторінка пам’яті"
                                sx={{ width: '80%', height: 'auto', maxHeight: '600px', borderRadius: '4px' }}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Box>

            <MemoryOptions goTo={goTo} t={t} />
            <PartnerSection buttonStyle={buttonStyle} goTo={goTo} t={t} />
        </Box>
    );
}

export default HomePage;