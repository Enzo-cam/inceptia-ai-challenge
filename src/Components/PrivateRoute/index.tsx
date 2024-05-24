import React, { ReactElement, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
    children: ReactNode;
    isAuthenticated: boolean;
}

/**
 * Componente `PrivateRoute` que encapsula rutas protegidas.
 * Este componente evalúa si el usuario está autenticado; si no lo está,
 * redirige al usuario a la página de inicio de sesión.
 * Si el usuario está autenticado, muestra el contenido del componente hijo.
 *
 * @param {ReactNode} children - Componentes hijos que son renderizados si el usuario está autenticado.
 * @param {boolean} isAuthenticated - Estado que indica si el usuario está autenticado o no.
 * @returns {ReactElement} - Redirige al usuario o muestra los componentes hijos según la autenticación.
 */

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, isAuthenticated }) => {
    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    
    return <>{children}</>;  
    
};

export default PrivateRoute;
