import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import monumentImage from '../../../assets/TypesMon.webp';
import marmur from "../../../assets/Marmur.webp";
import granit from "../../../assets/Granit.webp";
import other from "../../../assets/Other.webp";
import addition from "../../../assets/additions.jpg";
import Section from './Section'; // Импортируем компонент Section
import { useLocation } from 'react-router-dom'; // Импортируем useLocation
import { langResources } from './langResourcesMaterialSection'; // Импортируем языковые ресурсы

const MaterialsSection = ({ buttonStyle, scrollToSection }) => {
    const [allMonuments, setAllMonuments] = useState([]);

    // Получаем текущий путь из URL
    const location = useLocation();
    const pathLang = location.pathname.split('/')[1]; // Извлекаем язык из URL (например, "/en/materials" -> "en")

    // Определяем язык по умолчанию, если язык из URL не поддерживается
    const language = langResources[pathLang] ? pathLang : 'eng';
    const texts = langResources[language]; // Тексты для текущего языка

    // Функция для получения всех карточек с бэкенда
    const fetchAllMonuments = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/monuments');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setAllMonuments(data);
        } catch (error) {
            console.error('Error fetching monuments:', error);
        }
    };

    // Загрузка данных при монтировании компонента
    useEffect(() => {
        fetchAllMonuments();
    }, []);

    // Функция для фильтрации карточек по секции
    const filterMonumentsBySection = (section) => {
        return allMonuments.filter(monument => monument.section === section);
    };

    return (
        <>
            {/* Секция с заголовком, описанием и фото */}
            <Grid container spacing={4} alignItems="center" sx={{ mb: 6, px: 4 }}>
                <Grid item xs={12} md={6}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
                        {texts.materialsSectionTitle}
                    </Typography>
                    <Typography variant="body1">
                        {texts.materialsSectionDescription}
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box
                        component="img"
                        src={monumentImage}
                        alt="Monument"
                        sx={{
                            width: '100%',
                            height: '350px',
                            borderRadius: 2,
                            objectFit: 'cover'
                        }}
                    />
                </Grid>
            </Grid>

            {/* Секция для граніту */}
            <Section
                title={texts.graniteTitle}
                imageSrc={granit}
                altText="Granite"
                materials={filterMonumentsBySection('Granite Monuments')}
                buttonStyle={buttonStyle}
                scrollToSection={scrollToSection}
            />

            {/* Секция для мармуру */}
            <Section
                title={texts.marbleTitle}
                imageSrc={marmur}
                altText="Marble"
                materials={filterMonumentsBySection('Marble Monuments')}
                buttonStyle={buttonStyle}
                scrollToSection={scrollToSection}
            />

            {/* Секция для інших матеріалів */}
            <Section
                title={texts.otherMaterialsTitle}
                imageSrc={other}
                altText="Other Materials"
                materials={filterMonumentsBySection('Other Materials')}
                buttonStyle={buttonStyle}
                scrollToSection={scrollToSection}
            />

            {/* Секция для додаткових послуг */}
            <Section
                title={texts.additionalServicesTitle}
                imageSrc={addition}
                altText="Additional Services"
                materials={filterMonumentsBySection('Additional Services')}
                buttonStyle={buttonStyle}
                scrollToSection={scrollToSection}
            />
        </>
    );
};

export default MaterialsSection;