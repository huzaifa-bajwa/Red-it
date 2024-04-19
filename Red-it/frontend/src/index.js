import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Popup from './components/Popup.jsx';
import Summary from './components/summary.jsx';
import LoginSignup from './components/loginSignup.jsx';
import FlashCards from './components/flashcards.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

