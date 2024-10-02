

let currentScore = 0;
let highScore = parseInt(localStorage.getItem('highScore')) || 0;


const flagContainer = document.querySelector('.flag-container');
const flagNameElement = document.getElementById('flag-name');
const guessInput = document.getElementById('guess-input');
const randomFlagBtn = document.getElementById('random-flag-btn');
const submitGuessBtn = document.getElementById('submit-guess');
const resetGameBtn = document.getElementById('reset-game');
const resultMessage = document.getElementById('result-message');
const currentScoreSpan = document.getElementById('current-score');
const highScoreSpan = document.getElementById('high-score');

const dropdownBtn = document.querySelector('.dropdown-btn');
const dropdownContent = document.querySelector('.dropdown-content');
const resetHighScoresBtn = document.getElementById('reset-high-scores');
const changeBackgroundBtn = document.getElementById('change-background');


 

const countries = [
    { name: "Uganda", flag: "./asserts/Uganda.svg" },
    { name: "Kenya", flag: "./asserts/Kenya.svg" },
    { name: "Burundi", flag: "./asserts/Burundi.svg"},
    { name: "Ethiopia", flag: "./asserts/Ethiopia.svg"},
    { name: "Malawi", flag: "./asserts/Malawi.svg"},
    { name: "Mozambique", flag: "./asserts/Mozambique.svg"},
    { name: "Rwanda", flag: "./asserts/Rwanda.svg"},
    { name: "Somalia", flag: "./asserts/Somalia.svg"},
    { name: "South Sudan", flag: "./asserts/South Sudan.svg"},
    { name: "Zambia", flag: "./asserts/Zambia.svg"},
    { name: "Zimbabwe", flag: "./asserts/Zimbabwe.svg"},
    { name: "Tanzania", flag: "./asserts/Tanzania.svg"},
    
 
  ];




  // const flagContainer = document.querySelector(".flag-container");
  // const randomFlagBtn = document.getElementById("random-flag-btn");
  // const flagNameElement = document.getElementById("flag-name");
  
 

  flagContainer.style.margin = "0 auto";
//   randomFlagBtn.style.margin = "0 auto";
// randomFlagBtn.style.display = "block";



let currentFlagIndex = 0;

// Initialize high scores array
let highScores = [];

// Retrieve saved high scores
const savedHighScores = JSON.parse(localStorage.getItem("highScores"));
if (savedHighScores) {
  highScores = savedHighScores;
}

// Function to update high scores
function updateHighScores(newScore) {
  highScores.push({ name: 'Player', score: newScore });
  highScores.sort((a, b) => b.score - a.score);
  highScores = highScores.slice(0, 10); // Keep only top 10 scores

  // Store updated high scores
  localStorage.setItem("highScores", JSON.stringify(highScores));
  localStorage.setItem('highScore', newScore);
}

// Function to display high scores
function displayHighScores() {
  const highScoresList = document.getElementById("high-scores");
  highScoresList.innerHTML = "";

  highScores.forEach((score) => {
    const scoreElement = document.createElement("li");
    scoreElement.textContent = `${score.name}: ${score.score}`;
    highScoresList.appendChild(scoreElement);
  });
}

// Function to display flag
function displayFlag() {
  const flag = countries[currentFlagIndex];
  flagContainer.innerHTML = `<img src="${flag.flag}" alt="${flag.name} flag">`;
  flagNameElement.innerText = '';
}

// Function to update score
function updateScore() {
  currentScoreSpan.innerText = `Score: ${currentScore}`;
  if (currentScore > highScore) {
    highScore = currentScore;
    updateHighScores(highScore);
    highScoreSpan.innerText = `High Score: ${highScore}`;
  }
}

// Function to get random index
function getRandomIndex() {
  let newIndex = Math.floor(Math.random() * countries.length);
  while (newIndex === currentFlagIndex) {
    newIndex = Math.floor(Math.random() * countries.length);
  }
  return newIndex;
}

randomFlagBtn.addEventListener('click', () => {
  currentFlagIndex = getRandomIndex();
  displayFlag();
});

submitGuessBtn.addEventListener('click', () => {
  const userGuess = guessInput.value.trim();
  const currentFlagName = countries[currentFlagIndex].name;
  if (userGuess.toLowerCase() === currentFlagName.toLowerCase()) {
    currentScore++;
    updateScore();
    resultMessage.innerText = 'Correct!';
    displayFlag();
  } else {
    resultMessage.innerText = `Incorrect. The correct answer is ${currentFlagName}.`;
    displayFlag();
  }
  guessInput.value = '';
  currentFlagIndex = getRandomIndex();
  displayFlag();
});

resetGameBtn.addEventListener('click', () => {
  currentScore = 0;
  updateScore();
  resultMessage.innerText = '';
  currentFlagIndex = getRandomIndex();
  displayFlag();
});

resetHighScoresBtn.addEventListener('click', () => {
  localStorage.removeItem('highScores');
  localStorage.removeItem('highScore');
  highScores = [];
  highScore = 0;
  displayHighScores();
  updateScore();
});

guessInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    submitGuessBtn.click();
  }
});

// Add event listener to change background button
changeBackgroundBtn.addEventListener('click', () => {
  const backgroundOptions = [ 
    { name: 'Default', className: ' ' },
    { name: 'Dark', className: 'background-dark' },
    { name: 'Grey', className: 'background-grey' },
    { name: 'Blue', className: 'background-blue' },
  ];

  const backgroundSelect = prompt(`Select background:
    ${backgroundOptions.map((option, index) => `${index + 1}. ${option.name}`).join('\n')}`);

  const selectedBackground = backgroundOptions[backgroundSelect - 1];
  document.body.classList.add(selectedBackground.className);
});





displayFlag();
displayHighScores();



