const GRID_WIDTH = 10;
const GRID_HEIGHT = 20;

// Definicja kształtów tetromino – bez koloru
const TETROMINO_SHAPES = {
    I: [[1, 1, 1, 1]],
    O: [[1, 1], [1, 1]],
    T: [[0, 1, 0], [1, 1, 1]],
    S: [[0, 1, 1], [1, 1, 0]],
    Z: [[1, 1, 0], [0, 1, 1]],
    J: [[1, 0, 0], [1, 1, 1]],
    L: [[0, 0, 1], [1, 1, 1]]
};

// Lista dostępnych kolorów – kolor jest wybierany losowo przy spawnie
const TETROMINO_COLORS = ['cyan', 'yellow', 'purple', 'green', 'red', 'blue', 'orange'];

let grid = [];
let currentTetromino = null;
let currentColor = '';
let currentTetrominoKey = ''; // przechowuje literę identyfikującą kształt
let position = { x: 4, y: 0 };
let score = 0;
let gameInterval = null;

function initGrid() {
    const board = document.getElementById('game-board');
    board.innerHTML = ''; // Czyścimy planszę przed rozpoczęciem gry
    grid = [];
    for (let i = 0; i < GRID_HEIGHT; i++) {
        const row = document.createElement('div');
        row.classList.add('row-grid');
        const gridRow = [];
        for (let j = 0; j < GRID_WIDTH; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            row.appendChild(cell);
            // Każda komórka to nowy obiekt, aby nie dzielić referencji
            gridRow.push({ filled: 0, color: '' });
        }
        grid.push(gridRow);
        board.appendChild(row);
    }
}

function getRandomTetromino() {
    const shapeKeys = Object.keys(TETROMINO_SHAPES);
    const randomKey = shapeKeys[Math.floor(Math.random() * shapeKeys.length)];
    const shape = TETROMINO_SHAPES[randomKey];
    const color = TETROMINO_COLORS[Math.floor(Math.random() * TETROMINO_COLORS.length)];
    return { key: randomKey, shape, color };
}

function drawTetromino() {
    currentTetromino.forEach((row, i) => {
        row.forEach((cell, j) => {
            if (cell) {
                const x = position.x + j;
                const y = position.y + i;
                if (y >= 0 && y < GRID_HEIGHT && x >= 0 && x < GRID_WIDTH) {
                    const cellElem = document.querySelectorAll('.row-grid')[y].children[x];
                    cellElem.classList.add('block');
                    cellElem.style.backgroundColor = currentColor;
                }
            }
        });
    });
}

function eraseTetromino() {
    currentTetromino.forEach((row, i) => {
        row.forEach((cell, j) => {
            if (cell) {
                const x = position.x + j;
                const y = position.y + i;
                if (y >= 0 && y < GRID_HEIGHT && x >= 0 && x < GRID_WIDTH) {
                    const cellElem = document.querySelectorAll('.row-grid')[y].children[x];
                    if (!grid[y][x].filled) {
                        cellElem.classList.remove('block');
                        cellElem.style.backgroundColor = '';
                    }
                }
            }
        });
    });
}

function checkCollision(xOffset, yOffset, tetromino = currentTetromino) {
    for (let i = 0; i < tetromino.length; i++) {
        for (let j = 0; j < tetromino[i].length; j++) {
            if (tetromino[i][j]) {
                const newX = position.x + j + xOffset;
                const newY = position.y + i + yOffset;
                if (newX < 0 || newX >= GRID_WIDTH || newY >= GRID_HEIGHT || (newY >= 0 && grid[newY][newX].filled)) {
                    return true;
                }
            }
        }
    }
    return false;
}

function updateGrid() {
    for (let i = 0; i < GRID_HEIGHT; i++) {
        for (let j = 0; j < GRID_WIDTH; j++) {
            const cellElem = document.querySelectorAll('.row-grid')[i].children[j];
            if (grid[i][j].filled) {
                cellElem.classList.add('block');
                cellElem.style.backgroundColor = grid[i][j].color;
            } else {
                cellElem.classList.remove('block');
                cellElem.style.backgroundColor = '';
            }
        }
    }
}

function freezeTetromino() {
    currentTetromino.forEach((row, i) => {
        row.forEach((cell, j) => {
            if (cell) {
                const x = position.x + j;
                const y = position.y + i;
                if (y >= 0 && y < GRID_HEIGHT && x >= 0 && x < GRID_WIDTH) {
                    grid[y][x] = { filled: 1, color: currentColor };
                }
            }
        });
    });
    updateGrid();
    checkLines();
    spawnTetromino();
}

function checkLines() {
    for (let i = GRID_HEIGHT - 1; i >= 0; i--) {
        if (grid[i].every(cell => cell.filled === 1)) {
            grid.splice(i, 1);
            const newRow = [];
            for (let j = 0; j < GRID_WIDTH; j++) {
                newRow.push({ filled: 0, color: '' });
            }
            grid.unshift(newRow);
            score += 10;
            document.getElementById('score').textContent = score;
            updateGrid();
            i++;
        }
    }
}

function spawnTetromino() {
    const newTetromino = getRandomTetromino();
    currentTetrominoKey = newTetromino.key;
    currentTetromino = newTetromino.shape;
    currentColor = newTetromino.color;
    position = { x: 4, y: 0 };
    if (checkCollision(0, 0)) {
        alert('Koniec gry! Punkty: ' + score);
        clearInterval(gameInterval);
        gameInterval = null;
        return;
    }
    drawTetromino();
}

function drop() {
    eraseTetromino();
    if (!checkCollision(0, 1)) {
        position.y++;
    } else {
        freezeTetromino();
    }
    drawTetromino();
}

// Funkcja obracająca macierz (90° zgodnie z ruchem wskazówek zegara)
function rotateMatrix(matrix) {
    const rotated = [];
    for (let i = 0; i < matrix[0].length; i++) {
        rotated[i] = [];
        for (let j = 0; j < matrix.length; j++) {
            rotated[i][j] = matrix[matrix.length - 1 - j][i];
        }
    }
    return rotated;
}

// Funkcja zmieniająca kształt na inny – dozwolone tylko dla kształtów innych niż linia (I) i kwadrat (O)
// Po zmianie kształtu kolor pozostaje bez zmian.
function swapTetromino() {
    if (currentTetrominoKey === 'I' || currentTetrominoKey === 'O') {
        return;
    }
    const allowedKeys = ['T', 'S', 'Z', 'J', 'L'];
    const randomKey = allowedKeys[Math.floor(Math.random() * allowedKeys.length)];
    const newShape = TETROMINO_SHAPES[randomKey];
    if (!checkCollision(0, 0, newShape)) {
        eraseTetromino();
        currentTetrominoKey = randomKey;
        currentTetromino = newShape;
        // currentColor pozostaje niezmienione
        drawTetromino();
    }
}

document.addEventListener('keydown', (e) => {
    eraseTetromino();
    switch (e.key) {
        case 'ArrowLeft':
            if (!checkCollision(-1, 0)) position.x--;
            break;
        case 'ArrowRight':
            if (!checkCollision(1, 0)) position.x++;
            break;
        case 'ArrowDown':
            drop();
            break;
        case 'ArrowUp':
            // Obracamy kształt tylko, jeśli nie jest to kwadrat (O)
            if (currentTetrominoKey !== 'O') {
                const rotated = rotateMatrix(currentTetromino);
                if (!checkCollision(0, 0, rotated)) {
                    currentTetromino = rotated;
                }
            }
            break;
        case 'c': // Zmiana kształtu – tylko dla kształtów innych niż I i O
            swapTetromino();
            break;
    }
    drawTetromino();
});

document.getElementById('start-btn').addEventListener('click', () => {
    if (!gameInterval) {
        score = 0;
        document.getElementById('score').textContent = score;
        initGrid();
        spawnTetromino();
        gameInterval = setInterval(drop, 1000);
    }
});

document.getElementById('pause-btn').addEventListener('click', () => {
    if (gameInterval) {
        clearInterval(gameInterval);
        gameInterval = null;
    } else {
        gameInterval = setInterval(drop, 1000);
    }
});
