import React from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import isEmpty from "lodash/isEmpty";
import Login from "./pages/Login";
import Reports from "./pages/Reports";
import PrivateRoute from "./Components/PrivateRoute";
import { RootState } from "./redux/store";



const App: React.FC = () => {
  const { token } = useSelector((state: RootState) => state.user);
  /** Evalúa si el usuario está autenticado basándose en la presencia de un token.*/
  const isAuthenticated = !isEmpty(token);

  return (
    /**
     * Define las rutas de la aplicación. La ruta raíz ("/") dirige al componente Login.
     * La ruta "/reports" es una ruta protegida que solo se muestra si el usuario está autenticado
    */
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/reports" element={
          <PrivateRoute isAuthenticated={isAuthenticated}>
            <Reports />
          </PrivateRoute>
        } />
      </Routes>
    </div>
  );
};

export default App;