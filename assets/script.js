//Random Number Picker
let randomNumPicker = () => {
  let num = Math.floor(Math.random()
    * quizObj.length + 1);
  return num;
}
//Random

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
  }];

let highScores = new Object;
let quizArea = document.querySelector(".quiz-area");
let currentScore = 0;
let correctAnswers = 0;
let wrongAnswers = 0;
let answeredQuestions = 1;
const startBtn = document.querySelector("#start-btn");
const startDiv = document.querySelector(".start-btn-div");
const scoreBody = document.querySelector("#score-body");
// const startAnotherBtn = document.querySelector("#start-another-btn");

// Shuffle Array
// Source https://www.rosettacode.org/wiki/Knuth_shuffle
let knuthShuffle = arr => {
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

//Answer Checker
quizArea.addEventListener("click", function (event) {
  let target = event.target;
  if (target.matches("li") === true) {
    let arrId = target.getAttribute("data-id")
    let choice = target.getAttribute("data-choice");
    let index = target.getAttribute("data-index");
    const correctArr = quizBank.find(element => element.id == arrId);
    const correctAnswer = correctArr.answer;
    const alertArea = document.querySelector("#alert-area");
    if (correctAnswer === choice) {
      currentScore += 5;
      correctAnswers++;
      alertArea.innerHTML = `<div class="alert alert-success" id="alert-clip" role="alert">You're ${getRandomMotivation()}! Keep up the good work!</div>`;
      setTimeout(function () { document.getElementById("alert-clip").style.display = "none"; }, 600);
    } else {
      wrongAnswers++;
      alertArea.innerHTML = `<div class="alert alert-danger" id="alert-clip" role="alert">The answer is wrong! Come on now!</div>`;
      setTimeout(function () { document.getElementById("alert-clip").style.display = "none"; }, 600);
    }
    if (answeredQuestions < quizBank.length) {
      document.querySelector(`#question_${index}`).setAttribute("style", "display:none;");
      document.querySelector(`#question_${parseInt(index) + 1}`).setAttribute("style", "display:block;");
    } else {
      renderPostScore();
      renderHighScore();
    }
    answeredQuestions++;
  }

  //Start Another Button
  if (target.matches("button.start-another-btn")) {
    quizMaker();
    startDiv.setAttribute("style", "display:none;");
    const questionOne = document.getElementById("question_1");
    questionOne.setAttribute("style", "display:block;");
  }
  //Start Another Button
});
//Answer Checker

//Store Score
let storeScore = (initials) => {
  let storedScores = JSON.parse(localStorage.getItem("scores"));
  const scoreObjInit = {
    score: currentScore,
    correctAnswers: correctAnswers,
    wrongAnswers: wrongAnswers,
    initials: initials,
    answeredQuestions: answeredQuestions
  };
  if (storedScores === null) {
    storedScores = [];
    storedScores.push(scoreObjInit);
  } else {
    storedScores.push(scoreObjInit);
  }
  localStorage.setItem("scores", JSON.stringify(storedScores));
  return "Scores has been stored";
}
//Store Score

//renderHighScore
let renderHighScore = () => {
  scoreBody.innerHTML = "";
  let storedScores = JSON.parse(localStorage.getItem("scores"));
  if (storedScores !== null) {
    storedScores.sort((a, b) => (a.score < b.score) ? 1 : -1)
    let iterator = 1;
    for (let i = 0; i < storedScores.length; i++) {
      const scoreTr = document.createElement("tr");
      scoreTr.innerHTML = `<th scope="row">${iterator}</th>
      <th >${storedScores[i].initials}</th>
      <th >${storedScores[i].score}</th>`
      scoreBody.appendChild(scoreTr);
      iterator++;
    }
  }
};
//renderHighScore
renderHighScore()

//Reset Score 
let resetScore = () => {
  answeredQuestions = 1;
  correctAnswers = 0;
  wrongAnswers = 0;
  currentScore = 0;
};
//Reset Score

let renderPostScore = () => {
  quizArea.innerHTML = "";
  storeScore("test");
  let postScoreDiv = document.createElement("div");
  postScoreDiv.setAttribute("class", "card");
  quizArea.appendChild(postScoreDiv);
  let cardBody = document.createElement("div");
  cardBody.setAttribute("class", "card-body");
  postScoreDiv.appendChild(cardBody);
  let cardTitle = document.createElement("h5");
  cardTitle.textContent = "Quiz has ended!";
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
  cardUl.innerHTML = `<li class="list-group-item">Score : ${currentScore}</li>
  <li class="list-group-item">Correct Answers : ${correctAnswers}</li>
  <li class="list-group-item">Wrong Answers : ${wrongAnswers}</li>`
  postScoreDiv.appendChild(cardUl);
  let cardBodyTwo = document.createElement("div");
  cardBodyTwo.setAttribute("class", "card-body");
  cardBodyTwo.innerHTML = `
    <button class="btn btn-info start-another-btn" >Start Another Quiz</button>`
  postScoreDiv.appendChild(cardBodyTwo);
};



//Quiz Maker
let quizMaker = () => {
  const shuffledQuiz = knuthShuffle(quizBank);
  quizArea.innerHTML = "";
  resetScore();
  for (let i = 0; i < shuffledQuiz.length; i++) {
    let questionDiv = document.createElement("div");
    questionDiv.setAttribute("id", `question_${i + 1}`);
    questionDiv.setAttribute("style", "display:none;");
    questionDiv.textContent = shuffledQuiz[i].question;
    quizArea.appendChild(questionDiv);
    if (shuffledQuiz[i].type === "Multiple") {
      let choiceUl = document.createElement("ul");
      choiceUl.setAttribute("class", "list-group")
      let shuffleChoices = knuthShuffle(shuffledQuiz[i].choices);
      for (let j = 0; j < shuffleChoices.length; j++) {
        let choiceLi = document.createElement("li");
        choiceLi.setAttribute("class", "list-group-item");
        // let choiceBtn = document.createElement("button");
        choiceLi.textContent = shuffleChoices[j];
        choiceLi.setAttribute("class", "list-group-item list-group-item-action list-group-item-primary li-margin li-choice");
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

//start button event
startBtn.addEventListener("click", function (event) {
  event.preventDefault();
  quizMaker();
  startDiv.setAttribute("style", "display:none;");
  const questionOne = document.getElementById("question_1");
  questionOne.setAttribute("style", "display:block;");
});
//start button event