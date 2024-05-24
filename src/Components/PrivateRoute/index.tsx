import React, { ReactElement, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
    children: ReactNode;
    isAuthenticated: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, isAuthenticated }) => {
    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    // Asegúrate de que children siempre es tratado como un elemento React
    // Esto es solo necesario si children puede no ser un ReactElement
    return <>{children}</>;  // Utiliza React Fragments para asegurar que el tipo es correcto
};

export default PrivateRoute;
