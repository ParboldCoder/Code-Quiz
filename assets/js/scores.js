document.addEventListener("DOMContentLoaded", function () {
    let highscores = JSON.parse(localStorage.getItem("highscores")) || [];
  
    function displayHighscores() {
      const highscoresList = document.getElementById("highscores");
      highscoresList.innerHTML = "";
  
      highscores.forEach((score, index) => {
        const li = document.createElement("li");
        let scoreString = `${index + 1}. `;
  
        for (const key in score) {
          if (score.hasOwnProperty(key)) {
            scoreString += `${key}: ${score[key]}, `;
          }
        }
  
        scoreString = scoreString.slice(0, -2);
  
        li.textContent = scoreString;
        highscoresList.appendChild(li);
      });
    }
  
    function addHighscore(score) {
      highscores.push(score);
      highscores.sort((a, b) => b.score - a.score);
      highscores = highscores.slice(0, 10);
      localStorage.setItem("highscores", JSON.stringify(highscores));
      displayHighscores();
    }
  
    function clearHighscores() {
      highscores = [];
      localStorage.removeItem("highscores");
      displayHighscores();
    }
  
    const clearButton = document.getElementById("clear");
    clearButton.addEventListener("click", clearHighscores);
  
    displayHighscores();
  });
  