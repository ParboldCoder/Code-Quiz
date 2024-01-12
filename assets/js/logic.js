document.addEventListener("DOMContentLoaded", function () {
  const startScreen = document.getElementById("start-screen");
  const quizContainer = document.getElementById("questions");
  const questionTitle = document.getElementById("question-title");
  const choicesContainer = document.getElementById("choices");
  const endScreen = document.getElementById("end-screen");
  const finalScore = document.getElementById("final-score");
  const initialsInput = document.getElementById("initials");
  const submitButton = document.getElementById("submit");
  const timerDisplay = document.getElementById("time");
  const startButton = document.getElementById("start");
  const feedbackContainer = document.getElementById("feedback");
  const scoresLink = document.querySelector(".scores a");

}

let currentQuestionIndex = 0;
  let score = 0;
  let timeLeft = 60;
  let timerInterval;

  startButton.addEventListener("click", startQuiz);
  submitButton.addEventListener("click", saveHighscore);
  scoresLink.addEventListener("click", viewHighscores);

  function startQuiz() {
    startScreen.classList.add("hide");
    quizContainer.classList.remove("hide");
    shuffleQuestions();
    displayQuestion();
    startTimer();
  }