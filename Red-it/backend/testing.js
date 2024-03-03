//const fetch = require('node-fetch');

async function loginUser(email, password) {
    const fetch = (await import('node-fetch')).default;
    try {
      const response = await fetch('http://127.0.0.1:8000/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
  
      if (response.ok) {
        const data = await response.json(); // User verified successfully
        console.log('Login successful:', data);
        // Proceed with user login flow
      } else {
        const errorData = await response.json();
        console.error('Login error:', errorData.detail);
        // Handle login error (e.g., show error message)
      }
    } catch (error) {
      console.error('Network or fetch error:', error.message);
    }
  }


  async function createUser(username, email, password) {
    // Dynamically import 'node-fetch' to use it in a CommonJS module or ensure your environment supports fetch natively
    const fetch = (await import('node-fetch')).default;
    try {
      const response = await fetch('http://127.0.0.1:8000/newuser/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      });
  
      if (response.ok) {
        const data = await response.json(); // User created successfully
        console.log('User creation successful:', data);
        // Proceed with any post-user creation flow
      } else {
        const errorData = await response.json();
        console.error('User creation error:', errorData.detail);
        // Handle user creation error (e.g., show error message)
      }
    } catch (error) {
      console.error('Network or fetch error:', error.message);
    }
}

async function generateSummary(data, language) {
  // Assuming you have `fetch` available in your environment or you have dynamically imported `node-fetch` in a Node.js environment
  const fetch = (await import('node-fetch')).default; // Remove this line if using in a browser environment where fetch is globally available
  try {
      const response = await fetch('http://127.0.0.1:8000/summary/', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              data: data,   // Assuming `data` is the input data for which you want to generate a summary. It should be in string
              language: language,  // Assuming `language` is the language in which the summary should be generated. It should be in string
          }),
      });

      if (response.ok) {
          const summary = await response.json(); // Assuming the server responds with JSON containing the summary
          console.log('Summary generated successfully:', summary.summary); //summary.summary is the generated summary
          // You can now use the summary for further processing or display
      } else {
          const errorData = await response.json();
          console.error('Error generating summary:', errorData.detail);
          // Handle error (e.g., display error message to the user)
      }
  } catch (error) {
      console.error('Network or fetch error:', error.message);
  }
}

async function generateFlashcards(data, language) {
  // Assuming you have `fetch` available in your environment or you have dynamically imported `node-fetch` in a Node.js environment
  const fetch = (await import('node-fetch')).default; // Remove this line if using in a browser environment where fetch is globally available
  try {
      const response = await fetch('http://127.0.0.1:8000/flashcard/', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              data: data,
              language: language, // Include this only if your backend expects a language parameter for flashcards
          }),
      });

      if (response.ok) {
          const flashcards = await response.json(); // Assuming the server responds with JSON containing the flashcards
          console.log('Flashcards generated successfully:', flashcards.flashcards); //flashcards.flashcards is the array of flashcards
          // You can now use the flashcards for further processing or display
      } else {
          const errorData = await response.json();
          console.error('Error generating flashcards:', errorData.detail);
          // Handle error (e.g., display error message to the user)
      }
  } catch (error) {
      console.error('Network or fetch error:', error.message);
  }
}




  // Example usage
loginUser('24100249@lums.edu.pk', 'mypassword');

//createUser("SyedKabir", "avc", "def")

const webpage_data = "Astronomy is a natural science that studies celestial objects and the phenomena that occur in the cosmos. It uses mathematics, physics, and chemistry in order to explain their origin and their overall evolution. Objects of interest include planets, moons, stars, nebulae, galaxies, meteoroids, asteroids, and comets. Relevant phenomena include supernova explosions, gamma ray bursts, quasars, blazars, pulsars, and cosmic microwave background radiation. More generally, astronomy studies everything that originates beyond Earth's atmosphere. Cosmology is a branch of astronomy that studies the universe as a whole.  Astronomy is one of the oldest natural sciences. The early civilizations in recorded history made methodical observations of the night sky. These include the Egyptians, Babylonians, Greeks, Indians, Chinese, Maya, and many ancient indigenous peoples of the Americas. In the past, astronomy included disciplines as diverse as astrometry, celestial navigation, observational astronomy, and the making of calendars. Professional astronomy is split into observational and theoretical branches. Observational astronomy is focused on acquiring data from observations of astronomical objects. This data is then analyzed using basic principles of physics. Theoretical astronomy is oriented toward the development of computer or analytical models to describe astronomical objects and phenomena. These two fields complement each other. Theoretical astronomy seeks to explain observational results and observations are used to confirm theoretical results. Astronomy is one of the few sciences in which amateurs play an active role. This is especially true for the discovery and observation of transient events. Amateur astronomers have helped with many important discoveries, such as finding new comets." 

// generateFlashcards(webpage_data, "English")