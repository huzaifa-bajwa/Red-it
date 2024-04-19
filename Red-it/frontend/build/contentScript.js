function createPopup(text, event) {
  let popup = document.createElement("div");
  popup.textContent = text;
  popup.style.color = "white";
  popup.style.backgroundColor = "#df353d";
  popup.style.position = "fixed";
  popup.style.left = `${event.clientX}px`;
  popup.style.top = `${event.clientY + window.scrollY}px`;
  popup.style.zIndex = "1000";
  popup.style.padding = "5px";
  popup.style.border = "1px solid black";
  popup.style.borderRadius = "5px";
  popup.style.boxShadow = "0px 0px 8px rgba(0,0,0,0.5)";
  popup.style.width = "300px"; // Fixing the width

  // Adding a scroll button
  popup.style.overflowY = "auto";
  popup.style.maxHeight = "100px"; // Limiting the maximum height
  popup.style.scrollbarWidth = "thin"; // Adjust scrollbar width
  popup.style.scrollbarColor = "gray white"; // Adjust scrollbar color

  document.body.appendChild(popup);

  setTimeout(() => {
    popup.remove();
  }, 10000);
}

document.addEventListener("mouseup", async function (event) {
  let selectedText = window.getSelection().toString().trim();
  if (selectedText.length > 0) {
    // Check if selected text exceeds 200 words
    let wordCount = selectedText.split(/\s+/).length;
    if (wordCount > 200) {
      createPopup("Too much characters, can't process request", event);
    } else {
      try {
        const response = await fetch("http://localhost:8000/context/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            url: window.location.href,
            highlighted_text: selectedText,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          // Display context returned by backend
          console.log(data.context);
          createPopup(data.context, event);
        } else {
          const errorData = await response.json();
          alert("Error: " + errorData.detail);
        }
      } catch (error) {
        alert("Network or fetch error: " + error.message);
      }
    }
  }
});