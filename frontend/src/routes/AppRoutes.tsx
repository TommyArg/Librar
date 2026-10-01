import { createBrowserRouter, Navigate } from 'react-router-dom';
import { LoginPage } from '../pages/Login/LoginPage';
import { ProtectedRoute } from './ProtectedRoute';
import HomePage from '../pages/Home/HomePage';
import ProductsPage from '../pages/Products/ProductsPage';

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
      {
        path: '/products', // Ruta para tu ticket GL-19 y GL-21
        element: <ProductsPage />,
      }
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