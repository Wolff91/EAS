const GRID_CONTAINER_WIDTH = 500;
const BORDER_SIZE = 2;
const DEFAULT_SQUARE_NUMBER = 16;

// function creates a 16*16 grid (in combination with css) of square div's inside a grid container
// Use div with break class to break one line after n squares if dimensions are n*n
// Calculate width and height of a single square based on total width of a grid-container and border sizes
function createGrid(squareNum) {
    const squareSize = GRID_CONTAINER_WIDTH / squareNum - BORDER_SIZE;
    for (let i = 0; i < squareNum; i++) {
        for (let j = 0; j < squareNum; j++) {
            const div = document.createElement('div');        
            div.className = "square";
            div.style.height = `${squareSize}px`;
            div.style.width = `${squareSize}px`;
            gridContainer.appendChild(div);
        }
        const br = document.createElement('div');
        br.className = "break";
        gridContainer.appendChild(br);
    }
}

// function checks if there is a hover effect on the square grids
// Also check if user first clicked onto a grid
function checkHover() {
    const squares = document.querySelectorAll('.square');
    gridContainer.addEventListener('click', () => {
        squares.forEach((square) => {
            square.addEventListener('mouseover', changeColor);
        });
    });
}

// function changes div's color if it is hovered over
// Each mouse pass will generate a random rgb value and appoint it to the square
function changeColor(e) {
    
    const randomR = Math.floor(Math.random() * 256);
    const randomG = Math.floor(Math.random() * 256);
    const randomB = Math.floor(Math.random() * 256);

    e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
}

// function will create a button inside a div that resets the entire game to default number of squares
function createResetBtn() {
    const reset = document.createElement('div');
    const resetBtn = document.createElement('button');
    reset.className = "reset";
    resetBtn.className = "reset-btn";
    resetBtn.textContent = "Reset";

    slider.appendChild(reset);
    reset.appendChild(resetBtn);

    reset.addEventListener('click', resetGrid);
}

// Reset hovered squares to default condition
function resetGrid(e) {
    //hoveredSquares.forEach((square) => square.classList.remove('hovered'));
    const squares = document.querySelectorAll('.square');
    const breaks = document.querySelectorAll('.break');
    const input = document.querySelector('input');

    deleteGrid(squares, breaks)
    createGrid(input.value);
    checkHover();
}

// function will create a possibility of choosing number of squares in a row
// It will use range input type, defined by min, max, step, value output and with a label
function createChoice() {
    const rangeContainer = document.createElement('div');
    const choiceDiv = document.createElement('div');
    const choiceRange = document.createElement('input');
    const label = document.createElement('label');
    const output = document.createElement('output');
    rangeContainer.className = "choice-container";
    choiceDiv.className = "choice-div"
    choiceRange.className = "choice-range";
    choiceRange.type = "range";
    choiceRange.min = 1;
    choiceRange.max = 100;
    choiceRange.step = 1;
    choiceRange.value = DEFAULT_SQUARE_NUMBER;
    label.for = "choiceRange";
    label.className = "label";
    label.textContent = "Select number of squares per row:";
    output.className = "output";
    output.textContent = DEFAULT_SQUARE_NUMBER;

    slider.appendChild(rangeContainer);
    rangeContainer.appendChild(label);
    rangeContainer.appendChild(choiceDiv);
    choiceDiv.appendChild(choiceRange);
    choiceDiv.appendChild(output);

    chooseSquares();
}

// function will change number of squares based on range input.
// It will actually call another function to do that
function chooseSquares() {
    const input = document.querySelector('.choice-range');

    input.addEventListener('input', makeChanges);
}

// Function will do changes that event triggers
// Value of the output will follow input value
// Based on entered input, squares will be bigger or smaller
function makeChanges(e) {
    const output = document.querySelector('.output');
    const squares = document.querySelectorAll('.square');
    const breaks = document.querySelectorAll('.break');

    output.textContent = e.target.value;

    deleteGrid(squares, breaks);
    createGrid(e.target.value);
    checkHover();
}

// This function will delete all squares so the new one can be generated
function deleteGrid(squares, breaks) {
    squares.forEach((square) => {
        square.remove();
    });
    breaks.forEach((br) => {
        br.remove();
    });
}

const gridContainer = document.querySelector('.grid-container');
const slider = document.querySelector('.slider');
createGrid(DEFAULT_SQUARE_NUMBER);
checkHover();
createResetBtn();
createChoice();