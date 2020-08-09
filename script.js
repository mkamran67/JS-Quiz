// Note -> Some questions were taken from w3schools.
// Query/Questions/Answers Structure
// Array
// Object {}
// {
//  Question : 'String',
//  Answers : [Array], // If empty then it's true or false question then index 0 || 1
//  CorrectAnswerIndex: #
// }
// 10 questions (objects) with respective answers
const quizArray = [
  {
    question: 'Inside which HTML element do we put the JavaScript?',
    answers: ['<script>', '<js>', '<scripting>', '<javascript>'],
    correctAnswerIndex: 0,
  },
  {
    question:
      'Is the following correct JS syntax to change the contents of an HTML element?\n <p id="demo">This is a demonstration.</p> \n document.getElementById("demo").innerHTML = "Hello World!"',
    answers: [],
    correctAnswerIndex: 0,
  },
  {
    question: 'Where is the correct place to insert a JavaScript?',
    answers: [
      'Both the <head> section and the <body> section are correct',
      'The <body> section',
      'The <head> section',
    ],
    correctAnswerIndex: 0,
  },
  {
    question:
      'What is the correct syntax for referring to an external script called "xxx.js"?',
    answers: [
      '<script name="xxx.js">',
      '<script src="xxx.js">',
      '<script href="xxx.js">',
    ],
    correctAnswerIndex: 1,
  },
  {
    question: 'The external JavaScript file must contain the <script> tag.',
    answers: [],
    correctAnswerIndex: 1,
  },
  {
    question: 'Are you able to manipulate how page looks with JS?',
    answers: [],
    correctAnswerIndex: 0,
  },
  {
    question: 'How do you create a function in JavaScript?',
    answers: [
      'function myFunction()',
      'const myFunction = () => {}',
      'const myFunction = function(){}',
      'All of the above.',
    ],
    correctAnswerIndex: 3,
  },
  {
    question:
      'What will the following code output?\n\n true ? console.log(5) : console.log(10) ',
    answers: [' 5 ', ' 10 ', 'None of the above'],
    correctAnswerIndex: 0,
  },
  {
    question: 'Is Jquery part of JavaScript?',
    answers: [],
    correctAnswerIndex: 1,
  },
  {
    question: 'Is JavaScript an OOP (Object Oriented Programming) language?',
    answers: [],
    correctAnswerIndex: 0,
  },
];

let highScores = [
  { name: 'AK', score: 22 },
  { name: 'BK', score: 32 },
  { name: 'CK', score: 42 },
  { name: 'DK', score: 52 },
  { name: 'EK', score: 62 },
  { name: 'FK', score: 72 },
];

function loadHighScore() {
  $('#question').text('High Scores | Leader Boards');

  // List High Scores --> If not empty list else output "empty"
  if (highScores.length > 0) {
    // if normal view is up hide it.
    // $('#centered-container').toggle(``); // Delete Main Section

    // Reset board
    $('#answersList').html('');

    //iterate through highScores and Append
    highScores.forEach((element, index) => {
      $('#answersList').append(
        `<li id="highScore${index}"> Name: ${element.name} &nbsp&nbsp&nbsp&nbsp&nbsp Score: ${element.score}</li>`
      );
    });

    // Change Start btn to back btn
    $('#startBtn').text('Go Back');
  }
}

function resetToDefault() {
  // Reset Header
  $('#question').text('Welcome to your JS Quiz.');

  // Delete List reload Quiz
  $('#answersList').empty();

  // Reset Button
  $('#startBtn').text('Start');
}
function clearTimer() {
  clearInterval();
}

let timer = 60;
let myIntervalTimer;
let hasTime = true;

function myTimer() {
  myIntervalTimer = setInterval(() => {
    if (timer < 0) {
      hasTime = false;
      clearInterval(myIntervalTimer);
    }

    // console.log(`${timer}`);
    $('#timer').text(`${timer}`);
    timer--;
  }, 1000);
}

function answerListeners() {
  $('#answersList ul li a').on('click', (e) => {
    console.log(e);
    console.log(`clicked`);
  });
}

function loadQuestion(query) {
  $('#question').text(`${query}`);
}

function checkAnswer(text) {}

function loadAnswers(answers) {
  answers.forEach((element, index) => {
    $('#answersList').append(
      `<li><a href="#" id="index${index}">${element}</a></li>`
    );

    // Dynamic Create a listener
    $(`#index${index}`).on('click', () => {
      checkAnswer($(`#index${index}`).text());
    });
  });
}

function loadQuiz() {
  console.log(`Loaded Quiz`);
  // 0 - 9 = 10
  let queryLimit = quizArray.length - 1;

  // Load question
  // console.log(quizArray[queryLimit].question);
  loadQuestion(quizArray[queryLimit].question);

  // Check if True or False
  if (
    quizArray[queryLimit].answers.length === 0 ||
    quizArray[queryLimit].answers.length === null ||
    quizArray[queryLimit].answers.length === undefined
  ) {
    loadAnswers(['1. True ', '2. False']);
  } else {
    loadAnswers(quizArray[queryLimit].answers);
  }
  // Start Timer
  myTimer();
}

function controllerFunction(e) {
  e.preventDefault();

  // If Back Button
  if ($('#startBtn').text() !== 'Start') {
    resetToDefault();
  } else {
    // Start Quiz
    loadQuiz();
  }
}
function listeners() {
  // View HighScore
  $('nav a').on('click', loadHighScore);

  // Button Actions
  $('#startBtn').on('click', controllerFunction);
}

$('document').ready(listeners);
