import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { router } from './routes/AppRoutes';
import esES from 'antd/locale/es_ES';

const App: React.FC = () => {
    return (
        <ConfigProvider
            locale={esES}
            theme={{
                token: {
                    colorBgBase: '#f5f5f5',       // Fondo general gris claro
                    colorBgContainer: '#ffffff',  // Tarjetas y tablas en blanco puro
                    colorTextBase: '#262626',     // Texto oscuro para contraste
                    colorPrimary: '#595959'       // Detalles y botones en gris oscuro
                }
            }}
        >
            <RouterProvider router={router} />
        </ConfigProvider>
    );
};

export default App;