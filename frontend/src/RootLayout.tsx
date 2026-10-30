import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar'; // Ajusta la ruta según donde tengas tu Navbar

export const RootLayout: React.FC = () => {
    const location = useLocation();

    // hide navbar when not logged in
    const isLoginPage = location.pathname === '/login';

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            {!isLoginPage && <Navbar />}
            <div style={{ flex: 1 }}>
                <Outlet />
            </div>
        </div>
    );
};