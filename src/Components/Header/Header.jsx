import React, { useState, useEffect } from 'react';
import {
    AppBar,
    Box,
    Button,
    Paper,
    Toolbar,
    Typography,
    IconButton,
    Avatar,
    Menu,
    MenuItem,
    useMediaQuery,
    SwipeableDrawer,
    List,
    ListItem,
    ListItemText,
    Divider,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LanguageIcon from '@mui/icons-material/Language';
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/authSlice';
import logo from '../../assets/result.png';
import { useLang } from "../useLang";
import { translations } from '../translations'; // Импортируем переводы

const Header = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const isLoggedIn = !!user;
    const profileImage = user?.profileImage || null;
    const { goTo } = useLang(); // Используем хук для получения функции goTo

    const [anchorEl, setAnchorEl] = useState(null);
    const [servicesAnchorEl, setServicesAnchorEl] = useState(null);
    const [languageAnchorEl, setLanguageAnchorEl] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [currentLanguage, setCurrentLanguage] = useState('ua'); // По умолчанию украинский

    const isMobile = useMediaQuery('(max-width: 900px)');

    // Получаем язык из URL
    useEffect(() => {
        const languageFromURL = window.location.pathname.split('/')[1]; // Получаем часть URL (ua или en)
        if (languageFromURL === 'ua' || languageFromURL === 'eng') {
            setCurrentLanguage(languageFromURL);
        }
    }, []);

    // Получаем текущие переводы
    const t = translations[currentLanguage];

    // Стили для кнопок "Реєстрація" и "Вхід"
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

    // Уменьшенные стили для мобильных устройств
    const mobileButtonStyle = {
        ...buttonStyle,
        fontSize: '0.875rem',
        padding: '8px 12px',
    };

    const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);
    const handleLogout = () => {
        dispatch(logout());
        handleMenuClose();
    };

    const handleServicesMenuOpen = (event) => setServicesAnchorEl(event.currentTarget);
    const handleServicesMenuClose = () => setServicesAnchorEl(null);

    const handleLanguageMenuOpen = (event) => {
        event.stopPropagation(); // Предотвращаем всплытие события
        setLanguageAnchorEl(event.currentTarget);
    };
    const handleLanguageMenuClose = () => setLanguageAnchorEl(null);
    const handleLanguageChange = (language) => {
        setCurrentLanguage(language); // Меняем язык
        handleLanguageMenuClose();

        // Получаем текущий путь без языка
        const currentPath = window.location.pathname;
        const pathWithoutLanguage = currentPath.split('/').slice(2).join('/');

        // Обновляем URL с новым языком
        window.location.href = `/${language}/${pathWithoutLanguage}`;
    };

    const handleHomeClick = () => goTo("/"); // Используем goTo для перехода на главную страницу
    const toggleDrawer = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    // Рендеринг для мобильных устройств
    const renderMobileMenu = () => (
        <SwipeableDrawer
            anchor="right"
            open={drawerOpen}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
        >
            <Box
                sx={{ width: 250 }}
                role="presentation"
                onClick={(e) => e.stopPropagation()} // Предотвращаем закрытие при клике внутри
                onKeyDown={toggleDrawer(false)}
            >
                <List>
                    <ListItem button onClick={handleHomeClick}>
                        <ListItemText primary={t.home} />
                    </ListItem>
                    <ListItem button onClick={() => goTo("/#about")}>
                        <ListItemText primary={t.about} />
                    </ListItem>
                    <ListItem button onClick={() => goTo("/createpage")}>
                        <ListItemText primary={t.createPage} />
                    </ListItem>
                    <ListItem button onClick={() => goTo("/monuments")}>
                        <ListItemText primary={t.monuments} />
                    </ListItem>
                    <ListItem button onClick={() => goTo("/dashboard/#profiles")}>
                        <ListItemText primary={t.orderQR} />
                    </ListItem>
                </List>
                <Divider />
                {/* Кнопки "Вхід" и "Реєстрація" в бургер-меню для неавторизованных пользователей */}
                {!isLoggedIn && (
                    <List>
                        <ListItem button onClick={() => goTo("/login")}>
                            <ListItemText primary={t.login} />
                        </ListItem>
                        <ListItem button onClick={() => goTo("/register")}>
                            <ListItemText primary={t.register} />
                        </ListItem>
                    </List>
                )}
                <Divider />
                <List>
                    <ListItem button onClick={handleLanguageMenuOpen}>
                        <ListItemText primary={t.language} />
                    </ListItem>
                    <Menu
                        anchorEl={languageAnchorEl}
                        open={Boolean(languageAnchorEl)}
                        onClose={handleLanguageMenuClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        sx={{
                            '& .MuiPaper-root': {
                                marginTop: '8px', // Отступ для позиционирования
                            },
                        }}
                    >
                        <MenuItem
                            onClick={() => {
                                handleLanguageChange('ua');
                                handleLanguageMenuClose();
                            }}
                        >
                            Українська
                        </MenuItem>
                        <MenuItem
                            onClick={() => {
                                handleLanguageChange('eng');
                                handleLanguageMenuClose();
                            }}
                        >
                            English
                        </MenuItem>
                    </Menu>
                </List>
            </Box>
        </SwipeableDrawer>
    );

    // Рендеринг для ПК
    const renderDesktopMenu = () => (
        <>
            <Paper
                sx={{
                    backgroundColor: '#fff',
                    borderRadius: '50px',
                    p: 1,
                    boxShadow: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minWidth: '700px',
                }}
            >
                <Button sx={{ color: '#333', borderRadius: '50px', mx: 3 }} onClick={handleHomeClick}>
                    {t.home}
                </Button>
                <Button
                    sx={{ color: '#333', borderRadius: '50px', mx: 3 }}
                    onClick={() => goTo("/#about")}
                >
                    {t.about}
                </Button>
                <Button
                    sx={{ color: '#333', borderRadius: '50px', mx: 3 }}
                    onClick={() => goTo("/createpage")}
                >
                    {t.createPage}
                </Button>
                <Button sx={{ color: '#333', borderRadius: '50px', mx: 3 }} onClick={handleServicesMenuOpen}>
                    {t.services}
                </Button>
                <Menu
                    anchorEl={servicesAnchorEl}
                    open={Boolean(servicesAnchorEl)}
                    onClose={handleServicesMenuClose}
                >
                    <MenuItem onClick={() => goTo("/monuments")}>{t.monuments}</MenuItem>
                    <MenuItem onClick={() => goTo("/dashboard/#profiles")}>
                        {t.orderQR}
                    </MenuItem>
                </Menu>
            </Paper>
            <Button
                sx={{ color: '#333', ml: 2 }}
                onClick={handleLanguageMenuOpen}
            >
                <LanguageIcon />
            </Button>
            <Menu
                anchorEl={languageAnchorEl}
                open={Boolean(languageAnchorEl)}
                onClose={handleLanguageMenuClose}
            >
                <MenuItem onClick={() => handleLanguageChange('ua')}>Українська</MenuItem>
                <MenuItem onClick={() => handleLanguageChange('eng')}>English</MenuItem>
            </Menu>
        </>
    );

    return (
        <AppBar position="sticky" sx={{ background: 'linear-gradient(to right, #faf2e5, #e0e3f6)', boxShadow: 'none' }}>
            <Toolbar sx={{ position: 'relative', justifyContent: 'space-between', px: 2, minHeight: '180px' }}>
                {/* Логотип и название */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <img src={logo} alt="Logo" style={{ height: '50px', marginRight: '10px' }} />
                    <Typography variant="h6" sx={{ color: '#CE8946', marginTop: '15px', lineHeight: 1 }}>
                        ЖИВА ПАМ'ЯТЬ
                    </Typography>
                </Box>

                {/* Центральное меню или бургер-меню */}
                {!isMobile && (
                    <Box sx={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center' }}>
                        {renderDesktopMenu()}
                    </Box>
                )}

                {/* Правая часть: кнопки входа/регистрации или профиль */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {isLoggedIn ? (
                        <>
                            <IconButton onClick={handleMenuOpen} sx={{ borderRadius: '50%', p: 1 }}>
                                {profileImage ? (
                                    <Avatar src={profileImage} sx={{ width: 56, height: 56 }} />
                                ) : (
                                    <AccountCircleIcon sx={{ color: '#4b6076', fontSize: '3rem' }} />
                                )}
                            </IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleMenuClose}
                            >
                                <MenuItem onClick={() => goTo("/dashboard")}>{t.profile}</MenuItem>
                                <MenuItem onClick={handleLogout}>{t.logout}</MenuItem>
                            </Menu>
                        </>
                    ) : (
                        // На мобильных устройствах кнопки "Вхід" и "Реєстрація" скрыты, они теперь в бургер-меню
                        !isMobile && (
                            <>
                                <Button
                                    onClick={() => goTo("/login")}
                                    sx={buttonStyle}
                                >
                                    {t.login}
                                </Button>
                                <Button
                                    onClick={() => goTo("/register")}
                                    sx={buttonStyle}
                                >
                                    {t.register}
                                </Button>
                            </>
                        )
                    )}
                    {isMobile && (
                        <IconButton onClick={toggleDrawer(true)} sx={{ color: '#333', ml: 2 }}>
                            <MenuIcon />
                        </IconButton>
                    )}
                </Box>
            </Toolbar>
            {isMobile && renderMobileMenu()}
        </AppBar>
    );
};

export default Header;