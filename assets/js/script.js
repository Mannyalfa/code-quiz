// event handlers for start, restart and clear all scores 
var startBtn = document.querySelector("#start-button");
var newGame = document.querySelector("#new-game");
var clearScoreBtn = document.querySelector("#clear-score");
startBtn.addEventListener("click", countDown);
newGame.addEventListener("click", restartGame);
clearScoreBtn.addEventListener("click", clearLocalStorage)


var score = 0;
var savedScores = [];
// object array for quiz questions, answers and answer key
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
    timer = questions.length * 12;
    countDownTimer = setInterval(function () {
        timeLeft.textContent = timer;
        timer--;
        // when quiz times out before user answers all question
        if (timer === 0) {
            gameOver()
        }
    }, 1000);
    // hide start page and build questions
    startgame.classList.add("hidden");
    buildQuiz();
}
// retrieve and display high score-if applicable
function retreiveHighScore() {
    var HighScore = localStorage.getItem(scoreName);
    var HighScoreArray = JSON.parse(HighScore);
    if (HighScoreArray) {
        return retrieveHighScore = HighScoreArray[0].newScore;
    } else return 0;
}
// get question at currentQuestionIndex and display
var OpenQuestion = document.getElementById("quiz-question");
var quizAnswers = document.getElementById("quiz-answers")
var currentQuestionIndex = 0;

function buildQuiz() {
    OpenQuestion.classList.remove("hidden");
    var quizQuestion = questions[currentQuestionIndex].question;
    OpenQuestion.textContent = quizQuestion;
    // for loop to display answer choices
    var quizChoices = questions[currentQuestionIndex].choices;
    for (var i = 0; i < quizChoices.length; i++) {
        var quizChoice = quizChoices[i];
        var listitem = document.createElement("li");
        listitem.className = "list-choice";
        var selectButton = document.createElement("button");
        selectButton.className = "button-choice";
        selectButton.textContent = quizChoice;
        // give each answer a unique index r
        selectButton.setAttribute("selectedIndex", i);
        // generate clock event to choose answer
        selectButton.addEventListener("click", choiceClicked);
        listitem.appendChild(selectButton);
        // display all the answer buttons on page
        quizAnswers.appendChild(listitem);
    }
}
// display response based on answer
function choiceClicked(event) {
    var Selection = event.target;
    if (Selection) {
        var buttonChosen = parseInt(Selection.getAttribute("selectedIndex"));
        var answerChoice = questions[currentQuestionIndex].answer;
        // if right increment score 
        if (buttonChosen === answerChoice) {
            selectionResponse.textContent = "CORRECT!";
            selectionResponse.style.color ='green';
            document.getElementById('correct-sound').play();
            score += 20;
            // subtract time for wrong answer
        } else if (buttonChosen != answerChoice) {
            selectionResponse.textContent = "WRONG!";
            selectionResponse.style.color ='red';
            document.getElementById('wrong-sound').play();
            timer -= 10;
            //time expired,end quiz 
            if (timer <= 0) {
                gameOver();
            }
            timeLeft.textContent = timer;
        } 
        
        if (timer > 0) {
            selectionResponse.removeAttribute( "hidden");
            selectionResponse.setAttribute("class", "feedback")
            setTimeout(feedBackTimeout, 500);
        }
    }
}
var selectionResponse = document.getElementById("selection-response");

function feedBackTimeout() {
    selectionResponse.setAttribute("class", "hidden");
    getNextQuestion();
}
//  get next question
function getNextQuestion() {
    if (timer <= 0) {
        gameOver();
        
        return;
    } else {
        ++currentQuestionIndex;
    }

    if (currentQuestionIndex >= questions.length) {
        gameOver();
    } else {
        clearAnswers();
        buildQuiz();
    }
}
// if game over set timer to 0, display text game over message 
function gameOver() {
    timer = 0;
    timeLeft.textContent = "Game Over!";
    document.getElementById('end-sound').play();
    

    // clear timer, last question displayed, prepare to end quiz
    clearInterval(countDownTimer);
    clearAnswers();
    endQuiz();
}
// for loop for answers
function clearAnswers() {
    var count = quizAnswers.childElementCount;
    for (var i = 0; i < count; i++) {
        quizAnswers.removeChild(quizAnswers.childNodes[0]);
    }
}
var quizEnd = document.getElementById("quiz-end");
var submitButton = document.getElementById("submit-button");
// hide question, display score and final score
function endQuiz() {
    OpenQuestion.classList.add("hidden");
    quizEnd.classList.remove("hidden");
    var finalScore = document.getElementById("final-score");
    finalScore.textContent = score;
    // after user inputs initials and clicks submit button event to save score triggered
    submitButton.addEventListener("click", getInitials);
}
// user initials validated, data saved to local storage
const scoreName = "endscore";
var playerInitials = document.getElementById("initials");

function getInitials() {
    if (!playerInitials || playerInitials.value === "") {
        alert("Enter your initials");
        return;
    } else {
        var HighScore = localStorage.getItem(scoreName);
        var HighScoreArray = JSON.parse(HighScore);
        if (!HighScoreArray || score > HighScoreArray[0].newScore) {
            var scoreData = {
                name: playerInitials.value,
                newScore: score
            };
            if (!HighScoreArray) HighScoreArray = [];
            HighScoreArray.push(scoreData);
            HighScoreArray.sort(function (a, b) {
                return -(a.newScore - b.newScore)
            });
            localStorage.setItem(scoreName, JSON.stringify(HighScoreArray));
        }
    }
    showResults();
}
// initials screen hidden and results retrieved from local storage are displayed 
var TopScore = document.getElementById("show-score");

function showResults() {
    quizEnd.classList.add("hidden");
    TopScore.classList.remove("hidden");
    var showTopScore = document.querySelector("#show-high-score");
    var HighScore = localStorage.getItem(scoreName);
    HighScoreArray = JSON.parse(HighScore);
    if (HighScoreArray) {
        showTopScore.value = "1. " + HighScoreArray[0].name + ":" + HighScoreArray[0].newScore;
        document.getElementById('cheer').play();
    }
}
// clear scores function
function clearLocalStorage() {
    document.querySelector("#show-high-score").value = "";
    document.querySelector("#view-high-score").textContent = 0;
    localStorage.clear(HighScoreArray);
}
// Game restart
function restartGame() {
    TopScore.classList.add("hidden");
    startgame.classList.remove("hidden")
    playerInitials.value = "";
    currentQuestionIndex = 0;
    score = 0;
}
