// Client-side rendering and interaction for the Flask-backed Sudoku
const SIZE = 9;
let puzzle = [];
let solution = [];
let timerInterval = null;
let elapsedSeconds = 0;
let hintsUsed = 0;
let gameSolved = false;

function createBoardElement() {
  const boardDiv = document.getElementById('sudoku-board');
  boardDiv.innerHTML = '';
  for (let i = 0; i < SIZE; i++) {
    const rowDiv = document.createElement('div');
    rowDiv.className = 'sudoku-row';
    for (let j = 0; j < SIZE; j++) {
      const input = document.createElement('input');
      input.type = 'text';
      input.maxLength = 1;
      input.className = 'sudoku-cell';
      input.dataset.row = i;
      input.dataset.col = j;
      input.addEventListener('input', (e) => {
        const val = e.target.value.replace(/[^1-9]/g, '');
        e.target.value = val;
      });
      rowDiv.appendChild(input);
    }
    boardDiv.appendChild(rowDiv);
  }
}

function formatTime(totalSeconds) {
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  return `${minutes}:${seconds}`;
}

function updateTimer() {
  elapsedSeconds += 1;
  const timerEl = document.getElementById('timer');
  if (timerEl) {
    timerEl.textContent = `Time: ${formatTime(elapsedSeconds)}`;
  }
}

function startTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
  }
  elapsedSeconds = 0;
  hintsUsed = 0;
  gameSolved = false;
  const timerEl = document.getElementById('timer');
  if (timerEl) {
    timerEl.textContent = 'Time: 00:00';
  }
  timerInterval = window.setInterval(updateTimer, 1000);
}

function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

function renderPuzzle(puz) {
  puzzle = puz;
  solution = [];
  createBoardElement();
  const boardDiv = document.getElementById('sudoku-board');
  const inputs = boardDiv.getElementsByTagName('input');
  for (let i = 0; i < SIZE; i++) {
    for (let j = 0; j < SIZE; j++) {
      const idx = i * SIZE + j;
      const val = puzzle[i][j];
      const inp = inputs[idx];
      if (val !== 0) {
        inp.value = val;
        inp.disabled = true;
        inp.className = 'sudoku-cell prefilled';
      } else {
        inp.value = '';
        inp.disabled = false;
        inp.className = 'sudoku-cell';
      }
    }
  }
}

async function newGame() {
  const difficultySelect = document.getElementById('difficulty');
  const clues = difficultySelect ? difficultySelect.value : 35;
  const res = await fetch(`/new?clues=${encodeURIComponent(clues)}`);
  const data = await res.json();
  renderPuzzle(data.puzzle);
  solution = data.solution || [];
  startTimer();
  document.getElementById('message').innerText = '';
}

function getBoardFromInputs() {
  const boardDiv = document.getElementById('sudoku-board');
  const inputs = boardDiv.getElementsByTagName('input');
  const board = [];
  for (let i = 0; i < SIZE; i++) {
    board[i] = [];
    for (let j = 0; j < SIZE; j++) {
      const idx = i * SIZE + j;
      const val = inputs[idx].value;
      board[i][j] = val ? parseInt(val, 10) : 0;
    }
  }
  return board;
}

function highlightIncorrectEntries(incorrectIndices) {
  const boardDiv = document.getElementById('sudoku-board');
  const inputs = boardDiv.getElementsByTagName('input');
  const incorrectSet = new Set(incorrectIndices);
  for (let idx = 0; idx < inputs.length; idx++) {
    const inp = inputs[idx];
    if (inp.disabled) {
      continue;
    }
    inp.className = 'sudoku-cell';
    if (incorrectSet.has(idx)) {
      inp.className = 'sudoku-cell incorrect';
    }
  }
}

async function checkSolution() {
  const board = getBoardFromInputs();
  const res = await fetch('/check', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({board})
  });
  const data = await res.json();
  const msg = document.getElementById('message');
  if (data.error) {
    msg.style.color = '#d32f2f';
    msg.innerText = data.error;
    return;
  }
  const incorrect = new Set(data.incorrect.map(x => x[0]*SIZE + x[1]));
  highlightIncorrectEntries(Array.from(incorrect));
  if (incorrect.size === 0) {
    gameSolved = true;
    stopTimer();
    msg.style.color = '#388e3c';
    msg.innerText = `Congratulations! You solved it in ${formatTime(elapsedSeconds)} with ${hintsUsed} hint${hintsUsed === 1 ? '' : 's'}.`;
  } else {
    msg.style.color = '#d32f2f';
    msg.innerText = 'Some cells are incorrect.';
  }
}

function applyHint() {
  if (!solution || solution.length === 0) {
    return;
  }
  const boardDiv = document.getElementById('sudoku-board');
  const inputs = boardDiv.getElementsByTagName('input');
  const emptyIndices = [];
  for (let idx = 0; idx < inputs.length; idx++) {
    const inp = inputs[idx];
    if (!inp.disabled && inp.value === '') {
      emptyIndices.push(idx);
    }
  }
  if (emptyIndices.length === 0) {
    return;
  }
  const targetIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  const row = Math.floor(targetIndex / SIZE);
  const col = targetIndex % SIZE;
  const value = solution[row][col];
  const inp = inputs[targetIndex];
  inp.value = value;
  inp.disabled = true;
  inp.className = 'sudoku-cell prefilled';
  puzzle[row][col] = value;
  hintsUsed += 1;
}

// Wire buttons
window.addEventListener('load', () => {
  document.getElementById('new-game').addEventListener('click', newGame);
  document.getElementById('check-solution').addEventListener('click', checkSolution);
  document.getElementById('hint').addEventListener('click', applyHint);
  // initialize
  newGame();
});