const startBtn = document.getElementById("startBtn");
const quizSection = document.getElementById("quiz");
const questionText = document.getElementById("questionText");
const answerButtons = document.getElementById("answerButtons");
const timerDisplay = document.getElementById("timer");
const scoreDisplay = document.getElementById("score");
const nextBtn = document.getElementById("nextBtn");
const categorySelect = document.getElementById("categorySelect");

let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 30;
let timerInterval;

startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  showQuestion();
});

function startQuiz() {
  const selectedCategory = categorySelect.value;
  questions = getQuestionsByCategory(selectedCategory);
  currentQuestionIndex = 0;
  score = 0;
  timeLeft = 30;
  scoreDisplay.textContent = "🏆 Score: 0";
  timerDisplay.textContent = `⏳ Time: ${timeLeft}`;
  quizSection.classList.remove("hidden");
  startTimer();
  showQuestion();
}

function startTimer() {
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `⏳ Time: ${timeLeft}`;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      alert("⏰ Time's up! Final Score: " + score);
      location.reload();
    }
  }, 1000);
}

function showQuestion() {
  resetState();
  const question = questions[currentQuestionIndex];
  questionText.textContent = question.q;
  question.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.classList.add("bg-blue-500", "hover:bg-blue-600", "text-white", "px-4", "py-2", "rounded", "transition", "w-full");
    btn.addEventListener("click", () => selectAnswer(btn, option === question.answer));
    answerButtons.appendChild(btn);
  });
}

function resetState() {
  answerButtons.innerHTML = "";
  nextBtn.classList.add("hidden");
}

function selectAnswer(button, isCorrect) {
  if (isCorrect) {
    score++;
    scoreDisplay.textContent = `🏆 Score: ${score}`;
    button.classList.add("correct");
  } else {
    button.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach(btn => btn.disabled = true);
  if (currentQuestionIndex < questions.length - 1) {
    nextBtn.classList.remove("hidden");
  } else {
    clearInterval(timerInterval);
    setTimeout(() => alert("🎉 Quiz Complete! Final Score: " + score), 500);
  }
}

function getQuestionsByCategory(category) {
  const allQuestions = {
    general: [
      { q: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Rome"], answer: "Paris" },
      { q: "How many continents are there?", options: ["5", "6", "7", "8"], answer: "7" },
    ],
    science: [
      { q: "What planet is known as the Red Planet?", options: ["Earth", "Venus", "Mars", "Jupiter"], answer: "Mars" },
      { q: "What is H2O?", options: ["Oxygen", "Hydrogen", "Water", "Helium"], answer: "Water" },
    ],
    history: [
      { q: "Who was the first President of the USA?", options: ["Lincoln", "Jefferson", "Washington", "Adams"], answer: "Washington" },
      { q: "In what year did WW2 end?", options: ["1942", "1945", "1948", "1950"], answer: "1945" },
    ],
  };
  return allQuestions[category] || [];
}
