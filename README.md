# Sudoku

![java](https://img.shields.io/badge/HTML-239120?style=for-the-badge&logo=html5&logoColor=white) ![JS](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E) ![css](https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white) ![node](
https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white`) ![ts](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) ![express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
<br/>
## Introduction
Sudoku is a puzzle that has enjoyed worldwide popularity since 2005. To solve a Sudoku puzzle, one needs to use a combination of logic and trial-and-error. More math is involved behind the scenes: combinatorics used in counting valid Sudoku grids, group theory used to describe ideas of when two grids are equivalent, and computational complexity with regards to solving Sudokus.

## Math behind this game
The standard version of Sudoku consists of a 9×9 square grid containing 81 **cells**. The grid is subdivided into nine 3×3 **blocks**. Some of the 81 cells are filled in with numbers from the set {1,2,3,4,5,6,7,8,9}. These filled-in cells are called **givens**. The goal is to fill in the whole grid using the nine digits so that each row, each column, and each block contains each number exactly once. We call this constraint on the rows, columns, and blocks the **One Rule**.

The above-described puzzle is called a Sudoku of rank 3. A Sudoku of  **rank n**  is an n2×n2  square grid, subdivided into n2  blocks, each of size n×n. The numbers used to fill the grid in are 1, 2, 3, ..., n2, and the One Rule still applies.

Here is an example of a Sudoku puzzle and its solution:
![Problem](https://github.com/sheshanathkumar/sudoku/blob/main/ExSudokuV.jpg?raw=true)

<br/>

## Whats inside this repository
Repository contains 2 folder
* sudoku api (build on npm and express)
* Sudoku Game (based on html, javascript, css)
### Sudoku api
Api is built on express and node.
Follow the steps to start it
* in folder directory run commant npm install 
	* it will install all dependencies I have used
* run npm start  (port is 9091)
* go to postman run a GET request
```
localhost:9091/api/sudoku
```
body
```
{

"values": [3, 1, 6, 5, 7, 8, 4, 9, 2,5, 2, 9, 1, 3, 4, 7, 6, 8, 4, 8, 7, 6, 2, 9, 5, 3, 1, 2, 6, 3, 0, 1, 5, 9, 8, 7, 9, 7, 4, 8, 6, 0, 1, 2, 5, 8, 5, 1, 7, 9, 2, 6, 4, 3,1, 3, 8, 0, 4, 7, 2, 0, 6,6, 9, 2, 3, 5, 1, 8, 7, 4,7, 4, 5, 0, 8, 6, 3, 1, 0]

}
```
After successful execution it will send the result in a array of 81 numbers
<br/>
### Sudoku Game
run the game by running index.html inside the directory

