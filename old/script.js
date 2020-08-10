// Query/Questions/Answers Structure
// Array
// Object {}
// {
//  Question : 'String',
//  Answers : [Array], // If empty then it's true or false question then index 0 || 1
//  CorrectAnswerIndex: #
// }
// 10 questions (objects within array) with respective answers
const quizArray = [
  {
    question:
      'Can you have an object within an object within an array within another object in JS?',
    answers: [],
    correctAnswerIndex: 0,
  },
  {
    question: 'Does JavaScript have lexical scope?',
    answers: [],
    correctAnswerIndex: 0,
  },
  {
    question: 'Where is the correct place to insert a JavaScript?',
    answers: [
      `Both the "head" section and the "body" section are correct`,
      `The "body" section`,
      `The "head" section`,
    ],
    correctAnswerIndex: 0,
  },
  {
    question: 'Is JavaScript able to run games?',
    answers: [],
    correctAnswerIndex: 0,
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
    question: 'What will the following code output?  5 += 5; ',
    answers: [' 5 ', ' 10 ', 'None of the above'],
    correctAnswerIndex: 1,
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

// Has some samples already added
let highScores = [
  { name: 'AK', score: 22 },
  { name: 'BK', score: 32 },
  { name: 'CK', score: 42 },
  { name: 'DK', score: 52 },
  { name: 'EK', score: 62 },
  { name: 'FK', score: 72 },
];

// Variables
let timer = 60;
let myIntervalTimer;
let hasTime = true;
let correctAnswer = undefined;
let chosenAnswer = undefined;
let queryLimit = quizArray.length - 1;
let currentScore = 0;

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
    $('#startBtn').text('Go Back').on('click', resetToDefault);
  }
}
function resetToDefault() {
  // Reset Header
  $('#question').text('Welcome to your JS Quiz.');

  // Delete List reload Quiz
  $('#answersList').empty();

  // Reset Button
  $('#startBtn').text('Start');
  listeners();
}
function clearTimer() {
  clearInterval();
}

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

function loadQuestion(query) {
  // Replaces top header with a question.
  $('#question').text(`${query}`);
}

function clearList() {
  $('#answersList').empty();
}
function inputForm() {
  // Change question to subject
  $('#question').text('Enter your name for Score Board.');
  $('.card ul').html(
    `<form><p>Your Score: ${currentScore}</p><input placeholder="Your Name" type="text" /></form>`
  );
  $('#startBtn').toggle('opaZero');

  $('#startBtn').text('Submit');
  $('#startBtn').on('click', loadHighScore);
}
function checkAnswer(id) {
  chosenAnswer = id;

  if (chosenAnswer === correctAnswer) {
    // Increase points for selecting the correct choice
    currentScore++;

    // flash user correct message;

    queryLimit--;
    if (queryLimit < 0) {
      inputForm();
    }
    loadQuiz();
  } else {
    // incorrect

    queryLimit--;
    if (queryLimit < 0) {
      inputForm();
    }
    loadQuiz();
  }
}

function loadAnswers(answers) {
  // Iterate through given array and output to UL > Li
  answers.forEach((element, index) => {
    $('#answersList').append(
      `<li><a href="#" id="${index}">${element}</a></li>`
    );

    // Dynamically Create a listener per answer
    $(`#${index}`).on('click', () => {
      // Index = id to determine if answer choice is correct
      checkAnswer(index);
    });
  });
}

function loadQuiz() {
  // Clear list for next answers -> ignores if empty
  clearList();

  // recursive function runs till queryLimit is less then 0
  if (queryLimit < 0) {
    return true;
  }

  // Load question
  loadQuestion(quizArray[queryLimit].question);

  // Get answer form Obj and set to global variable
  correctAnswer = quizArray[queryLimit].correctAnswerIndex;

  // If Answers array is empty then it's a True or False Question
  if (quizArray[queryLimit].answers.length === 0) {
    // For True/False
    loadAnswers(['1. True ', '2. False']);
  } else {
    // Send in array of answers
    loadAnswers(quizArray[queryLimit].answers);
  }
}

// Runs at starts but it's also the end :O
function onCompletion() {
  // Start Timer
  myTimer();

  // Opacity 0 Button
  $('#startBtn').toggle('opaZero');

  // Add empty area for "Correct/Incorrect message"
  $('#answersList').after('<p id="toast" class="opaZero" >-----</p>');
  // returns true if done
  loadQuiz();
}

function controllerFunction(e) {
  e.preventDefault();

  // If Back Button
  if ($('#startBtn').text() !== 'Start') {
    resetToDefault();
  } else {
    // Start Quiz
    onCompletion();
  }
}
function listeners() {
  // View HighScore
  $('nav a').on('click', loadHighScore);

  // Button Actions
  $('#startBtn').on('click', controllerFunction);
}

$('document').ready(listeners);
