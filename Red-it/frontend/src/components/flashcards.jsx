import React, { useState, useEffect, useRef } from 'react';
import './flashcards.css';

function FlashCards() {
    const [fontSize, setFontSize] = useState(14); 
    const [fontSize2, setFontSize2] = useState(16);
    const [flashcards, setFlashcards] = useState([]);
    const [currentUrl, setCurrentUrl] = useState("");
    const [language, setLanguage] = useState("Change Language");
    const prevLanguageRef = useRef("");
    const prevFlashCards = useRef("");

    const handleLanguageChange = (newLanguage) => () => {
        if (flashcards.length === 0) {
            alert("Please wait for flashcards to generate");
        } else {
            prevLanguageRef.current = language;
            setLanguage(newLanguage);
            setFlashcards([]);
        }
    };

    const increaseFontSize = () => {
        setFontSize(prevFontSize => prevFontSize + 1);
        setFontSize2(prevFontSize => prevFontSize + 1);
    };

    const decreaseFontSize = () => {
        setFontSize(prevFontSize => (prevFontSize > 8 ? prevFontSize - 1 : prevFontSize));
        setFontSize2(prevFontSize => (prevFontSize > 10 ? prevFontSize - 1 : prevFontSize));
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
                setCurrentUrl(url);
                fetch("http://127.0.0.1:8000/flashcard/", {
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
                        prevFlashCards.current = data.flashcards;
                        const parsedData = parsedata(data.flashcards);
                        setFlashcards(parsedData);
                    })
                    .catch((error) => {
                        console.error("Error fetching flashcards: " + error);
                    });
            })
            .catch((error) => {
                console.error("Error fetching current tab URL: " + error);
            });
    }, []);

    useEffect(() => {
        if (prevLanguageRef.current !== "" && prevLanguageRef.current !== language) {
            fetchCurrentTabUrl()
                .then((url) => {
                    const email = localStorage.getItem('userEmail');
                    setCurrentUrl(url);
                    fetch("http://127.0.0.1:8000/translateflashcard/", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            from_language: prevLanguageRef.current === "Change Language" ? "english" : prevLanguageRef.current.toLowerCase(),
                            to_language: language.toLowerCase(),
                            text: prevFlashCards.current,
                        }),
                    })
                        .then((response) => {
                            if (!response.ok) {
                                throw new Error("Network response was not ok");
                            }
                            return response.json();
                        })
                        .then((translation) => {
                            const parsedData = parsedata(translation.translation);
                            setFlashcards(parsedData);
                        })
                        .catch((error) => {
                            console.error("Error fetching flashcards translation: " + error);
                        });
                })
                .catch((error) => {
                    console.error("Error fetching current tab URL: " + error);
                });
        }
    }, [language]);

    const parsedata = (arr) => {
        return arr.map(str => {
            const splitIndex = str.indexOf(":");
            return {
                title: str.substring(0, splitIndex),
                content: str.substring(splitIndex + 2)
            };
        });
    };
    // Set font size dynamically
    const cardStyle = {
        fontSize: `${fontSize}px`
    };
    const titleStyle = {
        fontSize: `${fontSize2}px` 
    };
    return (
        <div className="bdy4">
            <div className="dropdown">
                <button className="dropbtn">{language}</button>
                <div className="dropdown-content">
                    <a onClick={handleLanguageChange("English")}>English</a>
                    <a onClick={handleLanguageChange("Urdu")}>Urdu</a>
                    <a onClick={handleLanguageChange("Arabic")}>Arabic</a>
                    <a onClick={handleLanguageChange("Hindi")}>Hindi</a>
                    <a onClick={handleLanguageChange("Chinese")}>Chinese</a>
                    <a onClick={handleLanguageChange("French")}>French</a>
                    <a onClick={handleLanguageChange("German")}>German</a>
                    <a onClick={handleLanguageChange("Italian")}>Italian</a>
                    <a onClick={handleLanguageChange("Japanese")}>Japanese</a>
                    <a onClick={handleLanguageChange("Korean")}>Korean</a>
                    <a onClick={handleLanguageChange("Russian")}>Russian</a>
                    <a onClick={handleLanguageChange("Spanish")}>Spanish</a>
                </div>
            </div>
            <div className="content-box4">
                <div className="header4">
                    <span className="title4">Flash Cards</span>
                    <span className="font-adjusters">
                        <button className="font-decrease" onClick={decreaseFontSize}>A-</button>
                        <button className="font-increase" onClick={increaseFontSize}>A+</button>
                    </span>
                </div>
                <div className="card-grid">
                    {flashcards.length === 0 ? (
                        <div className="loading-container">
                            <p>Loading...</p>
                        </div>
                    ) : (
                        flashcards.map((flashcard, index) => (
                            <div className="card" key={index}>
                                <span style={titleStyle} className="title">{flashcard.title || "No Title"}</span>
                                <p style={cardStyle}>{flashcard.content || "No Content"}</p>
                            </div>
                        ))
                    )}
                </div>

            </div>
        </div>
    );
}

export default FlashCards;
