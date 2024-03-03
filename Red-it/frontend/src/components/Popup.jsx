// import React from 'react';
import React, { useState } from 'react';

import './popup.css';


function Popup() {
  const [language, setLanguage] = useState("Please Select your language"); // Initial font size

  const handleLanguageChange = (newLanguage) => () => {
    setLanguage(newLanguage);
  };
  return (
    <div class="dropdown">
      <button class="dropbtn">{language}</button>
      <div class="dropdown-content">
        <a onClick={handleLanguageChange("English")}>English</a>
        <a onClick={handleLanguageChange("Urdu")}>Urdu</a>
        <a onClick={handleLanguageChange("Arabic")}>Arabic</a>
        <a onClick={handleLanguageChange("Hindi")}>Hindi</a>
      </div>
    </div>
  );
}

export default Popup;
