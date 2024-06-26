const cells = document.querySelectorAll('.cell');
const currentPlayerLabel = document.getElementById('current-player')!;
const resetButton = document.getElementById('reset-button')!;
const gameHistoryList = document.getElementById('gameHistory-list')!;

let currentPlayer: 'x' | 'o' = 'x';
let gameBoard: Array<string> = Array(9).fill('');
let gameHistory: Array<string> = [];

resetButton.addEventListener('click', resetGame);
cells.forEach(cell => {
    cell.addEventListener('click', () => handleCellClick(cell), { once: true });
});

function handleCellClick(cell: Element) {
    const index = Number(cell.getAttribute('data-index'));
    if (gameBoard[index] !== '') return;

    gameBoard[index] = currentPlayer;
    cell.classList.add(currentPlayer);
    cell.textContent = currentPlayer.toUpperCase();
    addTogameHistory(currentPlayer, index);

    currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
    updateCurrentPlayerLabel();
  
    if (checkWin(currentPlayer)) {
        alert(`${currentPlayer.toUpperCase()} wins!`);
    } else if (gameBoard.every(cell => cell !== '')) {
        alert('It\'s a draw!');
    } 
}

function checkWin(player: 'x' | 'o'): boolean {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6] // diagonals
    ];

    return winPatterns.some(pattern => 
        pattern.every(index => gameBoard[index] === player)
    );
}

function resetGame() {
    gameBoard.fill('');
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
        cell.addEventListener('click', () => handleCellClick(cell), { once: true });
    });
    currentPlayer = 'x';
    gameHistory = [];
    updategameHistory();
    updateCurrentPlayerLabel();
}

function addTogameHistory(player: 'x' | 'o', index: number) {
    gameHistory.push(`${player.toUpperCase()} to cell ${index}`);
    updategameHistory();
}

function updategameHistory() {
    gameHistoryList.innerHTML = '';
    gameHistory.forEach(entry => {
        const listItem = document.createElement('li');
        listItem.textContent = entry;
        gameHistoryList.appendChild(listItem);
    });
}

function updateCurrentPlayerLabel() {
    currentPlayerLabel.textContent = `Current Player: ${currentPlayer.toUpperCase()}`;
}