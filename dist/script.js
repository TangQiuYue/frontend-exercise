"use strict";
const cells = document.querySelectorAll(".cell");
const currentPlayerLabel = document.getElementById("current-player");
const resetButton = document.getElementById("reset-button");
const historyList = document.getElementById("history-list");
let currentPlayer = "x";
let gameBoard = Array(9).fill("");
let history = [];
resetButton.addEventListener("click", resetGame);
cells.forEach((cell) => {
  cell.addEventListener("click", () => handleCellClick(cell), { once: true });
});
function handleCellClick(cell) {
  const index = Number(cell.getAttribute("data-index"));
  if (gameBoard[index] !== "") return;
  gameBoard[index] = currentPlayer;
  cell.classList.add(currentPlayer);
  cell.textContent = currentPlayer.toUpperCase();
  addToHistory(currentPlayer, index);
  currentPlayer = currentPlayer === "x" ? "o" : "x";
  updateCurrentPlayerLabel();
}
function checkWin(player) {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6], // diagonals
  ];
  return winPatterns.some((pattern) =>
    pattern.every((index) => gameBoard[index] === player)
  );
}
function resetGame() {
  gameBoard.fill("");
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("x", "o");
    cell.addEventListener("click", () => handleCellClick(cell), { once: true });
  });
  currentPlayer = "x";
  history = [];
  updateHistory();
  updateCurrentPlayerLabel();
}
function addToHistory(player, index) {
  let historyItemObject = {};
  historyItemObject.player = player;
  historyItemObject.string = `${player.toUpperCase()} to cell ${index}`;
  historyItemObject.attribute = index;
  history.push(historyItemObject);
  updateHistory();
  if (checkWin(currentPlayer)) {
    alert(`${currentPlayer.toUpperCase()} wins!`);
  } else if (gameBoard.every((cell) => cell !== "")) {
    alert("It's a draw!");
  }
}

function updateHistory() {
  historyList.innerHTML = "";
  history.forEach((entry) => {
    const listItem = document.createElement("li");
    listItem.textContent = entry.string;
    listItem.setAttribute("data-index", entry.attribute);
    listItem.setAttribute("tabindex", "0");
    historyList.appendChild(listItem);
    removeFromHistory(listItem);
  });
}
function updateCurrentPlayerLabel() {
  currentPlayerLabel.textContent = `Current Player: ${currentPlayer.toUpperCase()}`;
}

function removeFromHistory(historyListItem) {
  historyListItem.addEventListener("click", function () {
    let findIndex = history
      .map((item) => item.attribute)
      .indexOf(Number(historyListItem.getAttribute("data-index")));

    let removePlayedSquaresList = history.slice(
      findIndex + 1,
      Number(history.length) + 1
    );
    cells.forEach((cell) => {
      if (cell.className !== "cell") {
        removePlayedSquaresList.forEach((item) => {
          if (Number(cell.getAttribute("data-index")) === item.attribute) {
            cell.textContent = "";
            cell.classList.remove("x", "o");
            cell.removeEventListener("click", handleCellClick(cell));
            cell.addEventListener("click", () => handleCellClick(cell), {
              once: true,
            });
            const index = Number(cell.getAttribute("data-index"));
            gameBoard[index] = "";
          }
        });
      }
      history.splice(findIndex + 1);
      updateHistory();
      const newPlayer = history[history.length - 1].player;
      currentPlayer = newPlayer === "x" ? "o" : "x";
      updateCurrentPlayerLabel();
    });
  });
}
