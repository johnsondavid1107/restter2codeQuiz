var questions = [
  {
    question: "Who lives in a pineapple under the sea?",
    choices: ["John Ledgend", "Oprah", "Spongebob Square Pants", "Both A and B"],
    answer: "Spongebob Square Pants",
  },
  {
    question:
      "Can a match box?",
    choices: ["yes", " no", "maybe", "no but a tin can"],
    answer: "no but a tin can",
  },
  {
    question:
      "How much is 3 + 3?",
    choices: ["seven", "six", "6", "I am not sure"],
    answer: "6",
  },
  {
    question:
      "Do you even lift?",
    choices: ["Dude, I am brolic", " no", "Im too tired", "What?"],
    answer: "Dude, I am brolic",
  },
  {
    question:
      ".sdrawkcab noitseuq siht rewsna",
    choices: ["illiterate", "K.O.", "what...?", "I would like to go home now."],
    answer: "K.O.",
  },
];

var questionEl = document.querySelector("#question");
var optionListEl = document.querySelector("#option-list");
var questionResultEl = document.querySelector("#question-result");
var timerEl = document.querySelector("#timer");
var buttonEl = document.querySelector("#button")
var introEl = document.querySelector(".intro");

var questionIndex = 0;
var correctCount = 0;
var time = 20;
var intervalId;

function newPage() {

  window.location.href = "http://www.google.com";
}


function endQuiz() {
  clearInterval(intervalId);
  var body = document.body;
  body.innerHTML = "Game over, You scored " + correctCount;

  var btn = document.createElement("BUTTON");
  btn.innerHTML = "Show Highscores!";
  btn.addEventListener("click", function () {
    window.open("file:///Users/ness/Desktop/fullflex/homework/9.29.20h/restter2codeQuiz/highscore.html")
  });
  document.body.append(btn);
  setTimeout(showHighScore, 2000);
}


function showHighScore() {

  var name = prompt("Please enter your initials");
  var highScore = localStorage.getItem("scores");

  var user = {
    name: name,
    score: correctCount
  }

  if (!highScore) {
    highScore = []
  } else {
    highScore = JSON.parse(highScore)
  }

  highScore.push(user);

  localStorage.setItem('scores', JSON.stringify(highScore));

  if (highScore.length >= 10) {
    // highScore.shift();
    window.onbeforeunload = function (e) { localStorage. clear(); };
  } else {
    console.log("This did not work");
  }


  console.log(highScore);
  if (!name) {
    alert("Invalid - Please try entering something...man.")
    showHighScore();
  }

}






function updateTime() {
  timerEl.textContent = time;
  time--;
  if (time <= 0) {
    endQuiz();
  }
}

function renderQuestion() {
  if (time == 0) {
    updateTime();
    return;
  }
  updateTime();
  intervalId = setInterval(updateTime, 1000);
  questionEl.textContent = questions[questionIndex].question;

  optionListEl.innerHTML = "";
  questionResultEl.innerHTML = "";

  var choices = questions[questionIndex].choices;
  var choicesLenth = choices.length;

  for (var i = 0; i < choicesLenth; i++) {
    var questionListItem = document.createElement("li");
    questionListItem.textContent = choices[i];
    optionListEl.append(questionListItem);

  }

}
function nextQuestion() {
  questionIndex++;
  if (questionIndex === questions.length) {
    time = 0;
  }
  renderQuestion();
  buttonClickCount = 0;
}

function checkAnswer(event) {
  clearInterval(intervalId);
  if (event.target.matches("li")) {

    console.log(event.target);

    var answer = event.target.textContent;
    if (answer === questions[questionIndex].answer) {
      questionResultEl.textContent = "Correct! :)";
      correctCount++;
      console.log (correctCount);
    } else {
      questionResultEl.textContent = "Incorrect :(";
      time = time - 2;
      timerEl.textContent = time;
    }
   
  }


  setTimeout(nextQuestion, 2000);

}

function startQuiz() {
  document.getElementById("button").style.display = "none";
  introEl.innerHTML = "";

  renderQuestion();
}


buttonEl.addEventListener("click", startQuiz);

optionListEl.addEventListener("click", checkAnswer);

