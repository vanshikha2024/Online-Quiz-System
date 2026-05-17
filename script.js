let allQuestions = [];
let questions = [];

let currentQuestion = 0;
let score = 0;

let timer;
let timeLeft = 15;

const questionContainer =
    document.getElementById("question-container");

const nextBtn =
    document.getElementById("nextBtn");

const timerDisplay =
    document.getElementById("timer");

const categorySelect =
    document.getElementById("category");

// Fetch Questions
async function fetchQuestions() {

    const response = await fetch(
        "http://localhost:5000/questions"
    );

    allQuestions = await response.json();

    questions = [...allQuestions];

    loadQuestion();
}

// Load Question
function loadQuestion() {

    if (questions.length === 0) {

        questionContainer.innerHTML = `
            <h2>No Questions Found</h2>
        `;

        return;
    }

    if (currentQuestion >= questions.length) {

        finishQuiz();
        return;
    }

    resetTimer();

    let q = questions[currentQuestion];

    questionContainer.innerHTML = `
        <h2>${q.question}</h2>

        <div class="option">
            <input type="radio"
                name="option"
                value="${q.option1}">
            ${q.option1}
        </div>

        <div class="option">
            <input type="radio"
                name="option"
                value="${q.option2}">
            ${q.option2}
        </div>

        <div class="option">
            <input type="radio"
                name="option"
                value="${q.option3}">
            ${q.option3}
        </div>

        <div class="option">
            <input type="radio"
                name="option"
                value="${q.option4}">
            ${q.option4}
        </div>
    `;
}

// Timer
function startTimer() {

    timer = setInterval(() => {

        timeLeft--;

        timerDisplay.innerText =
            `Time Left: ${timeLeft}s`;

        if (timeLeft <= 0) {

            clearInterval(timer);

            nextQuestion();
        }

    }, 1000);
}

function resetTimer() {

    clearInterval(timer);

    timeLeft = 15;

    timerDisplay.innerText =
        `Time Left: ${timeLeft}s`;

    startTimer();
}

// Next Question
function nextQuestion() {

    const selected =
        document.querySelector(
            'input[name="option"]:checked'
        );

    if (
        selected &&
        selected.value ===
        questions[currentQuestion].correctAnswer
    ) {
        score++;
    }

    currentQuestion++;

    loadQuestion();
}

nextBtn.addEventListener("click", nextQuestion);

// Finish Quiz
function finishQuiz() {

    clearInterval(timer);

    // Hide elements
    categorySelect.style.display = "none";
    nextBtn.style.display = "none";

    document.getElementById(
        "aiQuestionBtn"
    ).style.display = "none";

    timerDisplay.style.display = "none";

    document.querySelector("h1")
        .style.display = "none";

    // Show result
    questionContainer.innerHTML = `
        <h2 style="
            text-align:center;
            font-size:60px;
        ">
            Quiz Completed 🎉
        </h2>

        <button id="restartBtn"
            style="margin-top:30px;">
            Restart Quiz
        </button>
    `;

    document.getElementById("score")
        .innerText = `Your Score: ${score}`;

    // Restart Quiz
    document.getElementById("restartBtn")
        .addEventListener("click", () => {

            currentQuestion = 0;
            score = 0;

            questions = [...allQuestions];

            categorySelect.style.display = "block";
            nextBtn.style.display = "block";

            document.getElementById(
                "aiQuestionBtn"
            ).style.display = "block";

            timerDisplay.style.display = "block";

            document.querySelector("h1")
                .style.display = "block";

            document.getElementById("score")
                .innerText = "";

            loadQuestion();
        });

    // Confetti
    confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.6 }
    });
}

// Category Filter
categorySelect.addEventListener("change", () => {

    let selectedCategory =
        categorySelect.value;

    if (selectedCategory === "all") {

        questions = [...allQuestions];
    }
    else {

        questions = allQuestions.filter(q =>

            q.category &&
            q.category.toLowerCase().trim() ===
            selectedCategory.toLowerCase().trim()
        );
    }

    currentQuestion = 0;
    score = 0;

    document.getElementById("score")
        .innerText = "";

    loadQuestion();
});

// Dark Mode
document.getElementById("darkModeBtn")
    .addEventListener("click", () => {

        document.body.classList.toggle("dark-mode");
    });

// AI Generated Question
const aiBtn =
    document.getElementById("aiQuestionBtn");

aiBtn.addEventListener("click", () => {

    const aiQuestions = [

        // HTML
        {
            question:
            "Which HTML tag creates a hyperlink?",

            option1: "link",
            option2: "a",
            option3: "href",
            option4: "url",

            correctAnswer: "a",

            category: "html"
        },

        {
            question:
            "Which HTML tag is used for images?",

            option1: "image",
            option2: "img",
            option3: "pic",
            option4: "src",

            correctAnswer: "img",

            category: "html"
        },

        // CSS
        {
            question:
            "Which CSS property changes text color?",

            option1: "font-color",
            option2: "text-color",
            option3: "color",
            option4: "background",

            correctAnswer: "color",

            category: "css"
        },

        {
            question:
            "Which CSS property changes background color?",

            option1: "bgcolor",
            option2: "background-color",
            option3: "color",
            option4: "background-style",

            correctAnswer: "background-color",

            category: "css"
        },

        // JavaScript
        {
            question:
            "Which keyword declares variables in JavaScript?",

            option1: "define",
            option2: "var",
            option3: "string",
            option4: "int",

            correctAnswer: "var",

            category: "javascript"
        },

        {
            question:
            "Which symbol is used for comments in JavaScript?",

            option1: "Double Slash",
            option2: "Star Slash",
            option3: "Hash",
            option4: "Percent",

            correctAnswer: "Double Slash",

            category: "javascript"
        }

    ];

    let selectedCategory =
        categorySelect.value;

    let filteredQuestions;

    if (selectedCategory === "all") {

        filteredQuestions = aiQuestions;
    }
    else {

        filteredQuestions =
            aiQuestions.filter(q =>
                q.category === selectedCategory
            );
    }

    const randomQuestion =
        filteredQuestions[
            Math.floor(
                Math.random()
                * filteredQuestions.length
            )
        ];

    // Prevent duplicate consecutive AI question
    questions.push(randomQuestion);

    allQuestions.push(randomQuestion);

    alert("AI Question Added 😎");
});

// Start App
fetchQuestions();