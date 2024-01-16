document.addEventListener("DOMContentLoaded", function () {
  let highscores = JSON.parse(localStorage.getItem("highscores")) || [];
console.log(highscores);
  function displayHighscores() {
    const highscoresList = document.getElementById("highscores");
    //console.log(highscoresList) - I used this to test my scores
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
  function clearHighscores() {
    highscores = [];
    localStorage.removeItem("highscores");
    displayHighscores();
  }

  const clearButton = document.getElementById("clear");
  if (clearButton) {
    clearButton.addEventListener("click", clearHighscores);
  }


  displayHighscores();
});
