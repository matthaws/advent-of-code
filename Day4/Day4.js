const inputParser = require("../inputParser.js");
const parseBingoBoards = require("./parseBingoBoards.js");
const bingoInput = inputParser("day-4.txt", "spaces");

const markBoard = (board, calledNumber) => {
  const foundPos = Object.keys(board).find(
    (pos) => board[pos].value === calledNumber
  );
  if (!foundPos) return board;
  return {
    ...board,
    [foundPos]: { ...board[foundPos], selected: true },
  };
};

const checkBoardForHorzWin = (board, rowNum) =>
  Object.keys(board)
    .filter((pos) => pos.startsWith(rowNum.toString()))
    .every((pos) => board[pos].selected);

const checkBoardForVertWin = (board, colNum) =>
  Object.keys(board)
    .filter((pos) => pos.includes(`,${colNum}`))
    .every((pos) => board[pos].selected);

const checkBoardForWin = (board) => {
  for (i = 0; i < 5; i++) {
    if (checkBoardForHorzWin(board, i) || checkBoardForVertWin(board, i)) {
      return true;
    }
  }

  return false;
};

const findFirstWinningBoard = (calledNumbers, bingoBoards) => {
  let markedBingoBoards = bingoBoards;
  let i = 0;
  while (i < calledNumbers.length) {
    currentNum = calledNumbers[i];
    console.log(`${i} of ${calledNumbers.length}: ${currentNum}`);
    markedBingoBoards = markedBingoBoards.map((board) =>
      markBoard(board, currentNum)
    );
    const winningBoard = markedBingoBoards.find((board) =>
      checkBoardForWin(board)
    );
    if (winningBoard) {
      return [winningBoard, currentNum];
    }
    i++;
  }
  return [];
};

const findLastWinningBoard = (calledNumbers, bingoBoards) => {
  let markedBingoBoards = bingoBoards;
  let i = 0;
  let lastWinningBoard;
  while (i < calledNumbers.length) {
    currentNum = calledNumbers[i];
    console.log(`${i} of ${calledNumbers.length}: ${currentNum}`);
    markedBingoBoards = markedBingoBoards.filter(board => !checkBoardForWin(board)).map((board) =>
      markBoard(board, currentNum)
    );
    const winningBoard = markedBingoBoards.find((board) =>
      checkBoardForWin(board)
    );
    if (winningBoard) {
      lastWinningBoard = [winningBoard, currentNum]
    }
    i++;
  }
  return lastWinningBoard;
}

const findScoreOfBoard = (board, lastCalledNum) => {
  const unmarkedSum = Object.keys(board).reduce(
    (sum, pos) => (board[pos].selected ? sum : sum + board[pos].value),
    0
  );
  return unmarkedSum * lastCalledNum;
};

const playBingo = (input) => {
  const { calledNumbers, bingoBoards } = parseBingoBoards(input);
  const [winningBoard, lastCalledNum] = findLastWinningBoard(
    calledNumbers,
    bingoBoards
  );
  return findScoreOfBoard(winningBoard, lastCalledNum);
};

console.log(playBingo(bingoInput));
