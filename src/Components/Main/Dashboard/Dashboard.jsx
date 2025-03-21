import React, { useState, useRef } from 'react';
import axios from 'axios';
import {
    Container,
    Typography,
    Card,
    Box,
    Button,
    Avatar,
    Snackbar,
    Alert,
    Tabs,
    Tab,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { langResources } from './langResourcesDashboard';
import TableOrder from "./TableOrder/TableOrder";
import PaymentHistory from "./PaymentHistory/PaymentHistory";
import AccountSettings from "./AccountSettings/AccountSettings";
import SupportContacts from "./SupportContacts/SupportContacts";
import DiscountCouponForm from "./DiscountCouponForm/DiscountCouponForm";
import LinkedCreatedProfileCards from "./LinkedCreatedProfileCards/LinkedCreatedProfileCards";
import PartnerSection from "./PartnerSection";
import { setReferralCode, setUserStatus } from "../../../redux/authSlice";

const Dashboard = () => {
    const dispatch = useDispatch();
    const userR = useSelector((state) => state.auth.user);
    const location = useLocation();
    const pathLang = location.pathname.split('/')[1];
    const language = langResources[pathLang] ? pathLang : 'en';
    const texts = langResources[language];

    const [user, setUser] = useState({
        name: userR.displayName || texts.profileName,
        email: userR.email || texts.profileEmail,
        profilePhoto: userR.photoURL || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScDf_Ep1nSHETPKv6j2oDp1DrM-FePAz2XEA&s",
        isPartner: userR.isPartner || false,
        referralCode: userR.referralCode || "",
        referralCount: userR.referralCount,
        isDiscount: userR.isDiscount || false,
    });

    const [currentTab, setCurrentTab] = useState(0);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [selectedCard, setSelectedCard] = useState({ id: null, name: '' });

    const orderSectionRef = useRef(null);

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

    const handleTabChange = (event, newValue) => {
        setCurrentTab(newValue);
    };

    const updateReferralCode = async (userId, referralCode) => {
        try {
            const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/auth/updateReferralCode`, { userId, referralCode }); // Используем переменную окружения
            return response.data;
        } catch (error) {
            console.error('Ошибка при обновлении реферального кода:', error);
            throw error;
        }
    };

    const generateReferralCode = async () => {
        const newReferralCode = `${Math.floor(Math.random() * 10000)}`;

        try {
            const updatedUser = await updateReferralCode(userR.uid, newReferralCode);
            setUser({ ...user, referralCode: newReferralCode });
            dispatch(setReferralCode(newReferralCode));

            setSnackbarMessage(texts.snackbarSuccess);
            setSnackbarSeverity("success");
            setSnackbarOpen(true);
        } catch (error) {
            setSnackbarMessage(texts.snackbarError);
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
        }
    };

    const handleOrderQRCode = (id, name) => {
        setSelectedCard({ id, name });
        setSnackbarMessage(`${texts.snackbarInfo} ${name}`);
        setSnackbarSeverity("info");
        setSnackbarOpen(true);

        if (orderSectionRef.current) {
            orderSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const handleBecomePartner = async () => {
        try {
            const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/auth/becomePartner`, { userId: userR._id }); // Используем переменную окружения
            setUser({ ...user, isPartner: true });
            dispatch(setUserStatus(true));

            setSnackbarMessage(texts.snackbarPartnerSuccess);
            setSnackbarSeverity("success");
            setSnackbarOpen(true);
        } catch (error) {
            setSnackbarMessage(texts.snackbarPartnerError);
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
        }
    };

    return (
        <Container maxWidth="md" sx={{ textAlign: "center", mt: 4 }}>
            <Tabs value={currentTab} onChange={handleTabChange} centered>
                <Tab label={texts.myAccountTab} />
                {user.isPartner && <Tab label={texts.partnerTab} />}
            </Tabs>
            {currentTab === 0 ? (
                <>
                    <Typography variant="h4" sx={{ fontWeight: "bold", mb: 4, mt: 4 }}>
                        {texts.dashboardTitle}
                    </Typography>
                    <Card id="profiles" sx={{ display: 'flex', alignItems: 'center', p: 2, mb: 4, boxShadow: 3, borderRadius: 3 }}>
                        <Avatar src={user.profilePhoto} sx={{ width: 80, height: 80, mr: 2 }} />
                        <Box textAlign="left">
                            <Typography variant="h6">{user.name}</Typography>
                            <Typography variant="body2" color="text.secondary">{user.email}</Typography>
                            {user.isPartner ? (
                                <Box sx={{ mt: 1 }}>
                                    {user.referralCode ? (
                                        <>
                                            <Typography variant="body2" color="text.secondary">
                                                {texts.referralCodeLabel} <strong>{user.referralCode}</strong>
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                                {texts.referralCountLabel} <strong>{user.referralCount}</strong>
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1, fontStyle: 'italic' }}>
                                                {texts.referralCodeHint}
                                            </Typography>
                                        </>
                                    ) : (
                                        <Button
                                            sx={buttonStyle}
                                            onClick={generateReferralCode}
                                        >
                                            {texts.generateCouponButton}
                                        </Button>
                                    )}
                                </Box>
                            ) : (
                                <Button
                                    sx={buttonStyle}
                                    onClick={handleBecomePartner}
                                >
                                    {texts.becomePartnerButton}
                                </Button>
                            )}
                        </Box>
                    </Card>

                    {!user.isDiscount && (
                        <DiscountCouponForm
                            setSnackbarOpen={setSnackbarOpen}
                            setSnackbarMessage={setSnackbarMessage}
                            setSnackbarSeverity={setSnackbarSeverity}
                            buttonStyle={buttonStyle}
                            id={userR._id}
                        />
                    )}

                    <Box sx={{ mb: 4 }} >
                        <LinkedCreatedProfileCards
                            buttonStyle={buttonStyle}
                            onOrderQRCode={handleOrderQRCode}
                        />
                    </Box>
                    <Box ref={orderSectionRef} id="order-section">
                        <TableOrder
                            email={userR.email}
                            setSnackbarOpen={setSnackbarOpen}
                            setSnackbarMessage={setSnackbarMessage}
                            setSnackbarSeverity={setSnackbarSeverity}
                            buttonStyle={buttonStyle}
                            selectedCard={selectedCard}
                        />
                    </Box>
                    <SupportContacts />
                </>
            ) : (
                <PartnerSection
                    referralCode={user.referralCode}
                    userEmail={user.email}
                    setSnackbarOpen={setSnackbarOpen}
                    setSnackbarMessage={setSnackbarMessage}
                    setSnackbarSeverity={setSnackbarSeverity}
                    buttonStyle={buttonStyle}
                />
            )}
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
                <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default Dashboard;