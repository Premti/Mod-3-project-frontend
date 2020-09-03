const questionsURL = "http://localhost:3000/questions/"
const usersURL = "http://localhost:3000/users/"

const mainDiv = document.querySelector("#quiz-header")
const mainH1 = document.createElement("h1")

// const createH3 = name => {
    const theH3 = document.createElement("h3")
    theH3.id = "the-text"
    
// }

const nameForm = document.createElement("form")
nameForm.id = "name-form"
const nameInput = document.createElement("input")
nameInput.name = 'name'
nameInput.type = "text"
nameInput.placeholder = "enter your name here..."
const nameBtn = document.createElement("button")
nameBtn.innerText = "Submit"
nameBtn.className="btn btn-light"
nameForm.className="form-center"
nameForm.append(nameInput, nameBtn)
document.body.appendChild(nameForm)

const apiHeaders = {
        "Content-type": "application/json",
        accept: "application/json"
}

let questionsArray = []
let score = 0

fetch(questionsURL)
.then(data => data.json())
.then(questions => setQuestions(questions))

const incorrectAnswer = () => {
    newQuizMaster() 
    theH3.remove()
}

const correctAnswer = () => {
    score++
    newQuizMaster()
    theH3.remove()
}

const renderQuestion = question =>{
    mainDiv.innerText = ""
    const questionDiv = document.createElement("div")
    questionDiv.className = "Question-div"
    const myQuestion = document.createElement("h2")
    myQuestion.id = "question-style"
    const answer = document.createElement("button")
    const wrongAnswer = document.createElement("button")
    const secondWrongAnswer = document.createElement("button")
    const thirdWrongAnswer = document.createElement("button")
    answer.className="btn btn-white btn-lg"
    wrongAnswer.className="btn btn-white btn-lg"
    secondWrongAnswer.className="btn btn-white btn-lg"
    thirdWrongAnswer.className="btn btn-white btn-lg"
    answer.className="button1"
    wrongAnswer.className="button2"
    secondWrongAnswer.className="button3"
    thirdWrongAnswer.className="button4"
    const answersDiv = document.createElement("div")
    answersDiv.id = "button-id"
    answersDiv.className = "fixed-bottom" 
    thirdWrongAnswer.addEventListener("click", incorrectAnswer)
    wrongAnswer.addEventListener("click", incorrectAnswer)
    secondWrongAnswer.addEventListener("click", incorrectAnswer)
    answer.addEventListener("click", correctAnswer)

    wrongAnswer.innerHTML = question.incorrect_answers[0].answer
    secondWrongAnswer.innerHTML = question.incorrect_answers[1].answer
    thirdWrongAnswer.innerHTML = question.incorrect_answers[2].answer
    answer.innerHTML = question.correct_answer.answer

    answersDiv.append(answer, wrongAnswer, secondWrongAnswer, thirdWrongAnswer)
    questionDiv.append(myQuestion, answersDiv)
    for (var i = answersDiv.children.length; i >= 0; i--) {
    answersDiv.appendChild(answersDiv.children[Math.random() * i | 0]);
        }
    myQuestion.innerHTML = question.question
    mainDiv.append(questionDiv)
}

const newQuizMaster = () => {
if (questionsArray.length > 0){
    const question = questionsArray.pop()
    renderQuestion(question)
}else{mainDiv.innerText = `Congratulations, your score is ${score}!`}
}

const setQuestions = questions => {
    questionsArray = questions
    newQuizMaster()
}

const buttonEvent = (event) => {
    event.preventDefault()
    username = event.target.name.value
    theH3.innerText = `Good luck in the quiz ${username}!`
    nameForm.remove()
    post(usersURL, {name: username}).then((data) => document.body.append(theH3))  
}

nameForm.addEventListener("submit", buttonEvent)

const post = (usersURL, bodyObj) => {
    return fetch(usersURL, {
        method: "POST",
        headers: apiHeaders,
        body: JSON.stringify(bodyObj)
    }).then(data => data.json())
}



