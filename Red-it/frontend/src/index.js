import React from 'react';
import ReactDOM from 'react-dom';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Popup from './components/Popup.jsx';
import Summary from './components/summary.jsx';
import LoginSignup from './components/loginSignup.jsx';
import FlashCards from './components/flashcards.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <Popup /> */}
    {/* <FlashCards /> */}
    {/* <Summary /> */}
    <LoginSignup />
  </React.StrictMode>
);

