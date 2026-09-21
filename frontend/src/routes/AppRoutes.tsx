import { createBrowserRouter, Navigate } from 'react-router-dom';
import { LoginPage } from '../pages/Login/LoginPage';
import { ProtectedRoute } from './ProtectedRoute';
import { HomePage } from '../pages/Home/HomePage';

// 404 test
const NotFound = () => <h2>404 - Página no encontrada</h2>;

export const router = createBrowserRouter([
  // public routes
  {
    path: '/login',
    element: <LoginPage />,
  },

  // protected routes
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/', //  root route
        element: <HomePage />,
      },
      // future entrances should look like this
      //{ path: '/usuarios', element: <UsersPage />
    ],
  },

  // error handling routes
  {
    path: '/404',
    element: <NotFound />,
  },
  {
    path: '*',
    element: <Navigate to="/404" replace />,
  },
]);