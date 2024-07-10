const boardSize = 5;
let board = [];
let minePositions = [];

function initBoard() {
    const mineCount = parseInt(document.getElementById('mine-count').value, 10);
    board = [];
    minePositions = [];
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
    gameBoard.style.gridTemplateColumns = `repeat(${boardSize}, 40px)`;

    for (let row = 0; row < boardSize; row++) {
        const rowArray = [];
        for (let col = 0; col < boardSize; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener('click', handleClick);
            gameBoard.appendChild(cell);
            rowArray.push(cell);
        }
        board.push(rowArray);
    }

    placeMines(mineCount);
}

function placeMines(mineCount) {
    let minesPlaced = 0;

    while (minesPlaced < mineCount) {
        const row = Math.floor(Math.random() * boardSize);
        const col = Math.floor(Math.random() * boardSize);

        // Check if there's already a mine at this position
        if (!minePositions.some(pos => pos.row === row && pos.col === col)) {
            minePositions.push({ row, col });
            minesPlaced++;
        }
    }
}

function handleClick(event) {
    const row = parseInt(event.target.dataset.row, 10);
    const col = parseInt(event.target.dataset.col, 10);
    revealCell(row, col);
}

function revealCell(row, col) {
    const cell = board[row][col];

    if (cell.classList.contains('revealed')) {
        return;
    }

    cell.classList.add('revealed');

    if (minePositions.some(pos => pos.row === row && pos.col === col)) {
        cell.classList.add('mine');
        alert('Game Over! You hit a mine.');
        revealAllMines();
    } else {
        const minesAround = countMinesAround(row, col);
        if (minesAround > 0) {
            cell.textContent = minesAround;
        } else {
            revealAdjacentCells(row, col);
        }
    }
}

function countMinesAround(row, col) {
    let count = 0;
    for (let r = -1; r <= 1; r++) {
        for (let c = -1; c <= 1; c++) {
            if (r === 0 && c === 0) continue;
            const newRow = row + r;
            const newCol = col + c;
            if (newRow >= 0 && newRow < boardSize && newCol >= 0 && newCol < boardSize) {
                if (minePositions.some(pos => pos.row === newRow && pos.col === newCol)) {
                    count++;
                }
            }
        }
    }
    return count;
}

function revealAdjacentCells(row, col) {
    for (let r = -1; r <= 1; r++) {
        for (let c = -1; c <= 1; c++) {
            const newRow = row + r;
            const newCol = col + c;
            if (newRow >= 0 && newRow < boardSize && newCol >= 0 && newCol < boardSize) {
                const cell = board[newRow][newCol];
                if (!cell.classList.contains('revealed')) {
                    revealCell(newRow, newCol);
                }
            }
        }
    }
}

function revealAllMines() {
    minePositions.forEach(pos => {
        const cell = board[pos.row][pos.col];
        cell.classList.add('mine');
        cell.classList.add('revealed');
    });
}

document.getElementById('reset-button').addEventListener('click', initBoard);
document.getElementById('mine-count').addEventListener('input', function() {
    document.getElementById('mine-count-value').textContent = this.value;
    initBoard(); // Reset the board when the mine count changes
});

initBoard();
