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
let answeredQuestions = 0;
const startBtn = document.querySelector("#start-btn");
const startDiv = document.querySelector(".start-btn-div");

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

  // console.log(`${answeredQuestions} - ${quizBank.length}`)
  // if (answeredQuestions === quizBank.length) {
  //   return;
  // }
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
    document.querySelector(`#question_${index}`).setAttribute("style", "display:none;");
    document.querySelector(`#question_${parseInt(index) + 1}`).setAttribute("style", "display:block;");
    // console.log(nextQuestion)
    answeredQuestions++;
    // console.log(`Score is ${currentScore}`)
  }
});
//Answer Checker


//Quiz Maker
let quizMaker = () => {
  const shuffledQuiz = knuthShuffle(quizBank);
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
        // choiceLi.innerHTML = `<button class="btn btn-primary" id="${shuffledQuiz[i].id}_${shuffledQuiz[i].choices[j]}_${i + 1}" onclick="answerChecker(this.id)">${shuffleChoices[j]}</button>`;
        // choiceLi.appendChild(choiceBtn)
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
  questionOne.setAttribute("style", "display:block;")
});
//start button event