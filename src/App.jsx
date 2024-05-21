// Importaciones necesarias
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import isEmpty from "lodash/isEmpty";
import Login from "./pages/Login";
import Reports from "./pages/Reports";
import PrivateRoute from "./Components/PrivRoute";

export default function App() {
  const { token } = useSelector((state) => state.user);
  const isAuthenticated = !isEmpty(token);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/reports"
          element={
            <PrivateRoute >
              <Reports />
            </PrivateRoute>
          }
        />

      </Routes>
    </div>
  );
}
