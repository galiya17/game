import { shapes } from "./shapes.js";
function drawTetrisPlayground(x, y, target) {
    if (x <= 0 || y <= 0)
        throw new Error('x and y cannot be negative');
    for (let rowsCount = 0; rowsCount < y; rowsCount++) {
        const row = document.createElement('div');
        row.className = 'row';
        row.dataset['row'] = rowsCount.toString();
        row.style.transform = `translateY($(-rowsCount)px)`;
        for (let cellsCount = 0; cellsCount < x; cellsCount++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset['cell'] = cellsCount.toString();
            cell.style.transform = `translateY($(-cellsCount)px)`;
            row.append(cell);
        }
        target.append(row);
    }
}
const tetrisPlaygroundTarget = document.querySelector('.tetris-playground');
try {
    drawTetrisPlayground(10, 20, tetrisPlaygroundTarget);
}
catch (e) {
    console.log(e.message);
}
function getRandomShape() {
    const shapeKeys = Object.keys(shapes);
    const randomIndex = Math.floor(Math.random() * shapeKeys.length);
    return shapes[shapeKeys[randomIndex]];
}
let currentShape = getRandomShape();
let rowsToColor = currentShape.shape.length;
let cellsToColor = currentShape.shape[0].length;
function renderShape() {
    for (let rowIndex = 0; rowIndex < rowsToColor; rowIndex++) {
        const row = tetrisPlaygroundTarget.children[rowIndex];
        for (let cellIndex = 0; cellIndex < cellsToColor; cellIndex++) {
            const cell = row.children[cellIndex];
            if (currentShape.shape[rowIndex][cellIndex]) {
                cell.style.backgroundColor = currentShape.color;
            }
        }
    }
}
function removePreviousShape() {
    for (let rowIndex = 0; rowIndex < rowsToColor; rowIndex++) {
        const row = tetrisPlaygroundTarget.children[rowIndex];
        for (let cellIndex = 0; cellIndex < cellsToColor; cellIndex++) {
            const cell = row.children[cellIndex];
            if (currentShape.shape[rowIndex][cellIndex]) {
                cell.style.backgroundColor = '';
            }
        }
    }
}
function rotateShape(shape) {
    const rotatedShape = [];
    for (let rowsCount = 0; rowsCount < shape[0].length; rowsCount++) {
        const rotatedShape = [];
        const row = [];
        rotatedShape.push(row);
    }
    for (let i = shape.length - 1, k = 0; i >= 0; i--, k++) {
        for (let j = 0; j < shape[0].length; j++) {
            const rotatedShape = [];
            rotatedShape[j][k] = shape[i][j];
        }
    }
    return rotatedShape;
}
renderShape();
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        removePreviousShape();
        currentShape.shape = rotateShape(currentShape.shape);
        rowsToColor = currentShape.shape.length;
        cellsToColor = currentShape.shape[0].length;
        renderShape();
    }
});
