import React from "react";
import { Helmet } from "react-helmet";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.js';
import ProtectedRoute from "./context/ProtectedRoute.jsx"; 

// Screens
import Landing from "./screens/Landing.jsx";
import Login from "./screens/Auth/Login.jsx";
import Register from "./screens/Auth/Register.jsx";
import Dashboard from "./screens/Dashboard.jsx";
import EmailVerification from './screens/Auth/EmailVerification';
import EmailConfirmation from './screens/Auth/EmailConfirmation.jsx';

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Helmet>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link href="https://fonts.googleapis.com/css2?family=Khula:wght@400;600;800&display=swap" rel="stylesheet" />
        </Helmet>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-email/:token" element={<EmailVerification />} />
          <Route path="/confirm-email/:token" element={<EmailConfirmation />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}



