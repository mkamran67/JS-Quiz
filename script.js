/* ---------------------- DATA */
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

// Later -> Limit to TOP 3
// let highScores = [
//   { name: 'AK', score: 2 },
//   { name: 'BK', score: 2 },
//   { name: 'CK', score: 4 },
// ];
// An Array of Objects
let highScores = [];

//  1. On click of View High Scores Load() High Scores
//  2. On START -> Load First Question

// ↙ Logical Steps ↘
// Question -> Next Question on Selection & Check If Correct
// IF Correct TIMER++ && SCORE++
// IF !nextQuestion -> Finish || IF BOOL=false -> Bool = Timer
// END QUIZ -> Display Form with Input

// QUESTIONS <-> List
// 🛑 ON Dynamic Listing Create Listeners <- Bad Performance
// -> Better to listen on Click events on the UL e.target <-
// QueryLength-- && checkAnswers(e.target.value)
// -> load() Question

/* ---------------------- Variables */
let quizCounter = quizArray.length - 1;
let currentCorrectAnswer = null;
let currentScore = 0;
let quizTimer = 60;

/* ---------------------- Listeners */
$('document').ready(() => {
  $('#scores').on('click', showScores);
  $('#starter').on('click', controlFunction);
  $('ul').on('click', checkAnswer);
  // Get scores on page load 💯
  if (localStorage.hasOwnProperty('scores')) {
    highScores = JSON.parse(localStorage.getItem('scores'));
  }
});

function updateLocalStorage() {
  // Save Scores to local Storage
  localStorage.setItem('scores', JSON.stringify(highScores));
}

function timer() {
  // Set Interval to check every second if timer has expired
  let tempTimer = setInterval(() => {
    // Check to see if Timer has expired
    if (quizTimer <= 0) {
      // if Expired
      endGame(); // -> End Quiz
      clearInterval(tempTimer); // End interVal
    } else {
      // Update timer
      $('#qTimer').text(`${quizTimer}`);
      quizTimer--;
    }
  }, 1000);
}

function controlFunction() {
  // Check What the button text is, to determine action. 🧈
  if ($('#starter').text() === 'Start Quiz') {
    // Start Quiz
    loadQuestion();
    // Start Timer
    timer();
  } else {
    // End Quiz -> Submit
    // Check if Input is empty or space(s)
    if ($('#finInput').val() === '') {
      alert('Please input valid initials');
    } else {
      // Create temp Obj to hold current Initials & Score
      let tempObj = {
        name: $('#finInput').val().toUpperCase(),
        score: currentScore,
      };

      // Push scoreObj to High Scores
      highScores.push(tempObj);

      // Update LocalStorage
      updateLocalStorage();

      // Show Leader board
      showScores();

      // Reset Variables
      quizCounter = quizArray.length - 1;
      currentCorrectAnswer = null;
      currentScore = 0;
      quizTimer = 60;
    }
  }
}

function loadQuestion() {
  // Check if any questions left -> Counter
  // if Less END GAME else Load Question
  if (quizCounter < 0 || quizTimer <= 0) {
    endGame();
  } else {
    // Change Header <- Question
    $('#question').text(`${quizArray[quizCounter].question}`);
    // Empty List
    $('.answers').empty();
    // Populate List -> Loop through Answers && Determine T||F

    if (quizArray[quizCounter].answers.length > 0) {
      // Populate multiple choice questions 🌓🌛🌗🌜⁉
      quizArray[quizCounter].answers.forEach((element, index) => {
        $('.answers').append(`
        <li>
            <button id="${index}">${element}</button>
        </li>`);
      });
    } else {
      // Since it's a True or False Question 🌓
      $('.answers').append(`
        <li>
            <button id="0">True</button>
        </li>
        <li>
            <button id="1">False</button>
        </li>`);
    } // END -> Else

    // Disable Start Button
    $('#starter').hide();

    // Load Correct Answer
    currentCorrectAnswer = quizArray[quizCounter].correctAnswerIndex;

    // Lastly Decrement Query List (array) Amount with Counter
    quizCounter--;
  }
}

function checkAnswer(e) {
  let id = parseInt(e.target.id, 10);

  // Set 4, that's Max Multiple choice questions in the array.
  if (id <= 4) {
    // Check for correct answer & load next question
    if (id === currentCorrectAnswer) {
      // Correct ✔
      // console.log(`Correct`, id, currentCorrectAnswer);
      $('.card').removeClass('incorrect-shadow');
      $('.card').toggleClass('correct-shadow');
      setTimeout(() => {
        $('.card').toggleClass('correct-shadow');
      }, 1000);
      currentScore++;
    } else {
      // Incorrect ❌
      // console.log(`Incorrect`, id, currentCorrectAnswer);
      $('.card').removeClass('correct-shadow');
      $('.card').toggleClass('incorrect-shadow');
      setTimeout(() => {
        $('.card').toggleClass('incorrect-shadow');
      }, 1000);

      // Subtract Timer (10 seconds) ⏳
      quizTimer -= 10;
      $('#qTimer').css('color', 'red');
      $('#qTimer').css('font-size', '2rem');
      setTimeout(() => {
        $('#qTimer').css('color', 'black');
        $('#qTimer').css('font-size', '1.2rem');
      }, 1500);
    }

    // Load Next Question
    loadQuestion();
  }
}

function showScores() {
  // Change Header
  $('#question').text(`High Scores`);
  // Empty List
  $('.answers').empty();
  // Populate List
  highScores.forEach((element) => {
    $('.answers').append(`
    <li>
        <p class="initials">${element.name}</p>
        <p class="score">${element.score}</p>
    </li>`);
  });

  // Reset Button to -> Start Quiz
  $('#starter').text('Start Quiz');
}

function endGame() {
  // Set timer to 0
  quizTimer = 0;

  // Reset Timer
  $('#qTimer').text('00');

  // Change Question
  $('#question').text(`You Scored ${currentScore}/${quizArray.length}`);

  // Empty List 📃
  $('.answers').empty();

  // Populate Form
  $('.answers').append(
    '<input placeholder="Your Initials" id="finInput" type="text" />'
  );

  // Change & Show Start button into Submit Score
  $('#starter').text('Submit');
  $('#starter').show();
}

// (message, tune -> True for Good 👍 || False for Bad 👎)
function toaster(msg, tune = true) {}
