import React, { useState, useEffect } from "react";
import "./history.css";

function History() {
    const [fontSize, setFontSize] = useState(14);
    const [fontSize2, setFontSize2] = useState(16); 
    const [content, setContent] = useState([]); 
    const [contentType, setContentType] = useState(""); 
    const [summaryIndex, setSummaryIndex] = useState(0);
    const [contentArray, setContentArray] = useState([]);
    const [typeArray, setTypeArray] = useState([]);


    useEffect(() => {
        const email = localStorage.getItem('userEmail');
        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/history/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email }),
                });
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                console.log('History loaded successfully:', data.history);
                // Parse the content based on type
                setContentArray(data.history[0]);
                setTypeArray(data.history[1]);
                const [contentArraytemp, typeArraytemp] = data.history;

                console.log('Content Array:', contentArray);
                console.log('Type Array:', typeArray);
                if (typeArraytemp[0] === "summary") {
                    setContentType(typeArraytemp[0]);
                    setContent(contentArraytemp[0]);
                } else {
                    setContent(parseData(contentArraytemp[0]));
                    setContentType(typeArraytemp[0]);
                }
            } catch (error) {
                console.error("Error fetching History:", error);
                setContent([{ title: "Error", content: "Error loading History" }]);
            }
        };
    
        fetchData();
    }, []);

    const increaseFontSize = () => {
        setFontSize((prevFontSize) => prevFontSize + 1);
        setFontSize2(prevFontSize => prevFontSize + 1); // Increase font size by 1
    };

    const decreaseFontSize = () => {
        setFontSize((prevFontSize) => Math.max(1, prevFontSize - 1));
        setFontSize2(prevFontSize => (prevFontSize > 1 ? prevFontSize - 1 : prevFontSize)); // Decrease font size by 1, but never below 1
    };

    const cardStyle = {
        fontSize: `${fontSize}px` // Set font size dynamically
    };
    const titleStyle = {
        fontSize: `${fontSize2}px` // Set font size dynamically
    };

    const nextContent = () => {
        const nextIndex = (summaryIndex + 1) % contentArray.length;
        setSummaryIndex(nextIndex);
        setContentType(typeArray[nextIndex]);
        const nextContentData = contentArray[nextIndex];
        if (typeArray[nextIndex] === "summary") {
            setContent(nextContentData);
        } else {
            setContent(parseData(nextContentData));
        }
    };

    const previousContent = () => {
        const prevIndex = (summaryIndex - 1 + contentArray.length) % contentArray.length;
        setSummaryIndex(prevIndex);
        setContentType(typeArray[prevIndex]);
        const prevContentData = contentArray[prevIndex];
        if (typeArray[prevIndex] === "summary") {
            setContent(prevContentData);
        } else {
            setContent(parseData(prevContentData));
        }
    };

    const parseData = (arr) => {
        return arr.map(str => {
            const splitIndex = str.indexOf(":");
            return {
                title: str.substring(0, splitIndex),
                content: str.substring(splitIndex + 2)
            };
        });
    };

    return (
        <div className="main3">
            <div className="bdy3">
                <div className="content-box3">
                    <div className="header3">
                        <span className="title3">{contentType ? contentType.toUpperCase() : ''}</span>
                        <span className="font-adjusters">
                            <button className="font-decrease" onClick={decreaseFontSize}>
                                A-
                            </button>
                            <button className="font-increase" onClick={increaseFontSize}>
                                A+
                            </button>
                        </span>
                    </div>
                    <div className="summary-container3">
                        {/* Render content based on type */}
                        {contentType === "summary" ? (
                            <p className="summary-text3" style={{ fontSize: `${fontSize}px` }}>
                                {content}
                            </p>
                        ) : (
                            <div className="card-grid">
                                {content.map((item, index) => (
                                    <div className="card" key={index}>
                                        <span style={titleStyle} className="title">{item.title || "No Title"}</span>
                                        <p style={cardStyle}>{item.content || "No Content"}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="navigation-buttons">
                        <button onClick={previousContent}>Previous</button>
                        <button onClick={nextContent}>Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default History;
