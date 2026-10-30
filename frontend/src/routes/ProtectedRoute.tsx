import { Navigate, Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar';

export const ProtectedRoute = () => {
    const isAuthenticated = localStorage.getItem('token');

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'var(--ant-color-bg-base, #f5f5f5)',
            overflowX: 'hidden',
            width: '100%',
            boxSizing: 'border-box'
        }}>
            <Navbar />
            <div style={{ flex: 1, padding: '24px', width: '100%', boxSizing: 'border-box' }}>
                <Outlet />
            </div>
        </div>
    );
};