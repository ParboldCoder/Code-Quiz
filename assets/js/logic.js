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
  function shuffleQuestions() {
      questions.sort(() => Math.random() - 0.5);
  }
  
  function displayQuestion() {
    questionTitle.textContent = currentQuestion.question;
    choicesContainer.innerHTML = "";
  
    if (currentQuestion.isTrueFalse) {
      const trueButton = createChoiceButton("True");
      const falseButton = createChoiceButton("False");
  
      choicesContainer.appendChild(trueButton);
      choicesContainer.appendChild(falseButton);
    } else {
      
      currentQuestion.choices.forEach(choice => {
        const button = createChoiceButton(choices);
        choicesContainer.appendChild(button);
      });
    }
  }
  
  function createChoiceButton(text) {
   const button = document.createElement("div");
    button.textContent = text;
    button.addEventListener("clck", checkAnswer);
    return button;
  }
  
  function checkAnswer(event) {
    const selectedAnswerText = event.target;
  
    if (questions[currentQuestionIndex].isTrueFalse) {
      const selectedAnswer = selectedAnswerText === "True";
      const correctAnswer = questions[currentQuestionIndex].correctAnswer;
      if (selectedAnswer === correctAnswer) {
        score++;
        showFeedback("Correct!", "correct");
      } else {
        timeLeft -= 10;
        showFeedback("Wrong!", "wrong");
      }
    } else {
      const selectedAnswer = selectedAnswerText;
      const correctAnswer = questions[currentQuestionIndex].correctAnswer;
  
      if (selectedAnswer === correctAnswer) {
        score++;
        showFeedback("Correct!", "correct");
      } else {
        timeLeft -= 10;
        showFeedback("Wrong!", "wrong");
      }
    }
  
    currentQuestionIndex++;
  
    if (currentQuestionIndex < questions.length) {
      displayQuestion();
    } else {
      endQuiz();
    }
  }
  
  function showFeedback(message, className) {
    container.textContent = message;
    feedbackContainer = `feedback ${className}`;
    setTimeout(() => {
      feedbackContainer.className = "hide";
    }, 1000);
  }
  
  function startTimer() {
    timerInterval = setInterval(function () {
      timeLeft--;
      timerDisplay = timeLeft;
  
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        endQuiz();
      }
    }, 1000);
  }
  
  function endQuiz() {
    clearInterval(timerInterval);
    quizContainer.classList.add("hidden");
    endScreen.classList.add("hide");
    finalScore = score;
  }
  
  function saveHighscore() {
    const initials = initialsInput.value.trim();
  
    if (initials !== "") {
      Save the highscore logic (use localStorage or send to a server)
      localStorage.setItem("highscore", stringify({ initials, score }));
      Redirect to highscores.html or display highscores dynamically
    }
  }
  
  function viewHighscores() {
  }
  