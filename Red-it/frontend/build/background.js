chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "EXTRACTED_TEXT") {
        // Store the extracted text in extension storage
        chrome.storage.local.set({ webtext: message.text });
    }
});
