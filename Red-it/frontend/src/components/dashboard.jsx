import React, { useState } from "react";
import "./dashboard.css";
import Summary from './summary.jsx';
import FlashCards from "./flashcards.jsx";
import LoginSignup from './loginSignup.jsx';
import History from "./history.jsx";
import Presentation from "./presentation.jsx";


function Dashboard({ onLogout }) {
    //states to store the current function and the login status
    const [func, setFunc] = useState('Default');
    const [loggedIn, setLoggedIn] = useState(true);

    // Function to handle the click event of the buttons
    function handleClick(fun) {
        setFunc(fun);
    }
    // Function to handle the logout event
    const handleLogout = () => {
        if (typeof onLogout === 'function') {
            onLogout();
            setLoggedIn(false);
        }
    };
    if (!loggedIn) {
        return (
            <LoginSignup />
        );
    }
    // The interface shows the summary, flashcards, history and presentation components based on the button clicked.
    switch (func) {
        case 'Default':
            return (
                <div class="dashboard">
                    <div class="header-box">
                        <div class="head">
                            <span class="heading">DASHBOARD</span>
                            <button class="logout-button" onClick={handleLogout}>
                                Logout
                            </button>
                        </div>
                        <div class="btns-container">
                            <div class="button-container">
                                
                                <button class="dashboard-button" onClick={() => handleClick('Summary')}>Summary</button>
                                <button class="dashboard-button" onClick={() => handleClick('Flashcards')}>Flashcards</button>
                                <button class="dashboard-button" onClick={() => handleClick('Presentation')}>Presentation</button>
                                <button class="dashboard-button" onClick={() => handleClick('History')}>History</button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        // The summary, flashcards, history and presentation components are rendered based on the button clicked.
        case 'Summary':
            return <Summary />;
        case 'Flashcards':
            return <FlashCards />;
        case 'History':
            return <History />;
        case 'Presentation':
            return <Presentation />;
        default:
            return null;
    }
}

export default Dashboard;
