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
  
  const correctSound = new Audio("./assets/sfx/correct.wav");
  const wrongSound = new Audio("./assets/sfx/incorrect.wav"); //Adding the audio was a learning curve, as I did not include 'new' before the Audio

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

  function shuffleQuestions() {
    questions.sort(() => Math.random() - 0.5);
  }

  function displayQuestion() {
    const currentQuestion = questions[currentQuestionIndex];

    questionTitle.textContent = currentQuestion.question;
    choicesContainer.innerHTML = "";

    if (currentQuestion.isTrueFalse) {
      const trueButton = createChoiceButton("True");
      const falseButton = createChoiceButton("False");

      choicesContainer.appendChild(trueButton);
      choicesContainer.appendChild(falseButton);
    } else if (currentQuestion.choices && currentQuestion.choices.length > 0) {
      currentQuestion.choices.forEach((choice) => {
        const button = createChoiceButton(choice);
        choicesContainer.appendChild(button);
      });
    }
  }

  function createChoiceButton(text) {
    const button = document.createElement("button");
    button.textContent = text;
    button.addEventListener("click", checkAnswer);
    choicesContainer.appendChild(button);
    return button;
  }

  function checkAnswer(event) {
    const selectedAnswerText = event.target.textContent;
    const currentQuestion = questions[currentQuestionIndex];

    if (currentQuestion.isTrueFalse) {
      const selectedAnswer = selectedAnswerText === "True";
      const correctAnswer = currentQuestion.correctAnswer;
      if (selectedAnswer === correctAnswer) {
        score++;
        showFeedback("Correct!", "correct");
        correctSound.play();
      } else {
        timeLeft -= 10;
        showFeedback("Wrong!", "wrong");
        wrongSound.play();    
      }
    } else if (currentQuestion.choices) {
      const selectedAnswer = selectedAnswerText;
      const correctAnswer = currentQuestion.correctAnswer;

      if (selectedAnswer === correctAnswer) {
        score++;
        showFeedback("Correct!", "correct");
        correctSound.play();
      } else {
        timeLeft -= 10;
        showFeedback("Wrong!", "wrong");
        wrongSound.play();
      }
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
      displayQuestion();
    } else {
      endQuiz();
    }
  }

  function displayImage(imageElement) {
    if (imageElement && imageElement.classList) {
      imageElement.classList.remove("hide");
      setTimeout(() => {
        imageElement.classList.add("hide");
      }, 1000);
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
  }

  function saveHighscore() {
    const initials = initialsInput.value.trim();

    if (initials !== "") {
      const currentHighscores =
        JSON.parse(localStorage.getItem("highscores")) || []; //Here I'm checking for highscores stored in the browser's local storage. If there are any, I'm using JSON.parse to convert them from a string to a JavaScript object. If there are no highscores or something goes wrong, I'm setting it to an empty array.  

      const newHighscore = { initials, score };
      currentHighscores.push(newHighscore);
      currentHighscores.sort((a, b) => b.score - a.score);
      currentHighscores.splice(10);

      localStorage.setItem("highscores", JSON.stringify(currentHighscores));

      window.location.href = "highscores.html";
    }
  }

  function viewHighscores() {
  }
});
