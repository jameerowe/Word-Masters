let randomWord = "";

fetchRandomWord();

function fetchRandomWord() {
  fetch("https://words.dev-apis.com/word-of-the-day")
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(data => {
      randomWord = data.word;
      initializeApplication();
    })
    .catch(error => {
      console.error("There was a problem fetching the random word:", error);
    });
}

document.addEventListener('DOMContentLoaded', () => {
  const rows = document.querySelectorAll('.row');
  let currentRow = 0;
  let currentBox = 0;

  document.addEventListener('keydown', (event) => {
    const key = event.key;

    if (key === 'Backspace') {
      event.preventDefault();

      if (currentBox > 0) {
        currentBox--;
        if (rows[currentRow].children[currentBox].textContent !== "") {
          rows[currentRow].children[currentBox].textContent = "";
        }
      }
    }
  });

  document.addEventListener('keypress', (event) => {
      const key = event.key;

      if (key === 'Enter') {
          if (currentBox === 5 && currentRow < rows.length - 1) {
              currentRow++;
              currentBox = 0;
          }
      } else if (key.length === 1 && key.match(/[a-z]/i)) {
          if (currentBox < 5) {
              rows[currentRow].children[currentBox].textContent = key;
              currentBox++;
          }
      }
  });
});