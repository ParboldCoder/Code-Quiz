document.addEventListener("DOMContentLoaded", function () {
    let highscores = JSON.parse(localStorage.getItem("highscores")) || [];
  
    function displayHighscores() {
      const highscoresList = document.getElementById("highscores");
      highscoresList.innerHTML = "";
  
      highscores.forEach((score, index) => {
        const li = document.createElement("li");
  
        if (score.name) {
          li.textContent = `${index + 1}. ${score.name}: ${score.score}`;
          highscoresList.appendChild(li);
        }
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
  