let gridSize = 3;
let gridArray: string[][] = new Array(gridSize).fill(null).map(() => new Array(gridSize).fill(null));
let movesCount: number = 0;
const btn1 = document.getElementById('btn-1') as HTMLButtonElement;
const btn2 = document.getElementById('btn-2') as HTMLButtonElement;
const btn3 = document.getElementById('btn-3') as HTMLButtonElement;
const playerX_btn = document.getElementById('player-x') as HTMLButtonElement;
const playerO_btn = document.getElementById('player-o') as HTMLButtonElement;
const resetButton = document.getElementById('reset-button') as HTMLButtonElement;
let currentActiveButton: HTMLButtonElement | null = null;

function checkRows(grid: string[][], player: string): boolean {
    for (let i = 0; i < grid.length; i++) {
        if ((grid[i].every((item) => item === player)))
            return true;
    }
    return false;
}

function checkColumns(grid: string[][], player: string): boolean {
    let flag;
    for (let i = 0; i < grid.length; i++) {
        flag = true;
        for (let j = 0; j < grid[i].length; j++){
            if (grid[j][i]!== player) 
                flag = false;
        }
        if (flag)
            return true;
    }
    return false;
}

function checkDiagonals(grid: string[][], player: string): boolean {
    let flag = true;
    for (let i = 0; i < grid.length; i++) {
        if(grid[i][i] !== player) 
            flag = false;
    }
    if (flag)
        return true;
    for (let i = 0; i < grid.length; i++) {
        if(grid[i][grid.length - i - 1] !== player) 
            return false;
    }
    return true;
}

function getWinner(grid: string[][], player: string): boolean {
    return checkRows(grid, player) || checkColumns(grid, player) || checkDiagonals(grid, player);
}

function announceWinner(element: HTMLElement, player: string){
    element.innerHTML = player;
    element.style.color = 'green';
    element.style.fontSize = '28px';
    setTimeout( () => {
        resetGrid();
    }, 2000);
}

function resizeGrid(element: HTMLElement, gridSize: number){
    enablePlayerButtons();
    gridArray = new Array(gridSize).fill(null).map(() => new Array(gridSize).fill(null));
    const currentTurn = document.getElementById('turn') as HTMLElement;
    currentTurn.innerHTML = '';
    element.innerHTML = '';
    for(let i = 0; i < gridSize*gridSize; i++) {
        const cell = document.createElement('div');
        cell.className = 'grid-cell';
        element.appendChild(cell);
    }
    element.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    element.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
    const resetWinnerText = document.getElementById('turn') as HTMLElement;
    resetWinnerText.style.color = '#d32f2f';
    resetWinnerText.style.fontSize = '1.2em';

}

function startGame(currentPlayer: string){
    disablePlayerButtons();
    const currentTurn = document.getElementById('turn') as HTMLElement;
    currentTurn.innerHTML = `Player ${currentPlayer}'s turn`;
    const grid = document.getElementsByClassName('grid-cell');
    const gridSize = Math.sqrt(grid.length); 
    for(let i = 0; i < grid.length; i++) {
        grid[i].addEventListener('click', () => {
            gridArray[Math.floor(i/gridSize)][i%gridSize] = currentPlayer;
            if(grid[i].textContent === '') {
                grid[i].textContent = currentPlayer;
                movesCount++;
                if(getWinner(gridArray, currentPlayer)) {
                    announceWinner(currentTurn,  `Player ${currentPlayer} wins!`);
                    return;
                }
                if (movesCount === grid.length) {
                    announceWinner(currentTurn, "Match is drawn");
                    return;
                }
                currentPlayer = currentPlayer === 'X'? 'O' : 'X';
                currentTurn.innerHTML = `Player ${currentPlayer}'s turn`;
            }
        });
    }
}

function resetGrid(){
    setActiveButton(btn1);
    movesCount = 0
    const gridCells = document.getElementsByClassName('grid-cell');
    for(let i = 0; i < gridCells.length; i++) {
        gridCells[i].textContent = '';
    }
    gridArray = new Array(gridSize).fill(null).map(() => new Array(gridSize).fill(null));
    const grid = document.getElementById('grid') as HTMLElement;
    resizeGrid(grid, gridSize);
}

function disablePlayerButtons() {
    if (playerX_btn) playerX_btn.disabled = true;
    if (playerO_btn) playerO_btn.disabled = true;
}

function enablePlayerButtons() {
    if (playerX_btn) playerX_btn.disabled = false;
    if (playerO_btn) playerO_btn.disabled = false;
}

function setActiveButton(button: HTMLButtonElement) {
    if (currentActiveButton) {
        currentActiveButton.style.backgroundColor = ''; 
    }
    button.style.backgroundColor = '#1565c0'; 
    currentActiveButton = button;
}

window.addEventListener('load', () => {
    setActiveButton(btn1);
    const grid = document.getElementById('grid') as HTMLElement;
    resizeGrid(grid, gridSize);
});

btn1?.addEventListener('click', () => {
    setActiveButton(btn1);
    const grid = document.getElementById('grid') as HTMLElement;
    resizeGrid(grid, 3);
});

btn2?.addEventListener('click', () => {
    setActiveButton(btn2);
    const grid = document.getElementById('grid') as HTMLElement;
    resizeGrid(grid, 5);
});

btn3?.addEventListener('click', () => {
    setActiveButton(btn3);
    const grid = document.getElementById('grid') as HTMLElement;
    resizeGrid(grid, 7);
});

playerX_btn?.addEventListener('click', () => {
    startGame('X');
});

playerO_btn?.addEventListener('click', () => {
    startGame('O');
});

resetButton?.addEventListener('click', () => {
    resetGrid();
});
