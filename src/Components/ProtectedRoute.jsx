// ProtectedRoute.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const userR = useSelector((state) => state.auth.user);

    // Якщо користувач не авторизований, перенаправляємо на сторінку входу
    if (!userR) {
        return <Navigate to="/login" replace />;
    }

    // Якщо користувач авторизований, відображаємо дочірній компонент
    return children;
};

export default ProtectedRoute;