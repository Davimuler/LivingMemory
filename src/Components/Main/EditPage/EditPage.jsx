import React, { useState, useEffect } from "react";
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
    Grid,
    Card,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { QRCodeSVG } from "qrcode.react";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import {useParams, useNavigate, useLocation} from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { ArrowBack, ArrowForward, Delete } from "@mui/icons-material";
import { translations } from './translationsEditPage';

function EditPage() {
    const userR = useSelector((state) => state.auth.user);
    const { id } = useParams();
    const navigate = useNavigate();
    const [profile, setProfile] = useState({
        name: "",
        quote: "",
        description: "",
        mainPhoto: "",
        gallery: [],
        birthDay: "",
        birthMonth: "",
        birthYear: "",
        youtubeVideoUrl: "",
        email: "",
    });
    const [currentIndex, setCurrentIndex] = useState(0);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Для мобильных устройств
    const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md")); // Для планшетов
    const location = useLocation();
    const pathLang = location.pathname.split('/')[1];
    const language = translations[pathLang] ? pathLang : 'eng';
    const texts = translations[language];
    const buttonStyle = {
        borderColor: "#CE8946",
        color: "#CE8946",
        backgroundColor: "transparent",
        fontSize: isMobile ? "0.875rem" : "1rem", // Адаптивный размер шрифта
        fontWeight: "bold",
        padding: isMobile ? "8px 12px" : "12px 16px", // Адаптивные отступы
        "&:hover": {
            backgroundColor: "rgba(255, 215, 0, 0.1)",
            borderColor: "#FFD700",
        },
    };

    const getYouTubeVideoId = (url) => {
        const regex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^&\n?#]+)/;
        const match = url.match(regex);
        return match ? match[1] : null;
    };

    useEffect(() => {
        fetch(`http://localhost:5000/api/drafts/id/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setProfile(data.draft);
                if (data.draft.email !== userR.email) {
                    navigate("/");
                }
            })
            .catch((error) => console.error("Ошибка при загрузке данных:", error));
    }, [id]);

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const uploadImage = async (file) => {
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post("http://localhost:5000/api/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return response.data.fileUrl;
        } catch (err) {
            console.error("Ошибка загрузки файла:", err);
            throw err;
        }
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

    const handleDeletePhoto = (index) => {
        const newGallery = profile.gallery.filter((_, i) => i !== index);
        setProfile({ ...profile, gallery: newGallery });
    };

    const nextPhoto = () => {
        if (currentIndex < profile.gallery.length - (isMobile ? 1 : 2)) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const prevPhoto = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const handleSubmit = () => {
        if (profile.email !== userR.email) {
            alert("У вас нет прав на редактирование этого профиля.");
            return;
        }
        fetch(`http://localhost:5000/api/drafts/update/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(profile),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Данные успешно обновлены:", data);
            })
            .catch((error) => console.error("Ошибка при обновлении данных:", error));
    };

    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const months = [
        "Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень",
        "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"
    ];
    const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            {/* Заголовок */}
            <Typography variant="h4" sx={{ fontWeight: "bold", textAlign: "center", mb: 4, fontSize: isMobile ? "1.5rem" : "2rem" }}>
                {texts.editPageTitle}
            </Typography>

            {/* Главное фото */}
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1, textAlign: "left", fontSize: isMobile ? "1rem" : "1.25rem" }}>
                {texts.mainPhotoLabel}
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
                    {texts.mainPhotoDescription}
                </Typography>
            </Box>

            {/* Имя */}
            <Typography variant="body1" sx={{ mb: 1, textAlign: "left", fontSize: isMobile ? "0.875rem" : "1rem" }}>
                {texts.nameLabel}
            </Typography>
            <TextField
                name="name"
                fullWidth
                value={profile.name}
                onChange={handleChange}
                sx={{ mb: 2 }}
            />

            {/* Дата народження */}
            <Typography variant="body1" sx={{ mb: 1, textAlign: "left", fontSize: isMobile ? "0.875rem" : "1rem" }}>
                {texts.birthDateLabel}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: 2, mb: 2 }}>
                <FormControl fullWidth sx={{ mb: isMobile ? 2 : 0 }}>
                    <InputLabel>  {texts.dayLabel}</InputLabel>
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
                    <InputLabel>  {texts.monthLabel}</InputLabel>
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
                    <InputLabel>  {texts.yearLabel}</InputLabel>
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

            {/* Дата смерті */}
            <Typography variant="body1" sx={{ mb: 1, textAlign: "left", fontSize: isMobile ? "0.875rem" : "1rem" }}>
                {texts.deathDateLabel}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: 2, mb: 2 }}>
                <FormControl fullWidth sx={{ mb: isMobile ? 2 : 0 }}>
                    <InputLabel>{texts.dayLabel}</InputLabel>
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
                    <InputLabel>{texts.monthLabel}</InputLabel>
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
                    <InputLabel>{texts.yearLabel}</InputLabel>
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

            {/* Епітафія */}
            <Typography variant="body1" sx={{ mb: 1, textAlign: "left", fontSize: isMobile ? "0.875rem" : "1rem" }}>
                {texts.epitaphLabel}
            </Typography>
            <TextField
                label="Ваша епітафія"
                name="quote"
                fullWidth
                value={profile.quote}
                onChange={handleChange}
                sx={{ mb: 2 }}
            />

            {/* Пам'ятні слова */}
            <Typography variant="body1" sx={{ mb: 1, textAlign: "left", fontSize: isMobile ? "0.875rem" : "1rem" }}>
                {texts.memorialWordsLabel}
            </Typography>
            <TextField
                name="description"
                fullWidth
                multiline
                rows={isMobile ? 4 : 8}
                value={profile.description}
                onChange={handleChange}
                sx={{ mb: 2 }}
            />

            {/* Посилання на YouTube */}
            <Typography variant="body1" sx={{ mt: 4, textAlign: "left", fontSize: isMobile ? "0.875rem" : "1rem" }}>
                {texts.youtubeLinkLabel}
            </Typography>
            <TextField
                label="Введіть посилання на відео з YouTube"
                name="youtubeVideoUrl"
                fullWidth
                value={profile.youtubeVideoUrl}
                onChange={handleChange}
                sx={{ mb: 2 }}
            />

            {/* Галерея фотографій */}
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1, textAlign: "left", fontSize: isMobile ? "1rem" : "1.25rem" }}>
                {texts.galleryLabel}
            </Typography>
            <Box sx={{ mt: 4, position: "relative" }}>
                <Grid container spacing={2} justifyContent="center">
                    {profile.gallery.slice(currentIndex, currentIndex + (isMobile ? 1 : 2)).map((photo, index) => (
                        <Grid item key={index} xs={12} sm={6}>
                            <Card sx={{ boxShadow: 2, borderRadius: 2, position: "relative" }}>
                                <CardMedia
                                    component="img"
                                    height={isMobile ? 200 : 300}
                                    image={photo}
                                    alt={`Фото ${index}`}
                                />
                                <IconButton
                                    onClick={() => handleDeletePhoto(index)}
                                    sx={{
                                        position: "absolute",
                                        top: 8,
                                        right: 8,
                                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                                        "&:hover": {
                                            backgroundColor: "rgba(255, 255, 255, 1)",
                                        },
                                    }}
                                >
                                    <Delete sx={{ color: "red" }} />
                                </IconButton>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {/* Кнопки навигации по галерее */}
                <IconButton
                    onClick={prevPhoto}
                    disabled={currentIndex === 0}
                    sx={{
                        position: "absolute",
                        left: isMobile ? 8 : -40,
                        top: "50%",
                        transform: "translateY(-50%)",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        color: "white",
                        fontSize: isMobile ? "1.5rem" : "2rem",
                        padding: isMobile ? 1 : 2,
                    }}
                >
                    <ArrowBack />
                </IconButton>

                <IconButton
                    onClick={nextPhoto}
                    disabled={currentIndex >= profile.gallery.length - (isMobile ? 1 : 2)}
                    sx={{
                        position: "absolute",
                        right: isMobile ? 8 : -40,
                        top: "50%",
                        transform: "translateY(-50%)",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        color: "white",
                        fontSize: isMobile ? "1.5rem" : "2rem",
                        padding: isMobile ? 1 : 2,
                    }}
                >
                    <ArrowForward />
                </IconButton>
            </Box>

            {/* Кнопка добавления фото */}
            <Box sx={{ mt: 2, mb: 4 }}>
                <Typography variant="body2" sx={{ mb: 2 }}>
                    {texts.photosCount.replace("{count}", profile.gallery.length)}
                </Typography>
                {profile.gallery.length < 5 && (
                    <label htmlFor="gallery-photo-upload">
                        <input
                            type="file"
                            accept="image/*"
                            id="gallery-photo-upload"
                            hidden
                            onChange={(e) => handlePhotoUpload(e, "gallery")}
                        />
                        <Button
                            variant="contained"
                            component="span"
                            sx={
                            buttonStyle}
                        >
                            {texts.addPhotoButton}
                        </Button>
                    </label>
                )}
            </Box>

            {/* YouTube-видео */}
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1, textAlign: "left", fontSize: isMobile ? "1rem" : "1.25rem" }}>
                {texts.yourVideoLabel}
            </Typography>
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
                        {texts.invalidYouTubeLink}
                    </Typography>
                )}
            </Box>

            {/* QR-код */}
            <Typography variant="body1" sx={{ mt: 4, fontSize: isMobile ? "0.875rem" : "1rem" }}>
                {texts.qrCodeLabel}
            </Typography>
            <Box sx={{ mt: 2, p: 2, border: "1px solid lightgray", borderRadius: 2, display: "inline-block" }}>
                <QRCodeSVG value={window.location.href} size={isMobile ? 96 : 128} />
            </Box>
            {/* Кнопка сохранения */}
            <Box sx={{ mt: 4, textAlign: "center", mb: 4 }}>
                <Button sx={buttonStyle} variant="outlined" onClick={handleSubmit}>
                    {texts.saveChangesButton}
                </Button>
            </Box>
        </Container>
    );
}

export default EditPage;