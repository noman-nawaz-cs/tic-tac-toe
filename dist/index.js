"use strict";
let gridSize = 3;
let gridArray = new Array(gridSize).fill(null).map(() => new Array(gridSize).fill(null));
let movesCount = 0;
const btn1 = document.getElementById('btn-1');
const btn2 = document.getElementById('btn-2');
const btn3 = document.getElementById('btn-3');
const playerX_btn = document.getElementById('player-x');
const playerO_btn = document.getElementById('player-o');
const resetButton = document.getElementById('reset-button');
let currentActiveButton = null;
function checkRows(grid, player) {
    for (let i = 0; i < grid.length; i++) {
        if ((grid[i].every((item) => item === player)))
            return true;
    }
    return false;
}
function checkColumns(grid, player) {
    let flag;
    for (let i = 0; i < grid.length; i++) {
        flag = true;
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[j][i] !== player)
                flag = false;
        }
        if (flag)
            return true;
    }
    return false;
}
function checkDiagonals(grid, player) {
    let flag = true;
    for (let i = 0; i < grid.length; i++) {
        if (grid[i][i] !== player)
            flag = false;
    }
    if (flag)
        return true;
    for (let i = 0; i < grid.length; i++) {
        if (grid[i][grid.length - i - 1] !== player)
            return false;
    }
    return true;
}
function getWinner(grid, player) {
    return checkRows(grid, player) || checkColumns(grid, player) || checkDiagonals(grid, player);
}
function announceWinner(element, player) {
    element.innerHTML = player;
    element.style.color = 'green';
    element.style.fontSize = '28px';
    setTimeout(() => {
        resetGrid();
    }, 2000);
}
function resizeGrid(element, gridSize) {
    enablePlayerButtons();
    gridArray = new Array(gridSize).fill(null).map(() => new Array(gridSize).fill(null));
    const currentTurn = document.getElementById('turn');
    currentTurn.innerHTML = '';
    element.innerHTML = '';
    for (let i = 0; i < gridSize * gridSize; i++) {
        const cell = document.createElement('div');
        cell.className = 'grid-cell';
        element.appendChild(cell);
    }
    element.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    element.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
    const resetWinnerText = document.getElementById('turn');
    resetWinnerText.style.color = '#d32f2f';
    resetWinnerText.style.fontSize = '1.2em';
}
function startGame(currentPlayer) {
    disablePlayerButtons();
    const currentTurn = document.getElementById('turn');
    currentTurn.innerHTML = `Player ${currentPlayer}'s turn`;
    const grid = document.getElementsByClassName('grid-cell');
    const gridSize = Math.sqrt(grid.length);
    for (let i = 0; i < grid.length; i++) {
        grid[i].addEventListener('click', () => {
            gridArray[Math.floor(i / gridSize)][i % gridSize] = currentPlayer;
            if (grid[i].textContent === '') {
                grid[i].textContent = currentPlayer;
                movesCount++;
                if (getWinner(gridArray, currentPlayer)) {
                    announceWinner(currentTurn, `Player ${currentPlayer} wins!`);
                    return;
                }
                if (movesCount === grid.length) {
                    announceWinner(currentTurn, "Match is drawn");
                    return;
                }
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                currentTurn.innerHTML = `Player ${currentPlayer}'s turn`;
            }
        });
    }
}
function resetGrid() {
    setActiveButton(btn1);
    movesCount = 0;
    const gridCells = document.getElementsByClassName('grid-cell');
    for (let i = 0; i < gridCells.length; i++) {
        gridCells[i].textContent = '';
    }
    gridArray = new Array(gridSize).fill(null).map(() => new Array(gridSize).fill(null));
    const grid = document.getElementById('grid');
    resizeGrid(grid, gridSize);
}
function disablePlayerButtons() {
    if (playerX_btn)
        playerX_btn.disabled = true;
    if (playerO_btn)
        playerO_btn.disabled = true;
}
function enablePlayerButtons() {
    if (playerX_btn)
        playerX_btn.disabled = false;
    if (playerO_btn)
        playerO_btn.disabled = false;
}
function setActiveButton(button) {
    if (currentActiveButton) {
        currentActiveButton.style.backgroundColor = '';
    }
    button.style.backgroundColor = '#1565c0';
    currentActiveButton = button;
}
window.addEventListener('load', () => {
    setActiveButton(btn1);
    const grid = document.getElementById('grid');
    resizeGrid(grid, gridSize);
});
btn1 === null || btn1 === void 0 ? void 0 : btn1.addEventListener('click', () => {
    setActiveButton(btn1);
    const grid = document.getElementById('grid');
    resizeGrid(grid, 3);
});
btn2 === null || btn2 === void 0 ? void 0 : btn2.addEventListener('click', () => {
    setActiveButton(btn2);
    const grid = document.getElementById('grid');
    resizeGrid(grid, 5);
});
btn3 === null || btn3 === void 0 ? void 0 : btn3.addEventListener('click', () => {
    setActiveButton(btn3);
    const grid = document.getElementById('grid');
    resizeGrid(grid, 7);
});
playerX_btn === null || playerX_btn === void 0 ? void 0 : playerX_btn.addEventListener('click', () => {
    startGame('X');
});
playerO_btn === null || playerO_btn === void 0 ? void 0 : playerO_btn.addEventListener('click', () => {
    startGame('O');
});
resetButton === null || resetButton === void 0 ? void 0 : resetButton.addEventListener('click', () => {
    resetGrid();
});
