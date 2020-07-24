// variables to keep track of the quiz
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

// variables to reference DOM elements
var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("time");
var choicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initialsEl = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback");

//we need a function to start the quiz
function startQuiz() {
  // but first we need to get the start screen out of the way
  var startScreenEl = document.getElementById("start-screen");
  startScreenEl.setAttribute("class", "hide");
  // then we need to bring out the questions and start the timer
  questionsEl.removeAttribute("class");
  // start timer
  timerId = setInterval(clockTick, 1000);
  // show starting time
  timerEl.textContent = time;
  getQuestion();
}
function getQuestion() {
  // grab question from the array
  var currentQuestion = questions[currentQuestionIndex];
  // put question in the title
  var titleEl = document.getElementById("question-title");
  titleEl.textContent = currentQuestion.title;
  // clear out previous choices if any
  choicesEl.innerHTML = "";
  // loop choices
  currentQuestion.choices.forEach(function(choice, i) {
    // now we need buttons for the choices
    var choiceNode = document.createElement("button");
    choiceNode.setAttribute("class", "choice");
    choiceNode.setAttribute("value", choice);
    choiceNode.textContent = i + 1 + ". " + choice;
    // attach click event listener to each choice
    choiceNode.onclick = questionClick;
    // make it display on the page
    choicesEl.appendChild(choiceNode);
  });
}
function questionClick() {
  // check if user guessed wrong
  if (this.value !== questions[currentQuestionIndex].answer) {
    // if so, penalize time
    time -= 15;
    if (time < 0) {
      time = 0;
    }
    // display new time on page
    timerEl.textContent = time
    feedbackEl.textContent = "Wrong!";
  } else {
    feedbackEl.textContent = "Correct!";
  }
  // flash right/wrong feedback messages
  feedbackEl.setAttribute("class", "feedback");
  setTimeout(function() {
    feedbackEl.setAttribute("class", "feedback hide");
  }, 1000);
  // move to next question
  currentQuestionIndex++;
  // check if we've run out of questions
  if (currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}
function quizEnd() {
  // stop timer
  clearInterval(timerId);
  // show end screen
  var endScreenEl = document.getElementById("end-screen");
  endScreenEl.removeAttribute("class");
  // show final score
  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = time;
  // hide questions section
  questionsEl.setAttribute("class", "hide");
}
function clockTick() {
  // update time
  time--;
  timerEl.textContent = time;
  // check if user ran out of time
  if (time <= 0) {
    quizEnd();
  }
}
function saveHighscore() {
  var initials = initialsEl.value.trim();
  // make sure the didn't leave box empty
  if (initials !== "") {
    // get scores from localstorage. if none, then empty array
    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];
    var newScore = {
      score: time,
      initials: initials
    };
    // save to localstorage
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));
    // redirect to next page
    window.location.href = "highscores.html";
  }
}
function checkForEnter(event) {
  if (event.key === "Enter") {
    saveHighscore();
  }
}
// user clicks button to submit initials
submitBtn.onclick = saveHighscore;
// user clicks button to start quiz
startBtn.onclick = startQuiz;
initialsEl.onkeyup = checkForEnter;