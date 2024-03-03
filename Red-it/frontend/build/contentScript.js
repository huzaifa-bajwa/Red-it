console.log("Content script loaded");

// Extract text from the webpage
const extractedText = document.body.innerText;

// Send the extracted text to the background script
chrome.runtime.sendMessage({ type: "EXTRACTED_TEXT", text: extractedText });