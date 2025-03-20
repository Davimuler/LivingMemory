import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Grid, Paper, Divider, Button, IconButton } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Section = ({ title, imageSrc, altText, materials, buttonStyle, scrollToSection }) => {
    const [maxHeight, setMaxHeight] = useState(0);
    const cardRefs = useRef([]);

    useEffect(() => {
        if (cardRefs.current.length) {
            const heights = cardRefs.current.map(ref => ref?.offsetHeight || 0);
            setMaxHeight(Math.max(...heights));
        }
    }, [materials]);
console.log({title, imageSrc, altText, materials, buttonStyle, scrollToSection})
    const CustomArrow = ({ onClick, direction }) => (
        <IconButton
            onClick={onClick}
            sx={{
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 1,
                [direction === 'prev' ? 'left' : 'right']: -40,
                bgcolor: 'background.paper',
                boxShadow: 1,
                '&:hover': {
                    bgcolor: 'action.hover',
                }
            }}
        >
            {direction === 'prev' ? <ArrowBackIosIcon /> : <ArrowForwardIosIcon />}
        </IconButton>
    );

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: <CustomArrow direction="next" />,
        prevArrow: <CustomArrow direction="prev" />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    return (
        <Box sx={{ mb: 6, position: 'relative' }}>
            <Grid container alignItems="center" sx={{ mb: 4 }}>
                <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box
                        component="img"
                        src={imageSrc}
                        alt={altText}
                        sx={{
                            width: '100%',
                            height: '300px',
                            borderRadius: 2,
                            objectFit: 'cover',
                            ml: 6,
                        }}
                    />
                </Grid>
                <Grid item xs={8} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', ml: 1 }}>
                        {title}
                    </Typography>
                </Grid>
            </Grid>
            <Box sx={{ px: 4 }}>
                <Slider {...settings}>
                    {materials.map((material, index) => (
                        <Box key={index} sx={{ px: 2 }}>
                            <Paper
                                ref={(el) => (cardRefs.current[index] = el)}
                                elevation={3}
                                sx={{
                                    p: 3,
                                    textAlign: "center",
                                    display: "flex",
                                    flexDirection: "column",
                                    minHeight: "600px", // Увеличено до 600px
                                    height: maxHeight || "auto",
                                }}
                            >
                                <Box
                                    component="img"
                                    src={material.imgSrc}
                                    alt={material.title}
                                    sx={{
                                        width: "100%",
                                        height: "200px",
                                        borderRadius: 2,
                                        mb: 2,
                                        objectFit: "cover",
                                    }}
                                />
                                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                                    {material.title}
                                </Typography>
                                <Typography variant="body2" sx={{ mb: 2, flexGrow: 1 }}>
                                    {material.description}
                                </Typography>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontWeight: "bold",
                                        mb: 2,
                                        textAlign: 'left', // Выравнивание цены по левому краю
                                    }}
                                >
                                    {material.price}
                                </Typography>
                                <Divider sx={{ mt: "auto", mb: 2 }} />
                                <Button onClick={scrollToSection} variant="outlined" sx={buttonStyle} fullWidth>
                                    ЗАМОВИТИ
                                </Button>
                            </Paper>
                        </Box>
                    ))}
                </Slider>
            </Box>
        </Box>
    );
};

export default Section;