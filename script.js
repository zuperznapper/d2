// script.js

let currentNumber, startTime;
let attempts = 0;
let totalResponseTime = 0;
let responseCount = 0;
let digitCount = 5;

function generateRandomNumber() {
  const max = Math.pow(10, digitCount) - 1;
  const min = Math.pow(10, digitCount - 1);
  const number = Math.floor(Math.random() * (max - min + 1) + min).toString();
  document.getElementById("prompt").innerText = `Hva er den digitale roten av tallet: ${number}`;
  startTime = new Date().getTime();  // Start tid for ny runde
  return number;
}

function calculateDigitalRoot(number) {
  let sum = 0;
  while (number > 0 || sum > 9) {
    if (number === 0) {
      number = sum;
      sum = 0;
    }
    sum += number % 10;
    number = Math.floor(number / 10);
  }
  return sum;
}

function handleInput(event) {
  const userGuess = parseInt(event.target.value);
  const feedback = document.getElementById("feedback");
  const correctAnswer = calculateDigitalRoot(parseInt(currentNumber));
  
  // Beregn tid for responsen
  const endTime = new Date().getTime();
  const responseTime = endTime - startTime;

  if (userGuess === correctAnswer) {
    feedback.innerText = "Riktig! Går videre til neste tall.";
    
    // Oppdater svartid og vis den
    document.getElementById("responseTime").innerText = `Svartid: ${responseTime} ms`;
    
    // Oppdater gjennomsnittlig svartid og vis den
    totalResponseTime += responseTime;
    responseCount++;
    const averageResponseTime = (totalResponseTime / responseCount).toFixed(2);
    document.getElementById("averageTime").innerText = `Gjennomsnittlig svartid: ${averageResponseTime} ms`;
    
    resetGame();
  } else {
    attempts++;
    if (attempts < 3) {
      feedback.innerText = `Feil! Du har ${3 - attempts} forsøk igjen.`;
    } else {
      feedback.innerText = `Ingen flere forsøk! Riktig svar var ${correctAnswer}. Går videre til neste tall.`;
      resetGame();
    }
  }
}

function resetGame() {
  attempts = 0;
  currentNumber = generateRandomNumber();
  document.getElementById("userGuess").value = "";
}

function openSettings() {
  document.getElementById("settings-panel").style.display = "block";
}

function closeSettings() {
  document.getElementById("settings-panel").style.display = "none";
}

function applySettings() {
  const newDigitCount = parseInt(document.getElementById("digitCount").value);
  if (newDigitCount >= 2 && newDigitCount <= 8) {
    digitCount = newDigitCount;
  }

  const bgColor = document.getElementById("bgColor").value;
  document.body.style.backgroundColor = bgColor;

  const fontSize = document.getElementById("fontSize").value;
  document.getElementById("game-container").style.fontSize = `${fontSize}px`;

  closeSettings();
  resetGame();
}

// Start første runde og vis tallet
currentNumber = generateRandomNumber();
