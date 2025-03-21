import React, { useState, useContext } from 'react';
import { TextField, Button, Container, Typography, Box, useTheme, useMediaQuery } from '@mui/material';
import axios from 'axios';
import { Context } from "../../../index";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import GoogleIcon from '@mui/icons-material/Google';
import { useLocation } from 'react-router-dom';
import { langResources } from './langResources';

const Registration = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: ''
    });

    const buttonStyle = {
        borderColor: '#CE8946',
        color: '#CE8946',
        backgroundColor: 'transparent',
        fontWeight: 'bold',
        padding: '12px 16px',
        '&:hover': {
            backgroundColor: 'rgba(255, 215, 0, 0.1)',
            borderColor: '#FFD700',
        },
    };

    const [error, setError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const { auth } = useContext(Context);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const location = useLocation();
    const pathLang = location.pathname.split('/')[1];
    const language = langResources[pathLang] ? pathLang : 'eng';
    const texts = langResources[language];

    const RegWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            console.log(user);

            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/google`, {
                accessToken: user.accessToken,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
            });

            if (response.data.success) {
                setSuccessMessage(texts.googleRegistrationSuccess);
                setError('');
            } else {
                setError(texts.googleRegistrationError);
            }
        } catch (err) {
            console.error("Google registration error:", err);
            setError(texts.googleRegistrationError);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));

        if (name === 'confirmPassword') {
            if (value !== formData.password) {
                setPasswordError(texts.passwordsDoNotMatch);
            } else {
                setPasswordError('');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setPasswordError(texts.passwordsDoNotMatch);
            return;
        }

        const dataToSend = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phoneNumber: formData.phoneNumber,
            password: formData.password,
            confirmPassword: formData.confirmPassword
        };

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/register`, dataToSend);

            if (response.status === 201) {
                setSuccessMessage(texts.registrationSuccess);
                setError('');
            } else {
                setError(texts.serverError);
                setSuccessMessage('');
            }
        } catch (error) {
            console.error('Error sending data:', error);

            if (error.response && error.response.status === 400) {
                setError(texts.userExists);
            } else {
                setError(texts.serverError);
            }
            setSuccessMessage('');
        }
    };

    return (
        <Container
            maxWidth={isMobile ? "xs" : "sm"}
            sx={{
                maxWidth: isMobile ? "100%" : "85%",
                height: isMobile ? '105vh' : 'auto',
                overflowY: isMobile ? 'auto' : 'visible',
                padding: isMobile ? '16px' : '24px',
                paddingBottom: isMobile ? '20px' : '24px',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    mt: isMobile ? 2 : 5,
                    p: 3,
                    borderRadius: 2,
                    boxShadow: 3,
                    mb: 5,
                }}
            >
                <Typography variant="h5" align="center" gutterBottom>
                    {texts.registration}
                </Typography>
                {error && <Typography sx={{ color: 'red', textAlign: 'center' }}>{error}</Typography>}
                {passwordError && <Typography sx={{ color: 'red', textAlign: 'center' }}>{passwordError}</Typography>}
                {successMessage && <Typography sx={{ color: 'green', textAlign: 'center' }}>{successMessage}</Typography>}

                {[
                    { label: texts.firstName, name: 'firstName' },
                    { label: texts.lastName, name: 'lastName' },
                    { label: texts.email, name: 'email' },
                    { label: texts.phoneNumber, name: 'phoneNumber' },
                    { label: texts.enterPassword, name: 'password' },
                    { label: texts.confirmPassword, name: 'confirmPassword' }
                ].map(({ label, name }, index) => (
                    <TextField
                        key={index}
                        label={label}
                        variant="standard"
                        fullWidth
                        name={name}
                        value={formData[name]}
                        onChange={handleChange}
                        type={label.includes('password') ? 'password' : 'text'}
                        InputProps={{
                            sx: {
                                '&:before': {
                                    borderBottom: '2px solid #ccc',
                                    transition: 'border-color 0.3s ease',
                                },
                                '&:hover:not(.Mui-disabled):before': {
                                    borderBottom: '2px solid #1E90FF',
                                },
                                '&.Mui-focused:before': {
                                    borderBottom: '2px solid #1E90FF',
                                },
                                '&:after': {
                                    borderBottom: '2px solid #1E90FF',
                                },
                            },
                        }}
                    />
                ))}
                <Button
                    disabled={passwordError || formData.password !== formData.confirmPassword}
                    onClick={handleSubmit}
                    sx={{
                        ...buttonStyle,
                        borderRadius: '10px',
                    }}
                    fullWidth
                >
                    {texts.register}
                </Button>
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                    <Button
                        sx={{
                            ...buttonStyle,
                            display: 'flex',
                            alignItems: 'center',
                            gap: isMobile ? 0.5 : 1,
                            border: '1px solid ',
                            backgroundColor: 'transparent',
                            borderRadius: '10px',
                            fontSize: isMobile ? '0.875rem' : '1rem',
                            padding: isMobile ? '8px 12px' : '12px 16px',
                        }}
                        onClick={RegWithGoogle}
                    >
                        <GoogleIcon fontSize={isMobile ? "small" : "medium"} />
                        <Typography variant="body1" sx={{ fontSize: isMobile ? '0.875rem' : '1rem' }}>
                            {texts.registerWithGoogle}
                        </Typography>
                    </Button>
                </Box>
                <Typography sx={{ fontSize: isMobile ? '0.875rem' : '1rem' }}>
                    {texts.alreadyHaveAccount} <a href="/login" style={{ color: '#CE8946', textDecoration: 'none' }}>{texts.loginHere}</a>
                </Typography>
            </Box>
        </Container>
    );
};

export default Registration;