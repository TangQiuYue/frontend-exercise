"use strict";
const cells = document.querySelectorAll('.cell');
const currentPlayerLabel = document.getElementById('current-player');
const resetButton = document.getElementById('reset-button');
const historyList = document.getElementById('history-list');
let currentPlayer = 'x';
let gameBoard = Array(9).fill('');
let history = [];
resetButton.addEventListener('click', resetGame);
cells.forEach(cell => {
    cell.addEventListener('click', () => handleCellClick(cell), { once: true });
});
function handleCellClick(cell) {
    const index = Number(cell.getAttribute('data-index'));
    if (gameBoard[index] !== '')
        return;
    gameBoard[index] = currentPlayer;
    cell.classList.add(currentPlayer);
    cell.textContent = currentPlayer.toUpperCase();
    addToHistory(currentPlayer, index);
    currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
    updateCurrentPlayerLabel();
    if (checkWin(currentPlayer)) {
        alert(`${currentPlayer.toUpperCase()} wins!`);
    }
    else if (gameBoard.every(cell => cell !== '')) {
        alert('It\'s a draw!');
    }
}
function checkWin(player) {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6] // diagonals
    ];
    return winPatterns.some(pattern => pattern.every(index => gameBoard[index] === player));
}
function resetGame() {
    gameBoard.fill('');
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
        cell.addEventListener('click', () => handleCellClick(cell), { once: true });
    });
    currentPlayer = 'x';
    history = [];
    updateHistory();
    updateCurrentPlayerLabel();
}
function addToHistory(player, index) {
    history.push(`${player.toUpperCase()} to cell ${index}`);
    updateHistory();
}
function updateHistory() {
    historyList.innerHTML = '';
    history.forEach(entry => {
        const listItem = document.createElement('li');
        listItem.textContent = entry;
        historyList.appendChild(listItem);
    });
}
function updateCurrentPlayerLabel() {
    currentPlayerLabel.textContent = `Current Player: ${currentPlayer.toUpperCase()}`;
}