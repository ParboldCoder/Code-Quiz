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

  let currentQuestionIndex = 0;
  let score = 0;
  let timeLeft = 60;
  let timerInterval;

  startButton.addEventListener("click", startQuiz);
  submitButton.addEventListener("click", saveHighscore);
  scoresLink.addEventListener("click", function () {
    window.location.href = "highscores.html";
  });

  function startQuiz() {
    startScreen.classList.add("hide");
    quizContainer.classList.remove("hide");
    shuffleQuestions();
    displayQuestion();
    startTimer();
  }

  function shuffleQuestions() {
    questions.sort(() => Math.random() - 0.5);
  }

  function displayQuestion() {
    const currentQuestion = questions[currentQuestionIndex];

    questionTitle.textContent = currentQuestion.question;
    choicesContainer.innerHTML = "";

    if (currentQuestion.isTrueFalse) {
      createChoiceButton("True");
      createChoiceButton("False");
    } else {
      currentQuestion.choices.forEach((choice) => {
        createChoiceButton(choice);
      });
    }
  }

  function createChoiceButton(text) {
    const button = document.createElement("div");
    button.textContent = text;
    button.addEventListener("click", checkAnswer);
    choicesContainer.appendChild(button);
  }

  function checkAnswer(event) {
    const selectedAnswerText = event.target.textContent;
    const currentQuestion = questions[currentQuestionIndex];

    const selectedAnswer =
      currentQuestion.isTrueFalse
        ? selectedAnswerText === "True"
        : selectedAnswerText;

    const correctAnswer = currentQuestion.correctAnswer;

    if (selectedAnswer === correctAnswer) {
      score++;
      showFeedback("Correct!", "correct");
    } else {
      timeLeft -= 10;
      showFeedback("Wrong!", "wrong");
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
      displayQuestion();
    } else {
      endQuiz();
    }
  }

  function showFeedback(message, className) {
    feedbackContainer.textContent = message;
    feedbackContainer.className = `feedback ${className}`;
    setTimeout(() => {
      feedbackContainer.className = "hide";
    }, 1000);
  }

  function startTimer() {
    timerInterval = setInterval(function () {
      timeLeft--;
      timerDisplay.textContent = timeLeft;

      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        endQuiz();
      }
    }, 1000);
  }

  function endQuiz() {
    clearInterval(timerInterval);
    quizContainer.classList.add("hide");
    endScreen.classList.remove("hide");
    finalScore.textContent = score;

    displayHighscores();
  }

  function saveHighscore() {
    const initials = initialsInput.value.trim();

    if (/^[A-Za-z]{3}$/.test(initials)) {
      const currentHighscores =
        JSON.parse(localStorage.getItem("highscores")) || [];

      const newHighscore = { initials, score };
      currentHighscores.push(newHighscore);
      currentHighscores.sort((a, b) => b.score - a.score);
      currentHighscores.splice(10);

      localStorage.setItem("highscores", JSON.stringify(currentHighscores));

      window.location.href = "highscores.html";
    } else {
      alert("Please enter exactly three letters for initials.");
    }
  }
});
