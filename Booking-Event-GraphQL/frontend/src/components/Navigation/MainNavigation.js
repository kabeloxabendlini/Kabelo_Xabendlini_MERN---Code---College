import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import AuthContext from '../../context/auth-context';
import './MainNavigation.css';

const MainNavigation = () => {
  const { token, logout } = useContext(AuthContext);

  return (
    <header className="main-navigation">
      <div className="main-navigation__logo">
        <h1>EasyEvent</h1>
      </div>
      <nav className="main-navigation__items">
        <ul>
          {!token && (
            <li>
              <NavLink to="/auth" className={({ isActive }) => (isActive ? 'active' : '')}>
                Authenticate
              </NavLink>
            </li>
          )}
          <li>
            <NavLink to="/events" className={({ isActive }) => (isActive ? 'active' : '')}>
              Events
            </NavLink>
          </li>
          {token && (
            <>
              <li>
                <NavLink to="/bookings" className={({ isActive }) => (isActive ? 'active' : '')}>
                  Bookings
                </NavLink>
              </li>
              <li>
                <button onClick={logout}>Logout</button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
