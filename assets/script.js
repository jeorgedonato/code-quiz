//Random Number Picker
let randomNumPicker = () => {
  let num = Math.floor(Math.random()
    * quizObj.length + 1);
  return num;
}
//Random

let quizObj = {
  first: {
    question: "What is the command that we can use to change directory in the terminal command line?",
    choices: ["mv", "rm", "history", "cd"],
    answer: "cd",
    type: "Multiple",
  },
  second: {
    question: "What does SSH means?",
    choices: ["Secure Shell", "Secure Sheets", "Solid Shake", "Snake Sheets"],
    answer: "Secure Shell",
    type: "Multiple",
  },
  third: {
    question: "It is a CSS position that is always relative to the parent",
    choices: ["Relative", "Static", "Fixed", "Absolute"],
    answer: "Relative",
    type: "Multiple",
  },
  fourth: {
    question: "______ is a CSS property that is use to show an element on top of the another element",
    choices: ["margin", "z-index", "display", "visible"],
    answer: "z-index",
    type: "Multiple",
  },
  // fifth: {
  //   question: "What is the syntax for commenting a line in Javascript?",
  //   answer: "//",
  //   type: "Identification"
  // }
};

let highScores = new Object;
let quizArea = document.querySelector(".quiz-area");
let currentScore = 0;
let correctAnswers = 0;
let wrongAnswers = 0;

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

//Check the answer
let answerChecker = id => {
  const splittedAnswer = id.split("_");
  let correctAnswer = quizObj[splittedAnswer[0]].answer;
  const alertArea = document.querySelector("#alert-area");
  // console.log(correctAnswer + " = " + splittedAnswer[1])
  if (correctAnswer === splittedAnswer[1]) {
    currentScore + 5;
    correctAnswers++;
    alertArea.innerHTML = `<div class="alert alert-success" role="alert">You're ${getRandomMotivation()}! Keep up the good work!</div>`;
  } else {
    wrongAnswers++;
    alertArea.innerHTML = `<div class="alert alert-danger" role="alert">The answer is wrong! Come on now!</div>`;
  }
};
//Check the answer

//Quiz Maker
let quizMaker = () => {
  // const shuffledQuiz = knuthShuffle(quizObj);
  // console.log(shuffledQuiz)
  let orderCounter = 1
  for (const order in quizObj) {
    let questionDiv = document.createElement("div");
    questionDiv.setAttribute("class", `"question_${orderCounter}"`)
    questionDiv.textContent = quizObj[order].question;
    quizArea.appendChild(questionDiv);
    if (quizObj[order].type === "Multiple") {
      let choiceUl = document.createElement("ul");
      choiceUl.setAttribute("class", "list-group")
      let shuffleChoices = knuthShuffle(quizObj[order].choices);
      for (let i = 0; i < shuffleChoices.length; i++) {
        let choiceLi = document.createElement("li");
        choiceLi.setAttribute("class", "list-group-item");
        choiceLi.innerHTML = `<button class="btn btn-primary" id="${order}_${quizObj[order].choices[i]}" onclick="answerChecker(this.id)">${shuffleChoices[i]}</button>`;
        choiceUl.appendChild(choiceLi);
      }
      questionDiv.appendChild(choiceUl);
    }
    orderCounter++;
  }
};
//Quiz



quizMaker()