//Declaring Variables

//Hard Coding the questions
let quizBank = [
  {
    id: 1,
    question: "What is the command that we can use to change directory in the terminal command line?",
    choices: ["mv", "rm", "history", "cd"],
    answer: "cd",
    type: "Multiple",
  },
  {
    id: 2,
    question: "What does SSH means?",
    choices: ["Secure Shell", "Secure Sheets", "Solid Shake", "Snake Sheets"],
    answer: "Secure Shell",
    type: "Multiple",
  },
  {
    id: 3,
    question: "It is a CSS position that is always relative to the parent",
    choices: ["Relative", "Static", "Fixed", "Absolute"],
    answer: "Relative",
    type: "Multiple",
  },
  {
    id: 4,
    question: "______ is a CSS property that is use to show an element on top of the another element",
    choices: ["margin", "z-index", "display", "visible"],
    answer: "z-index",
    type: "Multiple",
  },
  {
    id: 5,
    question: "Which of these is not a javascript data type?",
    choices: ["Number", "String", "Boolean", "Linked List"],
    answer: "Linked List",
    type: "Multiple"
  },
  {
    id: 6,
    question: "Which company developed Javascript?",
    choices: ["Netscape", "Microsoft", "Apple", "Oracle"],
    answer: "Netscape",
    type: "Multiple"
  },
  {
    id: 7,
    question: "Which of these is used to clear all the localStorage?",
    choices: ["localStorage.clear()", "LocalStorage.clear()", "clear.localStorage()", "Hey Google! Delete my localStorage"],
    answer: "localStorage.clear()",
    type: "Multiple"
  }];
// Questions

//Initialize a object for highscore
let highScores = new Object;
//User Variables
let currentScore = 0;
let correctAnswers = 0;
let wrongAnswers = 0;
let answeredQuestions = 1;
let quizCountdown = 60;
//Select the divs in the HTML
let quizArea = document.querySelector("#quiz-area");
const startBtn = document.querySelector("#start-btn");
const viewScore = document.querySelector("#view-score");
const startDiv = document.querySelector(".start-btn-div");
const scoreBody = document.querySelector("#score-body");
let quizTimerDiv = document.querySelector("#quiz-timer");
const alertArea = document.querySelector("#alert-area");
const timerLeftSpan = document.querySelector("#time-left");
//Declaring a variable to put the setinterval to be accessible globally
let quizStartTimer;
//Declaring Variables

// Shuffle Array
// Source https://www.rosettacode.org/wiki/Knuth_shuffle
let shuffleArr = arr => {
  let rand, temp, i;
  for (i = arr.length - 1; i > 0; i -= 1) {
    rand = Math.floor((i + 1) * Math.random());//get random between zero and i (inclusive)
    temp = arr[rand];//swap i and the zero-indexed number
    arr[rand] = arr[i];
    arr[i] = temp;
  }
  return arr;
}
//Array Shuffler

//Get random motivation
let getRandomMotivation = () => {
  const motivationArr = ["Exceptional", "Amazing", "Unbelievable", "Astounding", "Breathtaking", "Astonishing", "Phenomenal", "Remarkable", "Sensational", "Prodigious"];
  let char = Math.floor(Math.random()
    * motivationArr.length);
  return motivationArr[char];
}
//Random Motivation

//Store Score
let storeScore = (initials) => {
  let storedScores = JSON.parse(localStorage.getItem("scores"));
  const scoreObjInit = {
    score: currentScore + quizCountdown,
    correctAnswers: correctAnswers,
    wrongAnswers: wrongAnswers,
    initials: initials,
    answeredQuestions: answeredQuestions,
    timeLeft: quizCountdown
  };
  if (storedScores === null) {
    //Init the scores as array then push
    storedScores = [];
    storedScores.push(scoreObjInit);
  } else {
    //Push the obj in the array
    storedScores.push(scoreObjInit);
  }
  localStorage.setItem("scores", JSON.stringify(storedScores));
  return "Scores has been stored";
}
//Store Score

//renderHighScore
let renderHighScore = () => {
  quizArea.innerHTML = "";
  quizArea.classList.remove("card");
  quizTimerDiv.setAttribute("style", "display:none;")
  let storedScores = JSON.parse(localStorage.getItem("scores"));
  if (storedScores !== null) {
    const scoreHeader = document.createElement("h5");
    scoreHeader.textContent = 'Highscores';
    quizArea.appendChild(scoreHeader);
    const scoreBtnClear = document.createElement("button");
    scoreBtnClear.setAttribute("class", "float-right btn btn-info");
    scoreBtnClear.setAttribute("id", "clear-scores");
    scoreBtnClear.textContent = "Clear Scores";
    quizArea.appendChild(scoreBtnClear);
    const scoreTable = document.createElement("table");
    scoreTable.setAttribute("class", "table");
    const scoreThead = document.createElement("thead");
    scoreThead.innerHTML = `<tr>
    <th scope="col">#</th>
    <th scope="col">Initials</th>
    <th scope="col">Score</th>
    </tr>`
    scoreTable.appendChild(scoreThead);
    const scoreTbody = document.createElement("tbody");
    // document.querySelector("#clear-scores").setAttribute("style", "display:block;");
    storedScores.sort((a, b) => (a.score < b.score) ? 1 : -1);
    let iterator = 1;
    for (let i = 0; i < storedScores.length; i++) {
      const scoreTr = document.createElement("tr");
      scoreTr.innerHTML = `<th scope="row">${iterator}</th>
      <th >${storedScores[i].initials}</th>
      <th >${storedScores[i].score}</th>`
      scoreTbody.appendChild(scoreTr);
      iterator++;
    }
    scoreTable.appendChild(scoreTbody);
    quizArea.appendChild(scoreTable);
    const backBtn = document.createElement("button");
    backBtn.setAttribute("class", "float-right btn btn-info");
    backBtn.setAttribute("id", "back-btn");
    backBtn.textContent = "Go Back";
    quizArea.appendChild(backBtn);
  } else {
    const scoreHeader = document.createElement("h5");
    scoreHeader.textContent = 'Highscores';
    quizArea.appendChild(scoreHeader);
    const spanCentered = document.createElement("div");
    spanCentered.setAttribute("style", "font-size:20px;text-align:center;")
    spanCentered.innerHTML = `<span>Nothing to show here</span>`;
    quizArea.appendChild(spanCentered);
    const backBtn = document.createElement("button");
    backBtn.setAttribute("class", "float-right btn btn-info");
    backBtn.setAttribute("id", "back-btn");
    backBtn.textContent = "Go Back";
    quizArea.appendChild(backBtn);
  }
};
//renderHighScore


//Reset Score 
let resetScore = () => {
  answeredQuestions = 1;
  correctAnswers = 0;
  wrongAnswers = 0;
  currentScore = 0;
  quizCountdown = 60;
};
//Reset Score

//Quiz Maker
let quizMaker = () => {
  const shuffledQuiz = shuffleArr(quizBank);
  quizArea.innerHTML = "";
  resetScore();
  quizTimerDiv.setAttribute("style", "display:block;");
  timerLeftSpan.textContent = "60 secs";
  quizStartTimer = setInterval(() => { quizTimerF() }, 1000);
  // console.log(quizStartTimer)
  quizArea.setAttribute("class", "card")
  for (let i = 0; i < shuffledQuiz.length; i++) {
    let questionDiv = document.createElement("div");
    questionDiv.setAttribute("id", `question_${i + 1}`);
    questionDiv.setAttribute("style", "display:none;");
    questionDiv.setAttribute("class", "card-body");
    quizArea.appendChild(questionDiv);
    let strongQ = document.createElement("strong");
    strongQ.setAttribute("class", "card-title");
    strongQ.textContent = shuffledQuiz[i].question;
    questionDiv.appendChild(strongQ);
    if (shuffledQuiz[i].type === "Multiple") {
      let choiceUl = document.createElement("ul");
      choiceUl.setAttribute("class", "list-group")
      let shuffleChoices = shuffleArr(shuffledQuiz[i].choices);
      for (let j = 0; j < shuffleChoices.length; j++) {
        let choiceLi = document.createElement("li");
        choiceLi.setAttribute("class", "list-group-item");
        // let choiceBtn = document.createElement("button");
        choiceLi.textContent = shuffleChoices[j];
        choiceLi.setAttribute("class", "list-group-item list-group-item-action list-group-item-info li-margin li-choice");
        choiceLi.setAttribute("data-id", shuffledQuiz[i].id);
        choiceLi.setAttribute("data-choice", shuffledQuiz[i].choices[j]);
        choiceLi.setAttribute("data-index", i + 1);
        choiceUl.appendChild(choiceLi);
      }
      questionDiv.appendChild(choiceUl);
    }
  }

};
//Quiz

//Start Quiz Timer

//Quiz timer function
let quizTimerF = () => {
  quizCountdown--;
  timerLeftSpan.textContent = `${quizCountdown} secs`;

  if (quizCountdown === 0) {
    stopInterval();
    renderPostScore("time");
    // renderHighScore();
  }
}
//Quiz timer function

//Stop interval
let stopInterval = () => {
  clearInterval(quizStartTimer)
}
//Stop Interval

//render post Score
let renderPostScore = (endType) => {
  quizArea.innerHTML = "";
  if (endType === "end") {
    stopInterval();
  }
  let postScoreDiv = document.createElement("div");
  postScoreDiv.setAttribute("class", "card");
  quizArea.appendChild(postScoreDiv);
  let cardBody = document.createElement("div");
  cardBody.setAttribute("class", "card-body");
  postScoreDiv.appendChild(cardBody);
  let cardTitle = document.createElement("h5");
  cardTitle.textContent = `${endType === "end" ? "Quiz has ended!" : "Time's Up!"}`;
  cardTitle.setAttribute("class", "card-title");
  let cardInput = document.createElement("input");
  cardInput.setAttribute("type", "text");
  cardInput.setAttribute("class", "form-control");
  cardInput.setAttribute("id", "card-input");
  cardInput.setAttribute("placeholder", "Your initials here");
  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardInput);
  let cardUl = document.createElement("ul");
  cardUl.setAttribute("class", "list-group list-group-flush");
  cardUl.innerHTML = `<li class="list-group-item">Score : ${(currentScore + quizCountdown) < 0 ? 0 : currentScore + quizCountdown} pts</li>
  <li class="list-group-item">Correct Answers : ${correctAnswers}</li>
  <li class="list-group-item">Wrong Answers : ${wrongAnswers}</li>`
  postScoreDiv.appendChild(cardUl);
  let cardBodyTwo = document.createElement("div");
  cardBodyTwo.setAttribute("class", "card-body");
  cardBodyTwo.innerHTML = `
    <button class="btn btn-info start-another-btn" >Start Another Quiz</button>
    <button class="btn btn-info view-score-btn">View Highscores</button>`
  postScoreDiv.appendChild(cardBodyTwo);
};
//render post Score

//Show Alert
let stateAlert = (content, type) => {
  alertArea.innerHTML = `<div class="alert alert-${type}" id="alert-clip" role="alert">${content}</div>`;
  setTimeout(() => { document.getElementById("alert-clip").style.display = "none"; }, 600);
};
//Show Alert

//Answer Checker
quizArea.addEventListener("click", (event) => {
  let target = event.target;
  if (target.matches("li.li-choice") === true) {
    let arrId = target.getAttribute("data-id")
    let choice = target.getAttribute("data-choice");
    let index = target.getAttribute("data-index");
    const correctArr = quizBank.find(element => element.id == arrId);
    const correctAnswer = correctArr.answer;
    if (correctAnswer === choice) {
      currentScore += 5;
      correctAnswers++;
      stateAlert(`You're ${getRandomMotivation()}! Keep up the good work!`, 'success');
      // alertArea.innerHTML = `<div class="alert alert-success" id="alert-clip" role="alert">You're ${getRandomMotivation()}! Keep up the good work!</div>`;
      // setTimeout(() => { document.getElementById("alert-clip").style.display = "none"; }, 600);
    } else {
      wrongAnswers++;
      quizCountdown -= 10;
      timerLeftSpan.textContent = `${quizCountdown} secs`;
      stateAlert(`The answer is wrong! Come on now!`, 'danger');
      // alertArea.innerHTML = `<div class="alert alert-danger" id="alert-clip" role="alert">The answer is wrong! Come on now!</div>`;
      // setTimeout(() => { document.getElementById("alert-clip").style.display = "none"; }, 600);
    }
    if (answeredQuestions < quizBank.length && quizCountdown > 0) {
      document.querySelector(`#question_${index}`).setAttribute("style", "display:none;");
      document.querySelector(`#question_${parseInt(index) + 1}`).setAttribute("style", "display:block;");
    } else {
      renderPostScore("end");
      // renderHighScore();
    }
    answeredQuestions++;
  }

  //Start Another Button
  if (target.matches("button.start-another-btn")) {
    let initials = document.getElementById("card-input").value.toUpperCase();
    if (initials) {
      storeScore(initials);
      // renderHighScore();
      stateAlert(`Score saved!`, 'success');
      quizMaker();
      startDiv.setAttribute("style", "display:none;");
      const questionOne = document.getElementById("question_1");
      questionOne.setAttribute("style", "display:block;");
    } else {
      stateAlert(`Please provide your initials`, 'danger');
      // alertArea.innerHTML = `<div class="alert alert-danger" id="alert-clip" role="alert">Please provide your initials</div>`;
      // setTimeout(() => { document.getElementById("alert-clip").style.display = "none"; }, 600);
    }
  }
  //Start Another Button

  //Clear scores
  if (target.matches("#clear-scores")) {
    // this.setAttribute("style", "display:none;")
    localStorage.clear();
    renderHighScore();
    stateAlert(`Highscores Cleared!`, 'danger');
  }
  //Clear Scores

  //Go back button
  if (target.matches("#back-btn")) {
    quizArea.innerHTML = "";
    startDiv.setAttribute("style", "display:block;");
  }
  //Go back button

  //View Score Btn
  if (target.matches(".view-score-btn")) {
    let initials = document.getElementById("card-input").value.toUpperCase();
    if (initials) {
      storeScore(initials);
      // renderHighScore();
      renderHighScore();
      stateAlert(`Score saved!`, 'success');
    } else {
      stateAlert(`Please provide your initials`, 'danger');
      // alertArea.innerHTML = `<div class="alert alert-danger" id="alert-clip" role="alert">Please provide your initials</div>`;
      // setTimeout(() => { document.getElementById("alert-clip").style.display = "none"; }, 600);
    }
  }
  //View Score Btn
});
//Answer Checker

//Enter 

//start button event
startBtn.addEventListener("click", (event) => {
  event.preventDefault();
  quizMaker();
  startDiv.setAttribute("style", "display:none;");
  const questionOne = document.getElementById("question_1");
  questionOne.setAttribute("style", "display:block;");
});
//start button event

//View Score
viewScore.addEventListener("click", (event) => {
  event.preventDefault();
  renderHighScore();
  startDiv.setAttribute("style", "display:none;");
});
//View Score

// renderHighScore();