//obtaining id elements from html
const startButton = document.getElementById('start-btn')
const questionContainerElement = document.getElementById('question-container')
const rulesHide = document.getElementById('rules-hide')
const questionElement = document.getElementById('question')
const answerBtnsElement = document.getElementById('answer-btns')
const nextBtn = document.getElementById('next-btn')
const submitButton = document.getElementById('submit-btn')
const quizForm = document.getElementById('quiz-form')
const inputField = document.getElementById('input-feild')

//setting time limts and the score at 0 before starting the quiz
let timeLimit = 60;
let timeLeft = timeLimit;
let shuffledQuestions, currentQuestionIndex;
let score = 0

let allHighscoresArr = JSON.parse(localStorage.getItem('highscores')) || [];

//questions
const questions = [
    {
        question: 'What is a Flex-box?',
        answers: [
            { text: 'A box that you can bend', correct: false },
            { text: 'A one-dimensional layout method for aranging items in rows or columns', correct: true },
            { text: 'A CSS element that allows you to make the background of the page look like a box', correct: false },
            { text: 'The name of the newest video game console', correct: false }
        ]
    },

    {
        question: 'What type of code is used to style a web-page?',
        answers: [
            { text: 'Python', correct: false },
            { text: 'JavaScript', correct: false },
            { text: 'CSS', correct: true },
            { text: 'HTML', correct: false }
        ]
    },

    {
        question: 'What does WWW stand for?',
        answers: [
            { text: 'World Wide Web', correct: true },
            { text: 'While Women Work', correct: false },
            { text: 'Work Work Work', correct: false },
            { text: 'World War Weaknesses', correct: false }
        ]
    },

    {
        question: 'How is the string variable written?',
        answers: [
            { text: 'Var name: [Cole]', correct: false },
            { text: 'Var name: Cole', correct: false },
            { text: 'Var name: {Cole}', correct: false },
            { text: 'Var name: "Cole"', correct: true }
        ]
    },

    {
        question: 'What is GitHub?',
        answers: [
            { text: 'It stores all your folders on the computer', correct: false },
            { text: 'It is a club in Montana', correct: false },
            { text: 'It is a cloud-based repository to help developers manage their repositories', correct: true },
            { text: 'A source-code editor made by Microsoft', correct: false }
        ]
    }
]

//function for startQuiz
function startQuiz() {
    rulesHide.classList.add('hide')
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

//function for setNextQuestion
function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

//function for showQuestion
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
        answerBtnsElement.appendChild(button)
    })
}

//function for resetState
function resetState() {
    nextBtn.classList.add('hide')
    while (answerBtnsElement.firstChild) {
        answerBtnsElement.removeChild
            (answerBtnsElement.firstChild)
    }

}

//function for selectAnswer
function selectAnswer(e) {
    const selectedBtn = e.target
    let correct = selectedBtn.dataset.correct
    console.log(correct)
    if (typeof correct === "undefined") {
        timeLeft -= 10
    }
    Array.from(answerBtnsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextBtn.classList.remove('hide')
    } else {
        questionContainerElement.classList.add('hide')
        submitButton.classList.remove('hide')
        quizForm.classList.remove('hide')
        
    }
}

//function for setStatusClass
function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
        score++;
    } else {
        element.classList.add('incorrect')
    }
}
//function for clearStatusClass
function clearStatusClass(element) {
    element.classList.add('correct')
    
}

//Look inside the localStorage for key name "highscores",
// if found, set the current key value of highscores as value for allHighscoresArr

//If key name 'highscores' is not found in local storage
// then set the value for allHighscoreArr = []


function saveResult() {
    //get initial from input field
    let initialVal = inputField.value

    //key-value pairs
    //create an object with both scores and initial of the player
    let initialObj = {
        score: score,
        initial: initialVal
    }
    //save: score, initial

    //push the object to the allHighscoresArr
    allHighscoresArr.push(initialObj)

    //save the array to localstorage
    localStorage.setItem("highscores", JSON.stringify(allHighscoresArr));
}

//Create timer function
startButton.addEventListener('click', () => {
    const timer = setInterval(function () {
        timeLeft--;
        document.getElementById("timer").innerHTML = timeLeft;
        if (timeLeft === 0) {
            clearInterval(timer);
        }
    }, 1000);
});

startButton.addEventListener('click', startQuiz)
nextBtn.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

submitButton.addEventListener('click', saveResult)





