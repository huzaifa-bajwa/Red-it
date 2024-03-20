import React, { useState, useEffect } from "react";
import "./summary.css";

function Summary() {
  const [fontSize, setFontSize] = useState(14);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentUrl, setCurrentUrl] = useState("");

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
        setCurrentUrl(url);
        // Now fetch the summary for this URL using a POST request
        fetch("http://127.0.0.1:8000/summary/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            language: "english", // Default language set to English
            url: url, // Sending the current tab's URL
          }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            setSummary(data.summary); // Assume the server returns JSON with a summary field
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching summary: " + error);
            setLoading(false);
          });
      })
      .catch((error) => {
        console.error("Error fetching current tab URL: " + error);
        setLoading(false);
      });
  }, []);

  // useEffect(() => {
  //     const fetchSummary = async () => {
  //         const story = `
  //     Once upon a time, in the quaint village of Quixtonia, nestled amidst rolling hills and whispering forests, there lived a peculiar character known as Professor Pendergast. Professor Pendergast wasn't your ordinary academic; he was a renowned eccentric inventor with a penchant for concocting the most fantastical gadgets the world had ever seen.

  //     His laboratory, a ramshackle structure at the edge of town, was a spectacle to behold. Steam-powered contraptions whirred and clanked, emitting curious noises that echoed through the valley. Villagers whispered tales of mysterious experiments and strange occurrences emanating from the Professor's abode, fueling both fascination and fear.

  //     One stormy night, as lightning danced across the sky and thunder roared like an angry beast, a peculiar event unfolded in Quixtonia. It began with a peculiar glow emanating from Professor Pendergast's laboratory, casting an eerie light that bathed the village in an otherworldly aura.

  //     Curiosity piqued, the villagers gathered at the laboratory's doorstep, their faces illuminated by the strange radiance. With bated breath, they watched as the laboratory door creaked open, revealing Professor Pendergast himself, clad in a coat covered in soot and wielding a contraption that resembled a cross between a telescope and a toaster.

  //     With a mad gleam in his eyes, the Professor proclaimed that he had discovered the key to unlocking the secrets of the universe—a device capable of traversing through time and space itself. The villagers gasped in awe and disbelief, unsure whether to applaud or flee in terror.

  //     Undeterred by their reactions, Professor Pendergast activated his invention with a dramatic flourish, sending sparks flying and gears whirring into motion. A vortex of swirling energy engulfed the laboratory, drawing the intrepid inventor and his contraption into its depths.

  //     As the villagers looked on in astonishment, the laboratory vanished without a trace, leaving behind only whispers of a fantastical journey beyond the realms of comprehension.

  //     And so, the legend of Professor Pendergast and his time-traveling escapades became etched into the annals of Quixtonia's history, a testament to the boundless imagination and unyielding spirit of one eccentric inventor and the curious village that dared to dream alongside him.
  //     `;

  //         try {
  //             const language = "Insert language here";
  //             const response = await fetch('http://127.0.0.1:8000/summary/', {
  //                 method: 'POST',
  //                 headers: {
  //                     'Content-Type': 'application/json',
  //                 },
  //                 body: JSON.stringify({
  //                     data: story,
  //                     language: language,
  //                 }),
  //             });

  //             if (response.ok) {
  //                 const summaryData = await response.json();
  //                 console.log('Summary data:', summaryData); // Log the summary data
  //                 setSummary(summaryData.summary);
  //                 setLoading(false); // Set loading to false after setting summary
  //             } else {
  //                 const errorData = await response.json();
  //                 console.error('Error generating summary:', errorData.detail);
  //                 setLoading(false); // Ensure loading is set to false in case of error
  //             }
  //         } catch (error) {
  //             console.error('Network or fetch error:', error.message);
  //             setLoading(false); // Ensure loading is set to false in case of error
  //         }
  //     };

  //     fetchSummary();
  // }, []);

  // const generateSummary = async (data) => {
  //     try {
  //         const language = "Insert language here";
  //         const response = await fetch('http://127.0.0.1:8000/summary/', {
  //             method: 'POST',
  //             headers: {
  //                 'Content-Type': 'application/json',
  //             },
  //             body: JSON.stringify({
  //                 data: data,
  //                 language: language,
  //             }),
  //         });

  //         if (response.ok) {
  //             const summaryData = await response.json();
  //             setSummary(summaryData.summary);
  //         } else {
  //             const errorData = await response.json();
  //             console.error('Error generating summary:', errorData.detail);
  //         }
  //     } catch (error) {
  //         console.error('Network or fetch error:', error.message);
  //     }
  // };

  const increaseFontSize = () => {
    setFontSize((prevFontSize) => prevFontSize + 1);
  };

  const decreaseFontSize = () => {
    setFontSize((prevFontSize) =>
      prevFontSize > 1 ? prevFontSize - 1 : prevFontSize
    );
  };

  return (
    <div className="bdy">
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
  );
}

export default Summary;
