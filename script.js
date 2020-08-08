// Note -> Some questions were taken from w3schools.
// Query/Questions/Answers Structure
// Array
// Object {}
// {
//  Question : 'String',
//  Answers : [Array], // If empty then it's true or false question then index 0 || 1
//  CorrectAnswerIndex: #
// }

const quiz = [
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
];
