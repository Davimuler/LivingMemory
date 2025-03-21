import React, { useState } from "react";
import {
    Container,
    TextField,
    Button,
    Typography,
    CardMedia,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    IconButton,
    Grid, // Добавляем Grid для адаптивного макета
    useMediaQuery, // Хук для определения размера экрана
    useTheme, // Хук для доступа к теме Material-UI
} from "@mui/material";
import { QRCodeSVG } from "qrcode.react";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import crest from "../../../assets/Crest.webp";
import { langResources } from './langResourcesCreatePage';

function CreatePage() {
    const userR = useSelector((state) => state.auth.user);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const navigate = useNavigate();
    const location = useLocation();
    const pathLang = location.pathname.split('/')[1];
    const language = langResources[pathLang] ? pathLang : 'eng';
    const texts = langResources[language];

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Определяем мобильные устройства
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md')); // Определяем планшеты

    const buttonStyle = {
        borderColor: '#FFD700',
        color: '#FFCC00',
        backgroundColor: 'transparent',
        fontSize: isMobile ? '0.875rem' : '1rem', // Меньше шрифт на мобильных
        fontWeight: 'bold',
        padding: isMobile ? '8px 12px' : '12px 16px', // Меньше отступы на мобильных
        '&:hover': {
            backgroundColor: 'rgba(255, 215, 0, 0.1)',
            borderColor: '#FFD700',
        },
    };

    const videoInstruction = "https://youtu.be/tsu01TR7Ofk?si=V667fw7eQPYc-VHY";
    const [profile, setProfile] = useState({
        email: userR.email,
        name: "",
        quote: "",
        description: "",
        mainPhoto: "",
        gallery: [],
        birthDay: "",
        birthMonth: "",
        birthYear: "",
        deathDay: "",
        deathMonth: "",
        deathYear: "",
        youtubeVideoUrl: "",
    });

    const uploadImage = async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post( `${process.env.REACT_APP_API_URL}/api/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data.fileUrl;
        } catch (err) {
            console.error('Ошибка загрузки файла:', err);
            throw err;
        }
    };

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handlePhotoUpload = async (e, type) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const imageUrl = await uploadImage(file);
                if (type === "main") {
                    setProfile({ ...profile, mainPhoto: imageUrl });
                } else {
                    if (profile.gallery.length < 5) {
                        setProfile({ ...profile, gallery: [...profile.gallery, imageUrl] });
                    } else {
                        alert("Максимум 5 фотографий в галерее");
                    }
                }
            } catch (error) {
                console.error("Ошибка при загрузке фотографии:", error);
            }
        }
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/drafts/draft`, profile, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            //navigate("/postview");
            console.log("успішно");
        } catch (error) {
            console.error("Помилка при створенні черновика:", error.response?.data || error.message);
            setSnackbarMessage("Помилка при створенні черновика: " + (error.response?.data?.message || error.message));
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
        }
    };

    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const months = [
        "Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень",
        "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"
    ];
    const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);

    const getYouTubeVideoId = (url) => {
        const regex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^&\n?#]+)/;
        const match = url.match(regex);
        return match ? match[1] : null;
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4, maxHeight: '80vh', overflowY: 'auto' }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Typography variant="h2" component="h1" sx={{ textAlign: 'left', fontSize: isMobile ? '1.5rem' : '2rem' }}>
                        {texts.quote}
                    </Typography>
                    <Typography variant="h5" component="h2" sx={{ color: '#FFD700', textAlign: 'left', mt: 1, fontSize: isMobile ? '1rem' : '1.25rem' }}>
                        {texts.quoteSource}
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <img
                        src={crest}
                        alt="Описание картинки"
                        style={{ width: isMobile ? '150px' : '300px', height: 'auto' }}
                    />
                </Grid>
            </Grid>

            <Box sx={{ width: '100%', height: '1px', backgroundColor: 'rgba(0, 0, 0, 0.1)', my: 2 }} />

            <Typography variant="h4" sx={{ fontWeight: "bold", textAlign: "center", mb: 4, fontSize: isMobile ? '1.5rem' : '2rem' }}>
                {texts.createPageTitle}
            </Typography>

            <Box sx={{ width: '100%', height: '1px', backgroundColor: 'rgba(0, 0, 0, 0.1)', my: 2 }} />

            {/* Секция загрузки главного фото */}
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1, textAlign: "left", fontSize: isMobile ? '1rem' : '1.25rem' }}>
                {texts.memorialPhoto}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: "center", gap: 2, mb: 3 }}>
                <label htmlFor="main-photo-upload">
                    <input
                        type="file"
                        accept="image/*"
                        id="main-photo-upload"
                        hidden
                        onChange={(e) => handlePhotoUpload(e, "main")}
                    />
                    {profile.mainPhoto ? (
                        <CardMedia
                            component="img"
                            src={profile.mainPhoto}
                            sx={{
                                width: isMobile ? 150 : 200,
                                height: isMobile ? 150 : 200,
                                borderRadius: "50%",
                                cursor: "pointer",
                            }}
                        />
                    ) : (
                        <Box
                            sx={{
                                width: isMobile ? 150 : 200,
                                height: isMobile ? 150 : 200,
                                borderRadius: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: "#f0f0f0",
                                cursor: "pointer",
                            }}
                        >
                            <IconButton color="gray" component="span">
                                <PhotoCameraIcon sx={{ color: "gray" }} />
                            </IconButton>
                        </Box>
                    )}
                </label>
                <Typography variant="body1" sx={{ color: "gray", flexGrow: 1, textAlign: isMobile ? "center" : "left", marginLeft: isMobile ? 0 : "20px" }}>
                    {texts.photoDescription}
                </Typography>
            </Box>

            {/* Секция ввода имени */}
            <Typography variant="body1" sx={{ mb: 1, textAlign: "left", fontSize: isMobile ? '0.875rem' : '1rem' }}>{texts.fullName}</Typography>
            <TextField
                label="Шевченко Олександр Андрійович"
                name="name"
                fullWidth
                value={profile.name}
                onChange={handleChange}
                sx={{ mb: 2 }}
            />

            {/* Секция даты рождения */}
            <Typography variant="body1" sx={{ mb: 1, textAlign: "left", fontSize: isMobile ? '0.875rem' : '1rem' }}>{texts.birthDate}</Typography>
            <Box sx={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: 2, mb: 2 }}>
                <FormControl fullWidth sx={{ mb: isMobile ? 2 : 0 }}>
                    <InputLabel>День</InputLabel>
                    <Select
                        value={profile.birthDay}
                        label="День"
                        onChange={(e) => setProfile({ ...profile, birthDay: e.target.value })}
                    >
                        {days.map((day) => (
                            <MenuItem key={day} value={day}>{day}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth sx={{ mb: isMobile ? 2 : 0 }}>
                    <InputLabel>Місяць</InputLabel>
                    <Select
                        value={profile.birthMonth}
                        label="Місяць"
                        onChange={(e) => setProfile({ ...profile, birthMonth: e.target.value })}
                    >
                        {months.map((month, index) => (
                            <MenuItem key={index} value={month}>{month}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel>Рік</InputLabel>
                    <Select
                        value={profile.birthYear}
                        label="Рік"
                        onChange={(e) => setProfile({ ...profile, birthYear: e.target.value })}
                    >
                        {years.map((year) => (
                            <MenuItem key={year} value={year}>{year}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            {/* Секция даты смерти */}
            <Typography variant="body1" sx={{ mb: 1, textAlign: "left", fontSize: isMobile ? '0.875rem' : '1rem' }}>{texts.deathDate}</Typography>
            <Box sx={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: 2, mb: 2 }}>
                <FormControl fullWidth sx={{ mb: isMobile ? 2 : 0 }}>
                    <InputLabel>День</InputLabel>
                    <Select
                        value={profile.deathDay}
                        label="День"
                        onChange={(e) => setProfile({ ...profile, deathDay: e.target.value })}
                    >
                        {days.map((day) => (
                            <MenuItem key={day} value={day}>{day}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth sx={{ mb: isMobile ? 2 : 0 }}>
                    <InputLabel>Місяць</InputLabel>
                    <Select
                        value={profile.deathMonth}
                        label="Місяць"
                        onChange={(e) => setProfile({ ...profile, deathMonth: e.target.value })}
                    >
                        {months.map((month, index) => (
                            <MenuItem key={index} value={month}>{month}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel>Рік</InputLabel>
                    <Select
                        value={profile.deathYear}
                        label="Рік"
                        onChange={(e) => setProfile({ ...profile, deathYear: e.target.value })}
                    >
                        {years.map((year) => (
                            <MenuItem key={year} value={year}>{year}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            {/* Секция эпитафии */}
            <Typography variant="body1" sx={{ mb: 1, textAlign: "left", fontSize: isMobile ? '0.875rem' : '1rem' }}>{texts.epitaph}</Typography>
            <TextField
                label="Ваша епітафія"
                name="quote"
                fullWidth
                value={profile.quote}
                onChange={handleChange}
                sx={{ mb: 2 }}
            />

            {/* Секция памятных слов */}
            <Typography variant="body1" sx={{ mb: 1, textAlign: "left", fontSize: isMobile ? '0.875rem' : '1rem' }}>{texts.memorialWords}</Typography>
            <TextField
                name="description"
                fullWidth
                multiline
                rows={isMobile ? 4 : 8}
                value={profile.description}
                onChange={handleChange}
                sx={{ mb: 2 }}
            />

            {/* Секция галереи */}
            <Typography variant="body1" sx={{ mt: 4, textAlign: "left", fontSize: isMobile ? '0.875rem' : '1rem' }}>{texts.addGallery}</Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 2, mb: 4 }}>
                {Array.from({ length: 5 }).map((_, index) => (
                    <label key={index} htmlFor={`gallery-photo-upload-${index}`}>
                        <input
                            type="file"
                            accept="image/*"
                            id={`gallery-photo-upload-${index}`}
                            hidden
                            onChange={(e) => handlePhotoUpload(e, "gallery")}
                        />
                        <Box
                            sx={{
                                width: isMobile ? 80 : 100,
                                height: isMobile ? 80 : 100,
                                borderRadius: "10px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: "#f0f0f0",
                                cursor: "pointer",
                                overflow: "hidden",
                            }}
                        >
                            {profile.gallery[index] ? (
                                <CardMedia
                                    component="img"
                                    src={profile.gallery[index]}
                                    sx={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                    }}
                                />
                            ) : (
                                <IconButton color="gray" component="span">
                                    <PhotoCameraIcon sx={{ color: "gray" }} />
                                </IconButton>
                            )}
                        </Box>
                    </label>
                ))}
            </Box>

            {/* Секция YouTube-ссылки */}
            <Typography variant="body1" sx={{ mt: 4, textAlign: "left", fontSize: isMobile ? '0.875rem' : '1rem' }}>{texts.youtubeLink}</Typography>
            <TextField
                label="Введіть посилання на відео з YouTube"
                name="youtubeVideoUrl"
                fullWidth
                value={profile.youtubeVideoUrl}
                onChange={handleChange}
                sx={{ mb: 2 }}
            />

            {/* Секция предпросмотра YouTube-видео */}
            {profile.youtubeVideoUrl && (
                <Box sx={{ mt: 2, mb: 4 }}>
                    <Typography variant="body1" sx={{ mb: 2, fontSize: isMobile ? '0.875rem' : '1rem' }}>{texts.videoPreview}</Typography>
                    {getYouTubeVideoId(profile.youtubeVideoUrl) ? (
                        <iframe
                            width="100%"
                            height={isMobile ? 200 : 500} // Уменьшаем высоту на мобильных
                            src={`https://www.youtube.com/embed/${getYouTubeVideoId(profile.youtubeVideoUrl)}`}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            style={{ marginBottom: isMobile ? '16px' : '32px' }} // Добавляем отступ снизу
                        ></iframe>
                    ) : (
                        <Typography variant="body2" color="error">
                            {texts.invalidYoutubeLink}
                        </Typography>
                    )}
                </Box>
            )}

            {/* Секция QR-кода */}
            <Typography variant="body1" sx={{ mt: 4, fontSize: isMobile ? '0.875rem' : '1rem' }}>{texts.qrCode}</Typography>
            <Box sx={{ mt: 2, p: 2, border: "1px solid lightgray", borderRadius: 2, display: "inline-block" }}>
                <QRCodeSVG value={window.location.href} size={isMobile ? 96 : 128} />
            </Box>

            {/* Секция кнопки оплаты */}
            <Box sx={{ width: '100%', height: '1px', backgroundColor: 'rgba(0, 0, 0, 0.1)', my: 2 }} />
            <Box sx={{ mt: 4, textAlign: "left", mb: 4 }}>
                <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2, fontSize: isMobile ? '1.25rem' : '1.5rem' }}>
                    {texts.price}
                </Typography>
                <Button
                    sx={buttonStyle}
                    variant="outlined"
                    color="primary"
                    fullWidth
                    onClick={handleSubmit}
                >
                    {texts.payButton}
                </Button>
            </Box>
        </Container>
    );
}

export default CreatePage;