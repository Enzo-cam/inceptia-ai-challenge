// Importaciones necesarias
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
  const isAuthenticated = !isEmpty(token);

  return (
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