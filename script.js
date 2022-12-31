const startButton = document.getElementById('start-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerbtnsElemnt = document.getElementById('answer-btns')

const currentQuestionIndex =
startButton.addEventListener('click', startQuiz)

function startQuiz() {
console.log('Started')
startButton.classList.add('hide')
questionContainerElement.classList.remove('hide')
setNextQuestion()
}

function setNextQuestion() {
showQuestion(currentQuestionIndex)
}

function showQuestion() {
    questionElement.innerText = question.question
}

function selectAnswer() {

}

const question = [
    {
      question: 'What is a Flex-box?',
      answers: [
        { text: 'A box that you can bend', correct: false },
        { text: 'A one-dimensional layout method for aranging items in rows or columns', correct: true },
        { text: 'A CSS element that allows you to make the background of the page look like a box', correct: false },
        { text: 'The name of the newest video game console', correct: false }
      ]  
    }
]