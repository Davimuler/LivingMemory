import React, { useContext, useState } from 'react';
import { TextField, Button, Container, Typography, Box, useTheme, useMediaQuery } from '@mui/material';
import axios from 'axios';
import { Context } from "../../../index";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import GoogleIcon from '@mui/icons-material/Google';
import { useDispatch } from 'react-redux';
import { login } from '../../../redux/authSlice';
import { useLocation } from 'react-router-dom';
import { langResources } from './langResources';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const { auth } = useContext(Context);
    const dispatch = useDispatch();

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const location = useLocation();
    const pathLang = location.pathname.split('/')[1];

    const language = langResources[pathLang] ? pathLang : 'eng';
    const texts = langResources[language];

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

    const fetchUserData = async (email) => {
        console.log("Запрос к URL:", `${process.env.REACT_APP_API_URL}/api/auth/getuser`);
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/getuser`, {
                email: email,
            });
            console.log(response.data.user);
            return response.data;
        } catch (err) {
            console.error("Помилка отримання даних користувача:", err);
            throw err;
        }
    };

    const loginWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            setSuccess(texts.googleLoginSuccess);
            setError('');

            const userData = await fetchUserData(user.email);
            console.log(userData);

            dispatch(login({
                _id: userData.user._id,
                uid: userData.user.uid,
                email: userData.user.email,
                displayName: userData.user.displayName,
                photoURL: userData.user.photoURL,
                referralCode: userData.user.referralCode,
                referralCount: userData.user.referralCount,
                isDiscount: userData.user.isDiscount,
                userStatus: userData.user.userStatus,
                token: userData.token,
            }));
        } catch (err) {
            console.error("Помилка входу через Google:", err);
            setError(texts.googleLoginError);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
                email,
                password
            });

            console.log("hi", response.data);
            setSuccess(texts.loginSuccess);
            setError('');

            dispatch(login({
                _id: response.data.user._id,
                uid: response.data.user.id,
                email: response.data.user.email,
                displayName: response.data.user.name,
                photoURL: response.data.user.avatar,
                referralCode: response.data.user.referralCode,
                referralCount: response.data.user.referralCount,
                isDiscount: response.data.user.isDiscount,
                userStatus: response.data.user.userStatus,
                token: response.data.token,
            }));
        } catch (err) {
            setError(texts.invalidCredentials);
            setSuccess('');
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
                    {texts.login}
                </Typography>
                {[texts.email, texts.password].map((label, index) => (
                    <TextField
                        key={index}
                        label={label}
                        variant="standard"
                        fullWidth
                        type={label === texts.password ? 'password' : 'text'}
                        value={label === texts.email ? email : password}
                        onChange={(e) => label === texts.email ? setEmail(e.target.value) : setPassword(e.target.value)}
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
                {error && (
                    <Typography sx={{ fontSize: '14px', color: 'red', textAlign: 'center' }}>
                        {error}
                    </Typography>
                )}
                {success && (
                    <Typography sx={{ fontSize: '14px', color: 'green', textAlign: 'center' }}>
                        {success}
                    </Typography>
                )}
                <Button
                    sx={{
                        ...buttonStyle,
                        borderRadius: '10px',
                    }}
                    fullWidth
                    onClick={handleSubmit}
                >
                    {texts.loginButton}
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
                        onClick={loginWithGoogle}
                    >
                        <GoogleIcon fontSize={isMobile ? "small" : "medium"} />
                        <Typography variant="body1" sx={{ fontSize: isMobile ? '0.875rem' : '1rem' }}>
                            {texts.loginWithGoogle}
                        </Typography>
                    </Button>
                </Box>
                <Typography
                    sx={{
                        marginTop: 2,
                        textAlign: 'center',
                        fontSize: '14px',
                        color: '#555',
                    }}
                >
                    {texts.noAccount} <a href="/register" style={{ color: '#CE8946', textDecoration: 'none' }}>{texts.createAccount}</a>
                </Typography>
            </Box>
        </Container>
    );
};

export default Login;