import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useLocation } from 'react-router-dom'; // Добавляем useLocation
import { langResources } from './PartnerPresentationTexts'; // Импортируем языковые ресурсы

const PartnerPresentation = () => {
    const location = useLocation(); // Хук для получения текущего пути
    const pathLang = location.pathname.split('/')[1]; // Извлекаем язык из URL (например, "/en/dashboard" -> "en")
    const language = langResources[pathLang] ? pathLang : 'eng'; // Определяем язык по умолчанию
    const texts = langResources[language]; // Тексты для текущего языка

    return (
        <div style={{ textAlign: 'left' }}>
            {/* Главный заголовок */}
            <Typography variant="h3" gutterBottom>
                {texts.partnerPresentationTitle}
            </Typography>

            {/* Расширяющийся бокс */}
            <Accordion defaultExpanded>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography variant="h6">{texts.collaborationTitle}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography component="div">
                        <strong>{texts.whatWeOffer}</strong>
                        <br />
                        {texts.whatWeOfferText}
                        <br /><br />
                        <strong>{texts.howItWorks}</strong>
                        <br />
                        {texts.howItWorksText}
                        <br />
                        <ul>
                            <li>{texts.howToStartList[0]}</li>
                            <li>{texts.howToStartList[1]}</li>
                            <li>{texts.howToStartList[2]}</li>
                        </ul>
                        <strong>{texts.referralProgram}</strong>
                        <br />
                        {texts.referralProgramText}
                        <br />
                        <ul>
                            {texts.referralTiers.map((tier, index) => (
                                <li key={index}>{tier}</li>
                            ))}
                        </ul>
                        <strong>{texts.benefitsForYou}</strong>
                        <br />
                        <ul>
                            {texts.benefitsList.map((benefit, index) => (
                                <li key={index}>{benefit}</li>
                            ))}
                        </ul>
                        <strong>{texts.howToStart}</strong>
                        <br />
                        <ul>
                            {texts.howToStartList.map((step, index) => (
                                <li key={index}>{step}</li>
                            ))}
                        </ul>
                        <br />
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
};

export default PartnerPresentation;