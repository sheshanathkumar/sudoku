const puzzleBoard = document.querySelector("#puzzle");
const solveBtn = document.querySelector("#solve");
const resetBtn = document.querySelector("#reset");

const N = 9;
const square = N * N;
const inputData = [];

function createBoard(num) {
  for (let i = 0; i < num * num; i++) {
    const inputElement = document.createElement("input");
    inputElement.setAttribute("type", "number");
    inputElement.setAttribute("min", "1");
    inputElement.setAttribute("max", "9");
    inputElement.setAttribute("maxLength", "1");

    inputElement.innerHTML = "6";

    console.log(num + " " + num * num);
    puzzleBoard.appendChild(inputElement);
  }
}

function isNumberPresentInRow(board, number, row) {
  for (let i = 0; i < N; i++) {
    if (board[row][i] == number) {
      return true;
    }
  }
  return false;
}

function isNumberPresentInColumn(board, number, column) {
  for (let i = 0; i < N; i++) {
    if (board[i][column] == number) {
      return true;
    }
  }
  return false;
}

function isNumberPresentInBox(board, number, row, column) {
  let row_topLeftIdx = row - (row % 3);
  let column_topLeftIdx = column - (column % 3);

  for (let i = row_topLeftIdx; i < row_topLeftIdx + 3; i++) {
    for (let j = column_topLeftIdx; j < column_topLeftIdx + 3; j++) {
      if (board[i][j] == number) {
        return true;
      }
    }
  }
  return false;
}

function isValidPlacement(board, number, row, column) {
  return (
    !isNumberPresentInBox(board, number, row, column) &&
    !isNumberPresentInRow(board, number, row) &&
    !isNumberPresentInColumn(board, number, column)
  );
}

function checkDuplicate(arr) {
  let tArr = [];
  arr.forEach((x) => {
    if (tArr.indexOf(x) == -1) {
      tArr.push(x);
    }
    if (x == 0) {
      tArr.push(0);
    }
  });
  return arr.length != tArr.length;
}

function validSudoku(board) {
  for (let i = 0; i < N; i++) {
    let arr = [];
    for (let j = 0; j < N; j++) {
      arr.push(board[i][j]);
    }

    if (checkDuplicate(arr)) {
      return false;
    }
  }
  return true;
}

function sudokuSolverUtil(board) {
  const valid = validSudoku(board);
  if (!valid) {
    return false;
  }
  for (let row = 0; row < N; row++) {
    for (let column = 0; column < N; column++) {
      if (board[row][column] == 0) {
        for (let tryingNumber = 1; tryingNumber <= 9; tryingNumber++) {
          if (isValidPlacement(board, tryingNumber, row, column)) {
            board[row][column] = tryingNumber;
            if (sudokuSolverUtil(board)) {
              return true;
            } else {
              board[row][column] = 0;
            }
          }
        }
        return false;
      }
    }
  }
  return true;
}

function sudokuSolver(values) {
  const board = [];
  let i = 0;
  while (i < N * N) {
    let box = [];
    for (let j = i; j < i + N; j++) {
      box.push(values[j]);
    }
    board.push(box);
    i = i + N;
  }

  const solved = sudokuSolverUtil(board);
  const resultArr = [];
  if (solved) {
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        resultArr.push(board[i][j]);
      }
    }

    return resultArr;
  } else return "can not be solved";
}

function joinValues() {
  const inputs = document.querySelectorAll("input");
  inputs.forEach((x) => {
    if (x.value) {
      inputData.push(parseInt(x.value));
    } else {
      inputData.push(0);
    }
  });
  console.log(inputData);
  const solveSudokuVal = sudokuSolver(inputData);
  if (solveSudokuVal === "can not be solved") {
    alert("Can not be solved");
    reset();
  } else {
    for (let i = 0; i < N * N; i++) {
      inputs[i].value = solveSudokuVal[i];
    }
  }

  console.log(solveSudokuVal);
}

function reset() {
  const inputs = document.querySelectorAll("input");
  for (let i = 0; i < N * N; i++) {
    inputData.pop();

    inputs[i].value = 0;
  }
}

createBoard(N);

solveBtn.addEventListener("click", joinValues);
resetBtn.addEventListener("click", reset);
