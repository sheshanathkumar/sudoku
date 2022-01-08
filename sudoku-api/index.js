const express = require("express");

const app = express();
const port = 9091;
let N = 9;
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

const sudoku = {
  values: [],
};

app.get("/home", (req, res) => {
  res.send("Hello World, from express");
});

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

function validSudoku(board) {
  for (let i = 0; i < N; i++) {
    let sum = 0;
    for (let j = 0; j < N; j++) {
      sum = sum + board[i][j];
      if (sum > 45) return false;
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
  //console.log(board);

  const solved = sudokuSolverUtil(board);
  const resultArr = [];
  if (solved) {
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        resultArr.push(board[i][j]);
      }
      console.log("\n");
    }

    return resultArr;
  } else return "can not be solved";
}

app.get("/api/sudoku", (req, res) => {
  const data = req.body;
  sudoku.values = data.values;
  console.log(sudoku.values);
  const result = sudokuSolver(sudoku.values);
  res.send(result);
});

app.listen(port, () =>
  console.log(`Hello world app listening on port ${port}!`)
);
