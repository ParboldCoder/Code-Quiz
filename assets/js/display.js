let highscores = JSON.parse(localStorage.getItem("highscores")) || [];

function displayHighscores() {
  const highscoresList = document.getElementById("highscores");

  if (highscoresList) {
    highscoresList.innerHTML = "";

    highscores.forEach((score, index) => {
      const li = document.createElement("li");

      if (score.name) {
        li.textContent = `${index + 1}. ${score.name}: ${score.score}`;
        highscoresList.appendChild(li);
      }
    });
  } else {
    console.error("Element with ID 'highscores' not found.");
  }
}
