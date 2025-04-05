const questions = [
    {
        question: "Jaki jest największy ocean na świecie?",
        answers: ["Ocean Atlantycki", "Ocean Spokojny", "Ocean Indyjski", "Ocean Arktyczny"],
        correct: 1
    },
    {
        question: "Które miasto jest stolicą Francji?",
        answers: ["Londyn", "Berlin", "Paryż", "Rzym"],
        correct: 2
    },
    // Dodaj więcej pytań tutaj
];

let currentQuestionIndex = 0;
let score = 0;

const questionElem = document.getElementById('question');
const answersElem = document.getElementById('answers');
const nextBtn = document.getElementById('next-btn');
const resultElem = document.getElementById('result');

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElem.textContent = currentQuestion.question;
    answersElem.innerHTML = '';
    currentQuestion.answers.forEach((answer, index) => {
        const answerBtn = document.createElement('button');
        answerBtn.textContent = answer;
        answerBtn.classList.add('bg-gray-200', 'text-gray-800', 'px-4', 'py-2', 'rounded', 'hover:bg-gray-300');
        answerBtn.addEventListener('click', () => selectAnswer(index));
        answersElem.appendChild(answerBtn);
    });
}

function selectAnswer(index) {
    const currentQuestion = questions[currentQuestionIndex];
    if (index === currentQuestion.correct) {
        score++;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    questionElem.textContent = '';
    answersElem.innerHTML = '';
    nextBtn.style.display = 'none';
    resultElem.textContent = `Twój wynik: ${score} z ${questions.length}`;
}

nextBtn.addEventListener('click', loadQuestion);

loadQuestion();