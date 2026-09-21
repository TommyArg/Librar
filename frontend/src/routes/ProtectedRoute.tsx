import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = () => {
    const token = localStorage.getItem('token');

    if (!token) {
        // if the user does NOT have the token, it will be sent to /login automatically
        return <Navigate to="/login" replace />;
    }

    // if the user does have a valid token, show protected paths
    return <Outlet />;
};