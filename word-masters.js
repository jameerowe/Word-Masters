console.log("Script loaded"); // Initial log statement

let randomWord = ''; // Variable to store the random word
let currentRow = 0; // Variable to track the current row
let currentBox = 0; // Variable to track the current box

document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM fully loaded and parsed"); // Log when DOM is loaded

  const rows = document.querySelectorAll('.row');
  console.log(`Number of rows: ${rows.length}`);

// Function to fetch random word from API using async/await
async function fetchRandomWord() {
  try {
    const response = await fetch('https://words.dev-apis.com/word-of-the-day'); // Replace with your actual API URL
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log('Original word:', data.word); // Log the original word
    randomWord = data.word.toUpperCase(); // Store the random word in uppercase
    console.log('Uppercase word:', randomWord); // Log the uppercase word
    initializeApplication(); // Call to initialize the application after setting randomWord
  } catch (error) {
    console.error('There was a problem fetching the random word:', error);
  }
}

// Function to initialize the application
function initializeApplication() {
  console.log('Random word:', randomWord); // Log the random word to the console
  setupEventListeners(); // Set up the event listeners
}

// Function to set up event listeners
function setupEventListeners() {
  document.addEventListener('keydown', (event) => {
    const key = event.key;
    console.log(`Keydown event: ${key}`); // Log the keydown event

    if (key === 'Backspace') {
      event.preventDefault(); // Prevent default browser behavior

      if (currentBox > 0) {
        currentBox--; // Move to the previous box
        if (rows[currentRow].children[currentBox].textContent !== "") {
          rows[currentRow].children[currentBox].textContent = ""; // Clear content of current box if not empty
        }
        console.log(`Moved back to box ${currentBox} in row ${currentRow}`);
      }
    }
  });

  document.addEventListener('keypress', (event) => {
    const key = event.key; // Convert to uppercase
    console.log(`Keypress event: ${key}`); // Log the keypress event

    // Check if the key pressed is a valid letter
    if (key.length === 1 && key.match(/[A-Z]/i)) {
      console.log(`Valid letter: ${key}`); // Log valid letter

      // Ensure the current box is not already filled
      if (currentBox < 5 && rows[currentRow].children[currentBox].textContent === "") {
        rows[currentRow].children[currentBox].textContent = key.toUpperCase();
        console.log(`Placed letter '${key}' in row ${currentRow}, box ${currentBox}`); // Log placement
        currentBox++;
        console.log(`currentBox is now ${currentBox}`);
        }
      }

    console.log(`Enter key pressed in row ${currentRow}`); // Log Enter key press
    
      // Handle the Enter key separately
    if (key === 'Enter') {
      if (currentBox === 5) {
        checkUserGuess();
        // Move to the next row if there are more rows available
        if (currentRow < rows.length - 1) {
          currentRow++;
          currentBox = 0;
          console.log(`Moved to row ${currentRow}, reset currentBox to ${currentBox}`); // Log row change
        } else {
          console.log("No more rows available");
        }
      } else {
        console.log(`Enter key pressed but currentBox is ${currentBox}, not 5`);
      }
    }
  });
}

  // Function to check the user's guess
  function checkUserGuess() {
    let userGuess = '';
    for (let i = 0; i < 5; i++) {
      userGuess += rows[currentRow].children[i].textContent;
    }

    console.log(`User guess: ${userGuess}`); // Log user's guess

    if (userGuess === randomWord) {
      alert('Congratulations! You guessed the correct word!');
    } else {
      alert('Incorrect guess. Try again!');
    }
  }

  // Fetch random word and initialize the application
  fetchRandomWord();
});