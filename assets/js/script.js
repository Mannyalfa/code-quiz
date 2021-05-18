var score = 0;
var savedScores = [];
// object array for quiz questions, multiple choices for answers, and actual answer
var questions = [{
    question: "What are the CSS properties that are used to add space around sections of content?",
    choices: [
        "Padding",
        "Spacing",
        "Break",
        "Margin"

    ],
    answer: 0
},
{
    question: "In JavaScript, what is used in conjunction with HTML to 'react' to certain elements?",
    choices: [
        "Boolean",
        "Condition",
        "RefExp",
        "Events"
    ],
    answer: 3
},
{
    question: "Which is the correct CSS syntax?",
    choices: [
        "{body;color:black}",
        "Body {color: black}",
        "body:color=black",
        "{body:color=black(body}"
    ],
    answer: 2
},

{
    question: "True/False: JavaScript Object Notation or JSON is a syntax for storing and exchanging data",
    choices: [
        "True",
        "False",
    ],
    answer: 0
},

{
    question: "Here's a hard one: which iof these would be a PALINDROME STRING?",
    choices: [
        "Hello World!" ,
        "rotator",
        "palindrome",
        "12345"
    ],
    answer: 1
    
},
];
// load start page-set timer-start quiz 
var startgame = document.getElementById("start-page");
var timeLeft = document.querySelector("#timer");
var countDownTimer;

function countDown() {
    var viewHighScore = document.querySelector("#view-high-score");
    viewHighScore.textContent = retreiveHighScore();
    timer = questions.length * 15;
    countDownTimer = setInterval(function () {
        timeLeft.textContent = timer;
        timer--;
        // if time expires before any question is answered, quiz over
        if (timer === 0) {
            gameOver()
        }
    }, 1000);
    // hide start page and build questions
    startgame.classList.add("hidden");
    buildQuiz();
}