import React, { useState, useEffect, useRef } from "react";
import "./summary.css";


function Summary() {
  const [fontSize, setFontSize] = useState(14);
  const [summary, setSummary] = useState("Loading...");
  const [currentUrl, setCurrentUrl] = useState("");
  const prevLanguageRef = useRef("");
  const prevSummary = useRef("");
  const [language, setLanguage] = useState("Change Language");

  const handleLanguageChange = (newLanguage) => () => {
    if (summary === "Loading...") {
      alert("Please wait for summary to generate");
    } else {
      prevLanguageRef.current = language;
      setLanguage(newLanguage);
      prevSummary.current = summary;
      setSummary("Loading...");
    }
  };
  

  function fetchCurrentTabUrl() {
    return new Promise((resolve, reject) => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (chrome.runtime.lastError) {
          reject(new Error(chrome.runtime.lastError.message));
        } else if (tabs.length === 0) {
          reject(new Error("No active tab found"));
        } else {
          console.log(tabs[0].url);
          resolve(tabs[0].url);
        }
      });
    });
  }

  useEffect(() => {
    fetchCurrentTabUrl()
      .then((url) => {
        const email = localStorage.getItem('userEmail');
        console.log(email);
        setCurrentUrl(url);
        fetch("http://127.0.0.1:8000/summary/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            language: language === "Change Language" ? "english" : language.toLowerCase(),
            url: url,
            email: email,
          }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            setSummary(data.summary);
          })
          .catch((error) => {
            console.error("Error fetching summary: " + error);
          });
      })
      .catch((error) => {
        console.error("Error fetching current tab URL: " + error);
      });
  }, []);


    useEffect(() => {
      if (prevLanguageRef.current!=="" && prevLanguageRef.current !== language) {
        console.log(prevLanguageRef.current,"   ",language);
          fetchCurrentTabUrl()
              .then((url) => {
                  setCurrentUrl(url);
                  fetch("http://127.0.0.1:8000/translatesummary", {
                      method: "POST",
                      headers: {
                          "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                          from_language: prevLanguageRef.current === "Change Language" ? "english" : prevLanguageRef.current.toLowerCase(),
                          to_language: language.toLowerCase(),
                          text: prevSummary.current,
                      }),
                  })
                      .then(response => response.json())
                      .then(translation => {
                          console.log(translation);
                          setSummary(translation.translation);
                          prevLanguageRef.current = language;  // Update the ref after successful translation
                      })
                      .catch(error => console.error("Error fetching translation: " + error));
              })
              .catch(error => console.error("Error fetching current tab URL: " + error));
      }
  }, [language]);


  const increaseFontSize = () => {
    setFontSize((prevFontSize) => prevFontSize + 1);
  };

  const decreaseFontSize = () => {
    setFontSize((prevFontSize) =>
      prevFontSize > 8 ? prevFontSize - 1 : prevFontSize
    );
  };

  return (
    // <div class="main">
      <div className="bdy">
        <div class="dropdown">
          <button class="dropbtn">{language}</button>
          <div class="dropdown-content">
            <a onClick={handleLanguageChange("English")}>English</a>
            <a onClick={handleLanguageChange("Urdu")}>Urdu</a>
            <a onClick={handleLanguageChange("Arabic")}>Arabic</a>
            <a onClick={handleLanguageChange("Hindi")}>Hindi</a>
            <a onClick={handleLanguageChange("Chinese")}>Chinese</a>
            <a onClick={handleLanguageChange("French")}>Frech</a>
            <a onClick={handleLanguageChange("German")}>German</a>
            <a onClick={handleLanguageChange("Italian")}>Italian</a>
            <a onClick={handleLanguageChange("Japanese")}>Japanese</a>
            <a onClick={handleLanguageChange("Korean")}>Korean</a>
            <a onClick={handleLanguageChange("Russian")}>Russian</a>
            <a onClick={handleLanguageChange("Spanish")}>Spanish</a>
          </div>
        </div>
        <div className="content-box">
          <div className="header">
            <span className="title">SUMMARY</span>
            <span className="font-adjusters">
              <button className="font-decrease" onClick={decreaseFontSize}>
                A-
              </button>
              <button className="font-increase" onClick={increaseFontSize}>
                A+
              </button>
            </span>
          </div>
          <div className="summary-container">
            <p className="summary-text" style={{ fontSize: `${fontSize}px` }}>
              {summary}
            </p>
          </div>
        </div>
      </div>
    // </div>
  );

}

export default Summary;
