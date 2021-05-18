
const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'True or False: A <br> separates lines within a paragraph.',
    answers: [
      { text: 'True', correct: true },
      { text: 'False', correct: false }
    ]
  },
  {
    question: 'What does HTML stand for?',
    answers: [
      { text: 'Hello To My Love', correct: false},
      { text: 'Hyper Type Marked Language', correct: false },
      { text: 'High Tolerance Mechanical Lever', correct: false },
      { text: 'Hyper Text Markup Language', correct: true }
    ]
  },
  {
    question: 'What does a compiler do?',
    answers: [
      { text: 'Converts coding into another language', correct: true },
      { text: 'Tests to see if a program runs', correct: false },
      { text: 'Combines different functions', correct: false },
      { text: 'Buffers long strings of code', correct: false }
    ]
  },
  {
    question: 'Which is the correct CSS syntax?',
    answers: [
      { text: '{body;color:black}', correct: false },
      { text: 'Body {color: black}', correct: true },
      { text: 'body:color=black', correct: false },
      { text: '{body:color=black(body}', correct: false }
    ]
  },
  {
    question: 'True/False: An advantage of external CSS is you can edit one file to edit the base of every page which uses it.',
    answers: [
      { text: 'True', correct: true },
      { text: 'False', correct: false }
    ]
  }
]