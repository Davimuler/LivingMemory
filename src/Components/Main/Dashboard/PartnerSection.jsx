import React, { useState, useRef } from 'react';
import {
    Card,
    Typography,
    TextField,
    Button,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Box,
    Paper,
    Divider,
} from '@mui/material';
import axios from 'axios';
import { useLocation } from 'react-router-dom'; // Добавляем useLocation
import { langResources } from './langResourcesPartnerSection'; // Импортируем языковые ресурсы
import UserMonuments from './UserMonuments';
import PartnerPresentation from "./PartnerPresentation";

const PartnerSection = ({ referralCode, userEmail, setSnackbarOpen, setSnackbarMessage, setSnackbarSeverity }) => {
    const [monumentData, setMonumentData] = useState({
        imgSrc: '',
        title: '',
        description: '',
        price: '',
        section: '',
        creatorEmail: userEmail,
        country: '',
        city: '',
    });

    const [previewImage, setPreviewImage] = useState(null);
    const fileInputRef = useRef(null);

    const location = useLocation(); // Хук для получения текущего пути
    const pathLang = location.pathname.split('/')[1]; // Извлекаем язык из URL (например, "/en/dashboard" -> "en")
    const language = langResources[pathLang] ? pathLang : 'eng'; // Определяем язык по умолчанию
    const texts = langResources[language]; // Тексты для текущего языка

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

    const handleMonumentChange = (e) => {
        const { name, value } = e.target;
        setMonumentData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await axios.post('http://localhost:5000/api/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                const imageUrl = response.data.fileUrl;
                setPreviewImage(imageUrl);
                setMonumentData(prevState => ({
                    ...prevState,
                    imgSrc: imageUrl,
                }));

                setSnackbarMessage(texts.snackbarSuccess);
                setSnackbarSeverity("success");
                setSnackbarOpen(true);
            } catch (error) {
                console.error("Ошибка при загрузке фотографии:", error);
                setSnackbarMessage(texts.snackbarError);
                setSnackbarSeverity("error");
                setSnackbarOpen(true);
            }
        }
    };

    const handleSubmitMonument = async () => {

        try {
            const response = await fetch('http://localhost:5000/api/monuments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(monumentData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Ошибка при создании памятника');
            }

            setSnackbarMessage(texts.snackbarMonumentSuccess);
            setSnackbarSeverity("success");
            setSnackbarOpen(true);
        } catch (error) {
            console.error('Ошибка:', error);
            setSnackbarMessage(texts.snackbarMonumentError);
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            {/* Секция с реферальным кодом */}
            <Box sx={{ width: '100%', maxWidth: '600px', textAlign: 'left', mb: 4 }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                    {texts.referralCodeTitle}
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                    {texts.referralCodeDescription} <strong>{referralCode}</strong>
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {texts.referralCodeHint}
                </Typography>
            </Box>

            {/* Текст перед формой */}
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                {texts.addMonumentTitle}
            </Typography>

            {/* Форма для создания памятника */}
            <Card sx={{ p: 2, boxShadow: 3, borderRadius: 3, width: '100%', maxWidth: '600px' }}>
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>{texts.sectionLabel}</InputLabel>
                    <Select
                        name="section"
                        value={monumentData.section}
                        label={texts.sectionLabel}
                        onChange={handleMonumentChange}
                    >
                        <MenuItem value="Granite Monuments">{texts.sectionOptions.granite}</MenuItem>
                        <MenuItem value="Marble Monuments">{texts.sectionOptions.marble}</MenuItem>
                        <MenuItem value="Other Materials">{texts.sectionOptions.other}</MenuItem>
                        <MenuItem value="Additional Services">{texts.sectionOptions.services}</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    fullWidth
                    label={texts.titleLabel}
                    name="title"
                    value={monumentData.title}
                    onChange={handleMonumentChange}
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    label={texts.descriptionLabel}
                    name="description"
                    value={monumentData.description}
                    onChange={handleMonumentChange}
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    label={texts.priceLabel}
                    name="price"
                    value={monumentData.price}
                    onChange={handleMonumentChange}
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    label={texts.countryLabel}
                    name="country"
                    value={monumentData.country}
                    onChange={handleMonumentChange}
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    label={texts.cityLabel}
                    name="city"
                    value={monumentData.city}
                    onChange={handleMonumentChange}
                    sx={{ mb: 2 }}
                />
                <Button
                    variant="outlined"
                    component="label"
                    sx={buttonStyle}
                >
                    {texts.uploadPhotoButton}
                    <input
                        type="file"
                        hidden
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        accept="image/*"
                    />
                </Button>
            </Card>

            {/* Превью памятника */}
            {previewImage && (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        {texts.previewTitle}
                    </Typography>
                    <Paper elevation={3} sx={{ p: 3, textAlign: 'center', maxWidth: '300px', display: 'flex', flexDirection: 'column' }}>
                        <Box>
                            <Box
                                component="img"
                                src={previewImage}
                                alt="Прев'ю пам'ятника"
                                sx={{ width: '100%', height: 'auto', borderRadius: 2, mb: 2 }}
                            />
                            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                                {monumentData.title}
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 2 }}>
                                {monumentData.description}
                            </Typography>
                        </Box>
                        <Divider sx={{ mt: 'auto', mb: 2 }} />
                        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, textAlign: 'left' }}>
                            {monumentData.price}
                        </Typography>
                    </Paper>
                    <Button
                        variant="outlined"
                        onClick={handleSubmitMonument}
                        sx={buttonStyle}
                    >
                        {texts.addMonumentButton}
                    </Button>
                </Box>
            )}

            {/* Компонент для отображения созданных памятников */}
            <UserMonuments userEmail={userEmail} />
            <PartnerPresentation />
        </Box>
    );
};

export default PartnerSection;