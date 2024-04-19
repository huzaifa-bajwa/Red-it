import React, { useState, useEffect } from 'react';
import './presentation.css';

function Presentation() {
    const [fontSize, setFontSize] = useState(14); 
    const [fontSize2, setFontSize2] = useState(16); 
    const [flashcards, setFlashcards] = useState([]);
    const [currentUrl, setCurrentUrl] = useState("");

    const increaseFontSize = () => {
        setFontSize(prevFontSize => prevFontSize + 1); 
        setFontSize2(prevFontSize => prevFontSize + 1); 
    };

    const decreaseFontSize = () => {
        setFontSize(prevFontSize => (prevFontSize > 1 ? prevFontSize - 1 : prevFontSize)); 
        setFontSize2(prevFontSize => (prevFontSize > 1 ? prevFontSize - 1 : prevFontSize)); 
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
                fetch("http://127.0.0.1:8000/presentation/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        url: url,
                        email:email,
                    }),
                })
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error("Network response was not ok");
                        }
                        return response.json();
                    })
                    .then((data) => {
                        console.log(data.presentation);
                        // setFlashcards(data.flashcards);
                        const parsedData = parsedata(data.presentation);
                        console.log(parsedData);
                        setFlashcards(parsedData);
                    })
                    .catch((error) => {
                        console.error("Error fetching presentation content: " + error);
                    });
            })
            .catch((error) => {
                console.error("Error fetching current tab URL: " + error);
            });
    }, []);

    const parsedata = (arr) => {
        return arr.map(str => {
            const splitIndex = str.indexOf(":");
            return {
                title: str.substring(0, splitIndex),
                content: str.substring(splitIndex + 2)
            };
        });
    };

    const cardStyle = {
        fontSize: `${fontSize}px` 
    };
    const titleStyle = {
        fontSize: `${fontSize2}px` 
    };

    return (
        <div className="bdy5">
            <div className="content-box5">
                <div className="header5">
                    <span className="title5">Presentation Content</span>
                    <span className="font-adjusters">
                        <button className="font-decrease" onClick={decreaseFontSize}>A-</button>
                        <button className="font-increase" onClick={increaseFontSize}>A+</button>
                    </span>
                </div>
                <div className="card-grid">
                    {flashcards.map((flashcard, index) => (
                        <div className="card" key={index}>
                            <span style={titleStyle} className="title">{flashcard.title || "No Title"}</span>
                            <p style={cardStyle}>{flashcard.content || "No Content"}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Presentation;
