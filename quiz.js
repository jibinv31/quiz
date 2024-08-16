// An array to store all the quiz questions, options, and correct answers
const quizData = [
    {
        question: "What is the result of 5 + 3 * 2?",
        options: ["10", "16", "11", "13"],
        correct: "11"
    },
    {
        question: "What does `typeof null` return?",
        options: ["'object'", "'null'", "'undefined'", "'boolean'"],
        correct: "'object'"
    },
    {
        question: "What is the output of `10 % 3`?",
        options: ["1", "2", "3", "0"],
        correct: "1"
    },
    {
        question: "Which method is used to add an element to the beginning of an array?",
        options: ["push()", "pop()", "shift()", "unshift()"],
        correct: "unshift()"
    },
    {
        question: "Which operator is used to compare both value and type in JavaScript?",
        options: ["==", "===", "!=", "!=="],
        correct: "==="
    }
];

// Variables to keep track of the current question, score, and whether the question has been answered
let currentQuestion = 0;
let score = 0;
let answered = false;

// Event listener for the "Start Quiz" button
document.getElementById('start-quiz').addEventListener('click', () => {

    document.getElementById('quiz-container').style.display = 'block';

    document.getElementById('start-quiz').style.display = 'none';

    loadQuestion();
});

// Function to load a question and its options into the quiz
function loadQuestion() {
    // Get the elements where the question and result will be displayed
    const questionElement = document.getElementById('question');
    const options = document.querySelectorAll('.option');
    const resultElement = document.getElementById('result');

    // Clear any previous result text and reset the answered flag
    resultElement.textContent = '';
    answered = false;

    // Display the current question text
    questionElement.textContent = quizData[currentQuestion].question;

    // Loop through the options and display them
    options.forEach((option, index) => {
        option.textContent = quizData[currentQuestion].options[index];
        option.classList.remove('selected', 'correct', 'wrong'); // Reset any previous selection or correct/wrong styles
    });
}

// Event listener for the "Submit Answer" button
document.getElementById('submit-answer').addEventListener('click', () => {

    if (!answered) {

        const selectedOption = document.querySelector('.option.selected');

        if (selectedOption) {

            answered = true;

            if (selectedOption.textContent === quizData[currentQuestion].correct) {
                score++;
                selectedOption.classList.add('correct');
                document.getElementById('result').textContent = "Correct!";
            } else {
                selectedOption.classList.add('wrong');
                document.getElementById('result').textContent = `Wrong! The correct answer is: ${quizData[currentQuestion].correct}`; // Display the correct answer
            }

            currentQuestion++; // Move to the next question
            // Check if there are more questions
            if (currentQuestion < quizData.length) {
                // Load the next question after a short delay
                setTimeout(loadQuestion, 1500);
            } else {
                // Display the final score after a short delay
                setTimeout(() => {
                    document.getElementById('quiz-container').innerHTML = `<h2>You scored ${score}/${quizData.length}</h2>`;
                }, 1500);
            }
        } else {
            // If no option is selected, alert the user
            alert("Please select an option before submitting.");
        }
    }
});

// Event listeners for each option button (to select an answer)
document.querySelectorAll('.option').forEach(option => {
    option.addEventListener('click', () => {

        if (!answered) {

            document.querySelectorAll('.option').forEach(option => option.classList.remove('selected'));

            option.classList.add('selected');
        }
    });
});

// Function to change the theme of the quiz (background colors)
function changeTheme(backgroundColor, containerColor) {
    document.body.style.backgroundColor = backgroundColor;
    document.getElementById('quiz-container').style.backgroundColor = containerColor;
}
