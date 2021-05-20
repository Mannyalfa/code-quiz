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
// retrieve and display high score if saved otherwise display 0
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
    // use for loop to create a list of answers with clickable buttons for selected question
    var quizChoices = questions[currentQuestionIndex].choices;
    for (var i = 0; i < quizChoices.length; i++) {
        var quizChoice = quizChoices[i];
        var listitem = document.createElement("li");
        listitem.className = "list-choice";
        var selectButton = document.createElement("button");
        selectButton.className = "button-choice";
        selectButton.textContent = quizChoice;
        // give each answer a unique index so answer can be compared to correct answer
        selectButton.setAttribute("selectedIndex", i);
        // selected button will generate a click event
        selectButton.addEventListener("click", choiceClicked);
        listitem.appendChild(selectButton);
        // display all the answer buttons on the page
        quizAnswers.appendChild(listitem);
    }
}
// check if user entered right or wrong answer, display brief feedback message
function choiceClicked(event) {
    var Selection = event.target;
    if (Selection) {
        var buttonChosen = parseInt(Selection.getAttribute("selectedIndex"));
        var answerChoice = questions[currentQuestionIndex].answer;
        // if right increment score 
        if (buttonChosen === answerChoice) {
            selectionResponse.textContent = "CORRECT!";
            selectionResponse.style.color ='green';
            score += 5;
            // if wrong subtract time
        } else if (buttonChosen != answerChoice) {
            selectionResponse.textContent = "WRONG!";
            selectionResponse.style.color ='red';
            timer -= 10;
            //if time has expired,end quiz 
            if (timer <= 0) {
                gameOver();
            }
            timeLeft.textContent = timer;
        } 
        // Feedback message for 0.5 seconds unless timer has reached 0
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
//  Verify zero time before incrementing questions array index
function getNextQuestion() {
    if (timer <= 0) {
        gameOver();
        return;
    } else {
        ++currentQuestionIndex;
    }
    // if index indicates no more questions quiz over, else clear current question and build next question
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
    // clear timer, last question displayed, prepare to end quiz
    clearInterval(countDownTimer);
    clearAnswers();
    endQuiz();
}
// clear answer buttons by looping through choices, remove answer button at first index
// so as array shrinks, we are not trying to access a non existent index
function clearAnswers() {
    var count = quizAnswers.childElementCount;
    for (var i = 0; i < count; i++) {
        quizAnswers.removeChild(quizAnswers.childNodes[0]);
    }
}
var quizEnd = document.getElementById("quiz-end");
var submitButton = document.getElementById("submit-button");
// hide question screen, display recording score screen and final score
function endQuiz() {
    OpenQuestion.classList.add("hidden");
    quizEnd.classList.remove("hidden");
    var finalScore = document.getElementById("final-score");
    finalScore.textContent = score;
    // after user inputs initials and clicks submit button event to save score triggered
    submitButton.addEventListener("click", getInitials);
}
// user initials validated, if  this is first time quiz is played, an array is created to hold score data
// initials and score are saved to local storage if user current score is the highest score
const scoreName = "endscore";
var playerInitials = document.getElementById("initials");

function getInitials() {
    if (!playerInitials || playerInitials.value === "") {
        alert("Enter your initials, letters only");
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
    }
}
// user now has choice to clear all scores in storage
function clearLocalStorage() {
    document.querySelector("#show-high-score").value = "";
    document.querySelector("#view-high-score").textContent = 0;
    localStorage.clear(HighScoreArray);
}
// and/or start quiz over, score and question index are reset
function restartGame() {
    TopScore.classList.add("hidden");
    startgame.classList.remove("hidden")
    playerInitials.value = "";
    currentQuestionIndex = 0;
    score = 0;
}
// event handlers for start, go back(start game over) and clear all scores from storage
var startBtn = document.querySelector("#start-button");
var newGame = document.querySelector("#new-game");
var clearScoreBtn = document.querySelector("#clear-score");
startBtn.addEventListener("click", countDown);
newGame.addEventListener("click", restartGame);
clearScoreBtn.addEventListener("click", clearLocalStorage)
