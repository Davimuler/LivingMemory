import React from 'react';
import { Container } from '@mui/material';
import { Route, Routes, useLocation, useNavigate } from "react-router";
import Registration from "./Registration/Registration";
import Login from "./Login/Login";
import Page from "./Page/Page";
import CreatePage from "./CreatePage/CreatePage";
import Dashboard from "./Dashboard/Dashboard";
import EditPage from "./EditPage/EditPage";
import ProtectedRoute from '../ProtectedRoute';
import ImageUploader from "./TestApi";
import PaymentPage from "./PaymentPage/PaymentPage";
import PostView from "../PostView/PostView";
import Admin from "./Admin/Admin";
import SupportWidget from "./SupportWidget/SupportWidget";
import Monuments from "./Monuments/Monuments";
import OrderPage from "./TableOrderPage/TableOrderPage";
import HomePage from "./HomePage/HomePage";

function Main() {
    const location = useLocation();
    const navigate = useNavigate();

    const lang = location.pathname.split('/')[1]; // Берем язык из URL
    const supportedLanguages = ['ua', 'eng'];

    // if (!supportedLanguages.includes(lang)) {
    //     navigate('/ua'); // Если язык некорректный — редиректим на /ua
    // }

    const showSupportWidget = ![`/${lang}/register`, `/${lang}/login`].includes(location.pathname);

    return (
        <Container sx={{ mt: 5, textAlign: 'center' }}>
            <Routes>
                <Route path={`/${lang}/`} element={<HomePage />} />
                <Route path={`/${lang}/register`} element={<Registration />} />
                <Route path={`/${lang}/login`} element={<Login />} />
                <Route path={`/${lang}/page/:id/`} element={<Page />} />
                <Route path={`/${lang}/test/*`} element={<ImageUploader />} />
                <Route path={`/${lang}/payment/*`} element={<PaymentPage />} />
                <Route path={`/${lang}/postview/:id`} element={<PostView />} />
                <Route path={`/${lang}/admin`} element={<Admin />} />
                <Route path={`/${lang}/monuments`} element={<Monuments />} />
                <Route path={`/${lang}/order-qr`} element={<OrderPage />} />

                <Route path={`/${lang}/createpage/*`} element={<ProtectedRoute><CreatePage /></ProtectedRoute>} />
                <Route path={`/${lang}/dashboard`} element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path={`/${lang}/editpage/:id`} element={<ProtectedRoute><EditPage /></ProtectedRoute>} />
            </Routes>
            {showSupportWidget && <SupportWidget />}
        </Container>
    );
}

export default Main;
