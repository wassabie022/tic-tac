const board = document.getElementById("board");
const statusDisplay = document.getElementById("status");
const restartButton = document.getElementById("restart");

let currentPlayer = "X";
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // горизонтальные
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // вертикальные
  [0, 4, 8], [2, 4, 6]             // диагонали
];

function handleCellClick(event) {
  const clickedCell = event.target;
  const clickedIndex = Array.from(board.children).indexOf(clickedCell);

  if (gameState[clickedIndex] !== "" || !gameActive) return;

  gameState[clickedIndex] = currentPlayer;
  clickedCell.textContent = currentPlayer;
  clickedCell.classList.add("taken");

  if (checkWinner()) {
    statusDisplay.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
  } else if (!gameState.includes("")) {
    statusDisplay.textContent = "It's a draw!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWinner() {
  return winningConditions.some(condition => 
    condition.every(index => gameState[index] === currentPlayer)
  );
}

function restartGame() {
  gameActive = true;
  currentPlayer = "X";
  gameState = ["", "", "", "", "", "", "", "", ""];
  statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
  Array.from(board.children).forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("taken");
  });
}

// Создание клеток
for (let i = 0; i < 9; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  cell.addEventListener("click", handleCellClick);
  board.appendChild(cell);
}

// Событие для кнопки перезапуска
restartButton.addEventListener("click", restartGame);

statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
