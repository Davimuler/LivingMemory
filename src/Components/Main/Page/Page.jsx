import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Card, CardMedia, CardContent, Box, IconButton, Grid, useMediaQuery, useTheme } from '@mui/material';
import { ArrowForward, ArrowBack } from '@mui/icons-material';
import { QRCodeSVG } from 'qrcode.react';
import { translations } from './translationsPage';
import {useLocation} from "react-router"; // Импортируем переводы

function Page() {
    const { id, lang = 'en' } = useParams(); // По умолчанию язык - английский
    const [profile, setProfile] = useState({
        mainPhoto: "",
        quote: "",
        gallery: [],
        name: "",
        description: "",
        youtubeVideoUrl: ""
    });
    const [currentIndex, setCurrentIndex] = useState(0);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

    const getYouTubeVideoId = (url) => {
        const regex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^&\n?#]+)/;
        const match = url.match(regex);
        return match ? match[1] : null;
    };

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/drafts/id/${id}`)
            .then(response => response.json())
            .then(data => setProfile(data.draft))
            .catch(error => console.error('Ошибка при загрузке данных:', error));
    }, [id]);

    const nextPhoto = () => {
        if (currentIndex < profile.gallery.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const prevPhoto = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const qrCodeValue = window.location.href;

    // Выбираем язык в зависимости от параметра в URL
    const location = useLocation();
    const pathParts = location.pathname.split("/");
    const currentLanguage = pathParts[1] === "eng" ? "eng" : "ua";
    const currentLang = translations[currentLanguage] || translations['eng'];

    return (
        <Container maxWidth="md" sx={{ textAlign: "center", mt: 4, mb: 4 }}>
            <CardMedia
                component="img"
                height={isMobile ? "200" : "400"}
                image={profile.mainPhoto}
                alt={currentLang.mainPhotoAlt}
                sx={{ borderRadius: 2 }}
            />

            <Typography variant="h4" sx={{ fontWeight: "bold", mt: 2, fontSize: isMobile ? '1.5rem' : '2rem' }}>
                {profile.name}
            </Typography>

            <Typography variant="h5" sx={{ fontStyle: "italic", mt: 3, color: "gray", fontSize: isMobile ? '1rem' : '1.25rem' }}>
                "{profile.quote}"
            </Typography>

            <Box sx={{ mt: 4, position: 'relative' }}>
                <Grid container spacing={2} justifyContent="center">
                    {profile.gallery.slice(currentIndex, currentIndex + (isMobile ? 1 : 2)).map((photo, index) => (
                        <Grid item key={index} xs={12} sm={6}>
                            <Card sx={{ boxShadow: 2, borderRadius: 2 }}>
                                <CardMedia
                                    component="img"
                                    height={isMobile ? 200 : 300}
                                    image={photo}
                                    alt={`${currentLang.galleryPhotoAlt} ${index}`}
                                />
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                <IconButton
                    onClick={prevPhoto}
                    disabled={currentIndex === 0}
                    sx={{
                        position: 'absolute',
                        left: isMobile ? 8 : -40,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        color: 'white',
                        '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        },
                        fontSize: isMobile ? '1.5rem' : '2rem',
                        padding: isMobile ? 1 : 2,
                    }}
                >
                    <ArrowBack />
                </IconButton>

                <IconButton
                    onClick={nextPhoto}
                    disabled={currentIndex >= profile.gallery.length - (isMobile ? 1 : 2)}
                    sx={{
                        position: 'absolute',
                        right: isMobile ? 8 : -40,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        color: 'white',
                        '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        },
                        fontSize: isMobile ? '1.5rem' : '2rem',
                        padding: isMobile ? 1 : 2,
                    }}
                >
                    <ArrowForward />
                </IconButton>
            </Box>

            <Card sx={{ boxShadow: 3, borderRadius: 3, mt: 4, p: 2 }}>
                <CardContent>
                    <Typography variant="body1" sx={{ color: "gray", fontSize: isMobile ? '1rem' : '1.2rem' }}>
                        {profile.description}
                    </Typography>
                </CardContent>
            </Card>

            <Box sx={{ mt: 2, mb: 4 }}>
                {getYouTubeVideoId(profile.youtubeVideoUrl) ? (
                    <iframe
                        width="100%"
                        height={isMobile ? 200 : 500}
                        src={`https://www.youtube.com/embed/${getYouTubeVideoId(profile.youtubeVideoUrl)}`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                ) : (
                    <Typography variant="body2" color="error">
                        {currentLang.youtubeVideoError}
                    </Typography>
                )}
            </Box>

            <Box sx={{ mt: 4, mb: 2 }}>
                <Typography variant="h4" sx={{ fontWeight: "bold", mt: 2, fontSize: isMobile ? '1.5rem' : '2rem' }}>
                    {currentLang.qrCodeTitle}
                </Typography>
            </Box>

            <Box
                sx={{
                    mt: 4,
                    mb: 4,
                    p: 3,
                    border: '1px solid lightgray',
                    borderRadius: 2,
                    width: '100%',
                    maxWidth: 'md',
                    margin: '0 auto',
                    boxShadow: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                }}
            >
                <QRCodeSVG
                    value={qrCodeValue}
                    size={isMobile ? 128 : 256}
                    style={{ maxWidth: "100%", height: "auto" }}
                />
            </Box>
        </Container>
    );
}

export default Page;