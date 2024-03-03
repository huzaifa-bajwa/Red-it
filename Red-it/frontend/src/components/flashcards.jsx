import React, { useState, useEffect } from 'react';
import './flashcards.css';

function FlashCards() {
    const [fontSize, setFontSize] = useState(14); // Initial font size
    const [flashcards, setFlashcards] = useState([]);

    useEffect(() => {
        // Fetch flashcards when component mounts
        fetchFlashcards();
    }, []); // Empty dependency array ensures the effect runs only once when the component mounts

    const increaseFontSize = () => {
        setFontSize(prevFontSize => prevFontSize + 1); // Increase font size by 1
    };

    const decreaseFontSize = () => {
        setFontSize(prevFontSize => (prevFontSize > 1 ? prevFontSize - 1 : prevFontSize)); // Decrease font size by 1, but never below 1
    };

    const fetchFlashcards = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/flashcard/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    // data: data,
                    // language: language, // Include this only if your backend expects a language parameter for flashcards
                }),
            });

            if (response.ok) {
                const flashcardsData = await response.json();
                setFlashcards(flashcardsData.flashcards); // Update state with fetched flashcards
            } else {
                const errorData = await response.json();
                console.error('Error fetching flashcards:', errorData.detail);
            }
        } catch (error) {
            console.error('Network or fetch error:', error.message);
        }
    };

    const cardStyle = {
        fontSize: `${fontSize}px` // Set font size dynamically
    };

    return (
        <div className="bdy">
            <div className="content-box">
                <div className="header">
                    <span className="title">Flash Cards</span>
                    <span className="font-adjusters">
                        <button className="font-decrease" onClick={decreaseFontSize}>A-</button>
                        <button className="font-increase" onClick={increaseFontSize}>A+</button>
                    </span>
                </div>
                <div className="card-grid">
                    {flashcards.map((flashcard, index) => (
                        <div className="card" key={index}>
                            <span className="title">{flashcard.title}</span>
                            <p style={cardStyle}>{flashcard.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default FlashCards;
