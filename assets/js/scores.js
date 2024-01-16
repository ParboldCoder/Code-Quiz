document.addEventListener("DOMContentLoaded", function () {
  let highscores = JSON.parse(localStorage.getItem("highscores")) || [];

  function displayHighscores() {
    const highscoresList = document.getElementById("highscores");

    if (highscoresList) {
      highscoresList.innerHTML = "";

      highscores.forEach((score, index) => {
        const li = document.createElement("li");

        if (score.name) {
          li.textContent = `${index + 1}. ${score.name}: Score - ${score.score}, Time - ${score.time}`;
          highscoresList.appendChild(li);
        }
      });
    }
  }

  function isValidInitials(initials) {
    return /^[a-zA-Z]{3}$/.test(initials);
  }

  function addHighscore() {
    const initialsInput = document.getElementById("initials");
    const userScore = 42; 
    const userTime = 100;

    if (initialsInput && isValidInitials(initialsInput.value)) {
      const score = {
        name: initialsInput.value.toUpperCase(),
        score: userScore,
        time: userTime,
      };

      highscores.push(score);
      highscores.sort((a, b) => {
        if (a.score === b.score) {
          return a.time - b.time; 
        }
        return b.score - a.score;
      });

      highscores = highscores.slice(0, 10);
      localStorage.setItem("highscores", JSON.stringify(highscores));
      displayHighscores();
    } 
  }

  function clearHighscores() {
    highscores = [];
    localStorage.removeItem("highscores");
    displayHighscores();
  }

  const clearButton = document.getElementById("clear");
  if (clearButton) {
    clearButton.addEventListener("click", clearHighscores);
  }

  addHighscore();

  displayHighscores();
});
