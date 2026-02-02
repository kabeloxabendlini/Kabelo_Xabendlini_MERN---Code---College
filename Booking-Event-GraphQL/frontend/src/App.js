import React, { Component } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import AuthPage from './pages/AuthPage';
import BookingsPage from './pages/BookingsPage';
import EventsPage from './pages/EventsPage';
import MainNavigation from './components/Navigation/MainNavigation';
import AuthContext from './context/auth-context';

import './App.css';

class App extends Component {
  state = {
    token: null,
    userId: null
  };

  login = (token, userId, tokenExpiration) => {
    this.setState({ token: token, userId: userId });
  };

  logout = () => {
    this.setState({ token: null, userId: null });
  };

  render() {
    return (
      <BrowserRouter>
        <AuthContext.Provider
          value={{
            token: this.state.token,
            userId: this.state.userId,
            login: this.login,
            logout: this.logout
          }}
        >
          <MainNavigation />
          <main className="main-content">
            <Routes>
              {this.state.token && (
                <Route path="/" element={<Navigate to="/events" replace />} />
              )}

              {!this.state.token && (
                <Route path="/auth" element={<AuthPage />} />
              )}

              {this.state.token && (
                <Route path="/auth" element={<Navigate to="/events" replace />} />
              )}

              <Route path="/events" element={<EventsPage />} />

              {this.state.token && (
                <Route path="/bookings" element={<BookingsPage />} />
              )}

              {!this.state.token && (
                <Route path="*" element={<Navigate to="/auth" replace />} />
              )}
            </Routes>
          </main>
        </AuthContext.Provider>
      </BrowserRouter>
    );
  }
}

export default App;
