import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import AuthPage from './pages/AuthPage';
import BookingsPage from './pages/BookingsPage';
import EventsPage from './pages/EventsPage';
import MainNavigation from './components/Navigation/MainNavigation';
import AuthContext from './context/auth-context';
import PrivateRoute from './components/Routes/PrivateRoute';
import PublicRoute from './components/Routes/PublicRoute';

import './App.css';

const App = () => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const login = (token, userId) => {
    setToken(token);
    setUserId(userId);
  };

  const logout = () => {
    setToken(null);
    setUserId(null);
  };

  const isLoggedIn = !!token;

  return (
    <AuthContext.Provider value={{ token, userId, login, logout }}>
      <BrowserRouter>
        <MainNavigation />
        <main className="main-content">
          <Routes>
            {/* Public Auth Page */}
            <Route
              path="/auth"
              element={
                <PublicRoute>
                  <AuthPage />
                </PublicRoute>
              }
            />

            {/* Public Events Page */}
            <Route path="/events" element={<EventsPage />} />

            {/* Protected Bookings Page */}
            <Route
              path="/bookings"
              element={
                <PrivateRoute>
                  <BookingsPage />
                </PrivateRoute>
              }
            />

            {/* Catch-all Redirect */}
            <Route
              path="*"
              element={<Navigate to={isLoggedIn ? '/events' : '/auth'} replace />}
            />
          </Routes>
        </main>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;
