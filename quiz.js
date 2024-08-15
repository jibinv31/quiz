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
        question: "Which of the following will evaluate to true?",
        options: ["2 > 3", "2 < 3", "2 == 3", "2 === '2'"],
        correct: "2 < 3"
    },
    {
        question: "What is the output of `++a` if `a = 2`?",
        options: ["2", "3", "1", "4"],
        correct: "3"
    },
    {
        question: "Which array method removes the last element?",
        options: ["push()", "pop()", "splice()", "shift()"],
        correct: "pop()"
    },
    {
        question: "Which method is used to combine all elements of an array into a single string?",
        options: ["join()", "map()", "filter()", "reduce()"],
        correct: "join()"
    },
    {
        question: "What will `['a', 'b', 'c'].map(x => x.toUpperCase())` return?",
        options: ["['a', 'b', 'c']", "['A', 'B', 'C']", "['A', 'b', 'C']", "['a', 'B', 'C']"],
        correct: "['A', 'B', 'C']"
    },
    {
        question: "Which method is used to add an element to the beginning of an array?",
        options: ["push()", "pop()", "shift()", "unshift()"],
        correct: "unshift()"
    },
    {
        question: "What does `arr.reduce((a, b) => a + b)` do?",
        options: ["Adds all elements of `arr`", "Subtracts all elements of `arr`", "Concatenates all elements of `arr`", "Multiplies all elements of `arr`"],
        correct: "Adds all elements of `arr`"
    }
];

// Using Array Methods to manipulate data
let quizDataCopy = quizData.slice(); // Using slice() to create a shallow copy of the quizData array
quizDataCopy.push({
    question: "Which of the following is not a primitive data type in JavaScript?",
    options: ["Number", "String", "Boolean", "Object"],
    correct: "Object"
}); // Using push() to add a new question
quizDataCopy.splice(2, 1); // Using splice() to remove the third question from the copy
const easyQuestions = quizDataCopy.filter(q => q.options.length === 4); // Using filter() to get questions with exactly four options

// Using Array.map() and reduce()
const optionLengths = quizData.map(q => q.options.length); // Getting the length of options array for each question
const totalOptions = optionLengths.reduce((total, length) => total + length, 0); // Summing all option lengths

let currentQuestion = 0;
let score = 0;
let answered = false;

document.getElementById('start-quiz').addEventListener('click', () => {
    document.getElementById('quiz-container').style.display = 'block';
    document.getElementById('start-quiz').style.display = 'none';
    loadQuestion();
});

function loadQuestion() {
    const questionElement = document.getElementById('question');
    const options = document.querySelectorAll('.option');
    const resultElement = document.getElementById('result');

    resultElement.textContent = '';
    answered = false;

    questionElement.textContent = quizData[currentQuestion].question;
    options.forEach((option, index) => {
        option.textContent = quizData[currentQuestion].options[index];
        option.classList.remove('selected', 'correct', 'wrong');
    });
}

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
                document.getElementById('result').textContent = `Wrong! The correct answer is: ${quizData[currentQuestion].correct}`;
            }

            currentQuestion++;
            if (currentQuestion < quizData.length) {
                setTimeout(loadQuestion, 1500);
            } else {
                setTimeout(() => {
                    document.getElementById('quiz-container').innerHTML = `<h2>You scored ${score}/${quizData.length}</h2>`;
                }, 1500);
            }
        } else {
            alert("Please select an option before submitting.");
        }
    }
});

document.querySelectorAll('.option').forEach(option => {
    option.addEventListener('click', () => {
        if (!answered) {
            document.querySelectorAll('.option').forEach(option => option.classList.remove('selected'));
            option.classList.add('selected');
        }
    });
});

function changeTheme(backgroundColor, containerColor) {
    document.body.style.backgroundColor = backgroundColor;
    document.getElementById('quiz-container').style.backgroundColor = containerColor;
}
