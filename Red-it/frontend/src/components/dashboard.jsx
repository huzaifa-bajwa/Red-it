import React, { useState } from "react";
import "./dashboard.css";
import Summary from './summary.jsx';
import FlashCards from "./flashcards.jsx";
import LoginSignup from './loginSignup';


function Dashboard({ onLogout }) {
    const [func, setFunc] = useState('Default');
    const [loggedIn, setLoggedIn] = useState(true);


    // Improved handleClick function that takes an argument
    function handleClick(fun) {
        setFunc(fun);
    }

    const handleLogout = () => {
        // Call the onLogout function passed from parent component
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

    // Render different components based on `func` state
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
        case 'Summary':
            return <Summary />;
        case 'Flashcards':
            return <FlashCards />;
        // Add cases for 'Flashcards', 'Presentation', 'History' as needed
        default:
            // It's a good practice to have a default case that returns null or a default component
            return null;
    }
    // return (
    //     <div class="dashboard">
    //         <div class="content-box">
    //             <div class="header">
    //                 <span class="title">DASHBOARD</span>
    //                 <button class="logout-button" onClick="handleLogout()">
    //                     Logout
    //                 </button>
    //             </div>
    //             <div class="summary-container">
    //                 <div class="button-container">
    //                     <button class="dashboard-button" onClick={() => handleClick('Summary')}>Summary</button>
    //                     <button class="dashboard-button" onClick={() => handleClick('Flashcards')}>Flashcards</button>
    //                     <button class="dashboard-button" onClick={() => handleClick('Presentation')}>Presentation</button>
    //                     <button class="dashboard-button" onClick={() => handleClick('History')}>History</button>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // );
}

export default Dashboard;

// import React, { useState } from "react";
// import "./dashboard.css";
// import Summary from './summary.jsx';
// import FlashCards from "./flashcards.jsx";
// import LoginSignup from './loginSignup';

// function Dashboard({ onLogout }) {
//     const [func, setFunc] = useState('Default');
//     const [loggedIn, setLoggedIn] = useState(true);
//     const [selectedLanguage, setSelectedLanguage] = useState('English');

//     // Function to handle language selection
//     const handleLanguageChange = (language) => {
//         setSelectedLanguage(language);
//     };

//     // Improved handleClick function that takes an argument
//     function handleClick(fun) {
//         setFunc(fun);
//     }

//     const handleLogout = () => {
//         // Call the onLogout function passed from parent component
//         if (typeof onLogout === 'function') {
//             onLogout();
//             setLoggedIn(false);
//         }
//     };

//     if (!loggedIn) {
//         return (
//             <LoginSignup />
//         );
//     }

//     // Render different components based on `func` state and selected language
//     switch (func) {
//         case 'Default':
//             return (
//                 <div className="dashboard">
//                     <div className="header-box">
//                         <div className="head">
//                             <span className="heading">DASHBOARD</span>
//                             <button className="logout-button" onClick={handleLogout}>
//                                 Logout
//                             </button>
//                         </div>
//                         <div className="btns-container">
//                         <div className="language-info">Please Select Language for Summaries and Flash Cards</div>
//                             <div className="language-select">
//                                 <select value={selectedLanguage} onChange={(e) => handleLanguageChange(e.target.value)}>
//                                     <option value="English">English</option>
//                                     <option value="Spanish">Spanish</option>
//                                     {/* Add more language options as needed */}
//                                 </select>
//                             </div>
//                             <div className="button-container">
//                                 <button className="dashboard-button" onClick={() => handleClick('Summary')}>Summary</button>
//                                 <button className="dashboard-button" onClick={() => handleClick('Flashcards')}>Flashcards</button>
//                                 <button className="dashboard-button" onClick={() => handleClick('Presentation')}>Presentation</button>
//                                 <button className="dashboard-button" onClick={() => handleClick('History')}>History</button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             );
//         case 'Summary':
//             return <Summary language={selectedLanguage} />;
//         case 'Flashcards':
//             return <FlashCards language={selectedLanguage} />;
//         // Add cases for 'Presentation', 'History' as needed
//         default:
//             // It's a good practice to have a default case that returns null or a default component
//             return null;
//     }
// }

// export default Dashboard;
