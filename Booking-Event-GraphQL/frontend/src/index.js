import React from 'react';
import ReactDOM from 'react-dom/client'; // ✅ note the '/client'
import './index.css';
import App from './App';

// Create a root and render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
