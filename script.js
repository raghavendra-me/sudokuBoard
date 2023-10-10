// Define the 6x6 Sudoku grid as a 2D array
let grid = [
    [3, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 4],
    [1, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 0, 0]
];

const sudokuGrid = document.getElementById('sudoku-grid');
const solveButton = document.getElementById('solve-button');
const resetButton = document.getElementById('reset-button');

// Function to initialize the Sudoku grid
function initializeGrid() {
    for (let i = 0; i < 6; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < 6; j++) {
            const cell = document.createElement('td');
            const input = document.createElement('input');
            input.type = 'number';
            input.min = '1';
            input.max = '6';
            input.value = grid[i][j] === 0 ? '' : grid[i][j];
            cell.appendChild(input);
            row.appendChild(cell);
        }
        sudokuGrid.appendChild(row);
    }
}

// Function to solve the Sudoku puzzle (you need to implement this)
function solveSudoku(board) {
    const size = 6;
  
    // Check if a number is valid in the current cell
    const isValid = (row, col, num) => {
      // Check row and column for uniqueness
      for (let i = 0; i < size; i++) {
        if (board[row][i] === num || board[i][col] === num) {
          return false;
        }
      }
  
      // Check 2x3 subgrid for uniqueness
      const subgridRowStart = Math.floor(row / 2) * 2;
      const subgridColStart = Math.floor(col / 3) * 3;
  
      for (let i = subgridRowStart; i < subgridRowStart + 2; i++) {
        for (let j = subgridColStart; j < subgridColStart + 3; j++) {
          if (board[i][j] === num) {
            return false;
          }
        }
      }
  
      return true;
    };
  
    // Find the first empty cell
    const findEmptyCell = () => {
      for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
          if (board[row][col] === 0) {
            return [row, col];
          }
        }
      }
      return null;
    };
  
    // Solve the Sudoku recursively
    const solve = () => {
      const emptyCell = findEmptyCell();
  
      if (!emptyCell) {
        // No empty cells, Sudoku is solved
        return true;
      }
  
      const [row, col] = emptyCell;
  
      for (let num = 1; num <= size; num++) {
        if (isValid(row, col, num)) {
          board[row][col] = num;
  
          if (solve()) {
            return true;
          }
  
          // If placing the current number doesn't lead to a solution, backtrack
          board[row][col] = 0;
        }
      }
  
      // No valid number found, backtrack
      return false;
    };
  
    // Start solving from the top-left corner
    solve();
    return board;
  }

// Function to solve the Sudoku puzzle
function solveSudoku6x6() {
   // Assuming you have a table with id 'sudoku-grid' in your HTML
const table = document.getElementById('sudoku-grid');

// Initialize an empty 2D array
let sudokuBoard = [];

// Iterate over the rows of the table
for (let i = 0; i < table.rows.length; i++) {
    const row = table.rows[i];
    const rowData = [];

    // Iterate over the cells in each row
    for (let j = 0; j < row.cells.length; j++) {
        const cell = row.cells[j];
        const input = cell.querySelector('input'); // Assuming you have input elements in each cell

        // Extract the value from the input and parse it as an integer
        const value = parseInt(input.value) || 0; // Use 0 for empty cells

        // Add the value to the rowData array
        rowData.push(value);
    }

    // Add the rowData array to the sudokuBoard
    sudokuBoard.push(rowData);
}

// Now sudokuBoard is a 2D array representing the values in your table
const solvedBoard = solveSudoku(sudokuBoard);

if(solvedBoard){
    const table = document.getElementById('sudoku-grid');

    // Iterate over the rows of the table
    for (let i = 0; i < table.rows.length; i++) {
        const row = table.rows[i];

        // Iterate over the cells in each row
        for (let j = 0; j < row.cells.length; j++) {
            const cell = row.cells[j];
            const input = cell.querySelector('input'); // Assuming you have input elements in each cell

            // Update the input value with the solved value from sudokuBoard
            input.value = sudokuBoard[i][j];
        }
    }
}else{
    console.log("No solution");
}
}


// Event listener for the Solve button
solveButton.addEventListener('click', solveSudoku6x6);

// Event listener for the Reset button
resetButton.addEventListener('click', () => {
    // Clear the Sudoku grid
    sudokuGrid.innerHTML = '';
    // Reinitialize the grid with the initial values
    initializeGrid();
    console.log("reset");
});

// Initialize the Sudoku grid when the page loads
initializeGrid();



  
  
