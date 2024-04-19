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
  
      } else {
        const errorData = await response.json();
        console.error('Login error:', errorData.detail);
  
      }
    } catch (error) {
      console.error('Network or fetch error:', error.message);
    }
  }
  
  
  async function createUser(username, email, password) {
  
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
  
      } else {
        const errorData = await response.json();
        console.error('User creation error:', errorData.detail);
  
      }
    } catch (error) {
      console.error('Network or fetch error:', error.message);
    }
  }
  
  async function generateSummary(url, language, email) {
  
  const fetch = (await import('node-fetch')).default; 
  try {
      const response = await fetch('http://127.0.0.1:8000/summary/', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              language: language, 
              url: url,
              email, email,
          }),
      });
  
      if (response.ok) {
          const summary = await response.json(); 
          console.log('Summary generated successfully:', summary.summary); //summary.summary is the generated summary
  
      } else {
          const errorData = await response.json();
          console.error('Error generating summary:', errorData.detail);
  
      }
  } catch (error) {
      console.error('Network or fetch error:', error.message);
  }
  }
  
  async function generateFlashcards(url, language, email) {
  
  const fetch = (await import('node-fetch')).default; 
  try {
      const response = await fetch('http://127.0.0.1:8000/flashcard/', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              language: language, 
              url: url,
              email: email,
          }),
      });
  
      if (response.ok) {
          const flashcards = await response.json(); 
          console.log('Flashcards generated successfully:', flashcards.flashcards); //flashcards.flashcards is the array of flashcards. Each element conatins the title of the flashcard followed by the content of the flashcard.  
  
      } else {
          const errorData = await response.json();
          console.error('Error generating flashcards:', errorData.detail);
  
      }
  } catch (error) {
      console.error('Network or fetch error:', error.message);
  }
  }
  
  async function generatePresentation(url, email) {
  
    const fetch = (await import('node-fetch')).default; 
    try {
        const response = await fetch('http://127.0.0.1:8000/presentation/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                url: url,
                email: email,
            }),
        });
    
        if (response.ok) {
            const presentation = await response.json(); // Assuming the server responds with JSON containing the flashcards
            console.log('Presentation generated successfully:', presentation.presentation); //presentation.presentation is the array where each element is a slide of the presentation. Each element starts with the title of the slide followed by the content of the slide. For example,
            /*
            [
              'Astronomy Overview:: is a natural science that explores celestial objects and cosmic phenomena, including planets, stars, galaxies, and more. It encompasses various branches like cosmology and planetary science, utilizing physics and chemistry to explain origins and evolution.',        
              'Historical Significance:: civilizations such as the Egyptians, Greeks, and Chinese made methodical observations of the night sky, contributing to the development of astronomy. Observational and theoretical branches of professional astronomy complement each other, with amateurs also playing an active role in discoveries.',
              'Cultural Context:: origins stem from the Greek term "ἀστρονομία," meaning "law of the stars." It should not be confused with astrology, which correlates celestial positions with human affairs. Astronomy and astrophysics are often used interchangeably, focusing on different aspects of celestial objects and phenomena.'
            ]
              */
  
        } else {
            const errorData = await response.json();
            console.error('Error generating Presentation:', errorData.detail);
  
        }
    } catch (error) {
        console.error('Network or fetch error:', error.message);
    }
    }
  
  
    async function getHistory(email) {
  
      const fetch = (await import('node-fetch')).default; 
      try {
          const response = await fetch('http://127.0.0.1:8000/history/', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  email: email,
              }),
          });
      
          if (response.ok) {
              const history = await response.json();
              console.log('Presentation generated successfully:', history.history); //history.history is a 2-d array where first 1-d array conatins content - summary, flashcard, and/or presentation (upto 3)- can second 1-d array tells which content is at the corresponding index in the first 1-d array. For example
              /*
              [
                [summary_content, flashcard_content, presentation_content],
                ["summary", "flashcard", "presentation"]
              ]
              */
  
          } else {
              const errorData = await response.json();
              console.error('Error generating Presentation:', errorData.detail);
  
          }
      } catch (error) {
          console.error('Network or fetch error:', error.message);
      }
      }
  
  
  
  
  async function contextQuery(url, highlighted_text) {
  
    const fetch = (await import('node-fetch')).default; 
    try {
        const response = await fetch('http://127.0.0.1:8000/context/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                url: url,
                highlighted_text: highlighted_text,
            }),
        });
    
        if (response.ok) {
            const context = await response.json();
            console.log('Presentation generated successfully:', context.context); //context.context contains the explanation 
  
        } else {
            const errorData = await response.json();
            console.error('Error generating Presentation:', errorData.detail);
        }
    } catch (error) {
        console.error('Network or fetch error:', error.message);
    }
    }
  
  
  
    async function translateSummary(from_language,to_language, text) {
  
      const fetch = (await import('node-fetch')).default; 
      try {
          const response = await fetch('http://127.0.0.1:8000/translatesummary/', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  from_language: from_language,
                  to_language: to_language,
                  text: text,
              }),
          });
      
          if (response.ok) {
              const translation = await response.json();
              console.log('Presentation generated successfully:', translation.translation);  
    
          } else {
              const errorData = await response.json();
              console.error('Error generating Presentation:', errorData.detail);
          }
      } catch (error) {
          console.error('Network or fetch error:', error.message);
      }
      }
  
      async function translateFlashcards(from_language, to_language,list_of_flashcards) {
  
        const fetch = (await import('node-fetch')).default; 
        try {
            const response = await fetch('http://127.0.0.1:8000/translateflashcard/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    from_language: from_language,
                    to_language: to_language,
                    text: list_of_flashcards,
                }),
            });
        
            if (response.ok) {
                const translation = await response.json();
                console.log('Presentation generated successfully:', translation.translation);  
      
            } else {
                const errorData = await response.json();
                console.error('Error generating Presentation:', errorData.detail);
            }
        } catch (error) {
            console.error('Network or fetch error:', error.message);
        }
        }
  
  
  
  
  const webpage_data = "Astronomy is a natural science that studies celestial objects and the phenomena that occur in the cosmos. It uses mathematics, physics, and chemistry in order to explain their origin and their overall evolution. Objects of interest include planets, moons, stars, nebulae, galaxies, meteoroids, asteroids, and comets. Relevant phenomena include supernova explosions, gamma ray bursts, quasars, blazars, pulsars, and cosmic microwave background radiation. More generally, astronomy studies everything that originates beyond Earth's atmosphere. Cosmology is a branch of astronomy that studies the universe as a whole.  Astronomy is one of the oldest natural sciences. The early civilizations in recorded history made methodical observations of the night sky. These include the Egyptians, Babylonians, Greeks, Indians, Chinese, Maya, and many ancient indigenous peoples of the Americas. In the past, astronomy included disciplines as diverse as astrometry, celestial navigation, observational astronomy, and the making of calendars. Professional astronomy is split into observational and theoretical branches. Observational astronomy is focused on acquiring data from observations of astronomical objects. This data is then analyzed using basic principles of physics. Theoretical astronomy is oriented toward the development of computer or analytical models to describe astronomical objects and phenomena. These two fields complement each other. Theoretical astronomy seeks to explain observational results and observations are used to confirm theoretical results. Astronomy is one of the few sciences in which amateurs play an active role. This is especially true for the discovery and observation of transient events. Amateur astronomers have helped with many important discoveries, such as finding new comets." 
  const url = "https://en.wikipedia.org/wiki/Astronomy"
  