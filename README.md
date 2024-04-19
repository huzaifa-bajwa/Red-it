# Red-it

## Description

This web extension is designed to enhance your browsing experience by providing quick, concise summaries of web content. Perfect for researchers, students, or anyone looking to digest information efficiently, it offers a streamlined way to grasp the essence of web pages without reading through all the details. Features include a user-friendly interface for easy summarization, login/signup functionality for personalized experiences, flashcards for memorizing important information, Content for quickly preparing presentation slides and a history feature to keep track of last few requests. The extension also offers a range of languages to choose from for Flashcards and summaries.

## Installation Instructions

1. Clone the repository to your local machine using `git clone [repository-url]`.
2. Navigate to the extension management page in your browser (usually found at `chrome://extensions` for Chrome or `about:addons` for Firefox).
3. Enable Developer Mode (for Chrome) or enter Debugging mode (for Firefox).
4. Select the build folder from the frontend directory.
5. The extension should now be installed and visible in your browser's extension toolbar.

## Usage

### Summarizing Content

To quickly understand the main points of any article or web page, use the summarization feature:

1. Click on the extension icon in your browser's toolbar.
2. Select "Summarize" from the menu.
3. The extension will then process the content of the current page and display a simplified summary, allowing you to grasp the essential information without reading the entire text.

### Login/Signup

For a personalized experience and the ability to save your preferences and flashcards, utilize the login/signup feature:

1. Click on the extension icon in your browser's toolbar.
2. Choose "Login/Signup" from the menu.
3. You'll be prompted to either enter your existing credentials to log in or fill out a registration form to create a new account.

### Dashboard

For a personalized experience and the ability to generate summaries, presentation content and flashcards, utilize the dashboard buttons:

1. Click on the respective button and wait for the magic to occur.
   
### Creating Flashcards

Enhance your learning and retention by creating flashcards from summarized content:

1. After summarizing content, select the "Create Flashcard" option.
2. A user-friendly interface will appear, allowing you to customize the flashcard with key points from the summary.
3. Once customized, save the flashcard for later review.

## History Feature
1. Keep track of the summaries and flashcards created over time.
2. Use history from the dashboard to view, manage, and revisit past summaries.

## Presentation Feature
1. Transform webpage summaries into presentation content for quickly preparing slides.

## Frontend Components

- **Summary.jsx**: Component responsible for generating summaries.
- **LoginSignup.jsx**: Component managing the authentication process.
- **Flashcards.jsx**: Component allowing users to create digital flashcards.
- **Popup.jsx**: Main interface for accessing extension features.
- **Presentation.jsx**: Allows users to create presentation content from webpages.
- **History.jsx**: Provides a log of past activities and summaries.

## Backend

The backend folder contains files implementing the backend of the extension:

- **database.py**: Handles database operations using MongoDB.
- **model.py**: Defines data models for request validation.
- **interactionwithGPT.py**: Interacts with OpenAI GPT-3.5 API.
- **server.py**: Sets up and runs the FastAPI application.
- **testing.js**: Suite for testing backend functionalities.
- **requirements.txt**: Lists backend dependencies.
