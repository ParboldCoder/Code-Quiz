document.addEventListener("DOMContentLoaded", function () {
  let highscores = JSON.parse(localStorage.getItem("highscores")) || [];
console.log(highscores);
  function displayHighscores() {
    const highscoresList = document.getElementById("highscores");
    //console.log(highscoresList)
    if (highscoresList) {
      highscoresList.innerHTML = "";

      highscores.forEach((score, index) => {
        const li = document.createElement("li");
        console.log(score)
        if (score.initials) {
          li.textContent = `${score.initials}: Score - ${score.score}`;
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
  console.log(initialsInput)
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

  //addHighscore();

  displayHighscores();
});
