const inputParser = require("../inputParser.js");
const inputLines = inputParser("day-5.txt", "string");

const parseLine = (line) => {
  const startAndEndPos = line.split(" -> ");
  return startAndEndPos.map((pos) => pos.split(",").map(Number));
};

const findNonDiagonalLines = (lines) =>
  lines.filter(([start, end]) => start[0] === end[0] || start[1] === end[1]);

const makeDiagonalLine = ([start, end]) => {
  const xDir = start[0] < end[0] ? "incr" : "decr";
  const yDir = start[1] < end[1] ? "incr" : "decr";

  let [x1, y1] = start;
  const [x2, y2] = end;

  const linePoints = new Set();
  while (x1 !== x2 && y1 !== y2) {
    linePoints.add(`${x1},${y1}`);
    xDir === "incr" ? x1++ : x1--;
    yDir === "incr" ? y1++ : y1--;
  }
  linePoints.add(`${x2},${y2}`)
  
  return linePoints;
};

const makeLine = ([start, end]) => {
  const linePoints = new Set();
  if (start[0] === end[0]) {
    const x = start[0];
    const y1 = start[1] < end[1] ? start[1] : end[1];
    const y2 = y1 === start[1] ? end[1] : start[1];
    for (i = y1; i <= y2; i++) {
      linePoints.add(`${x},${i}`);
    }

    return linePoints;
  }
  if (start[1] === end[1]) {
    const y = start[1];
    const x1 = start[0] < end[0] ? start[0] : end[0];
    const x2 = x1 === start[0] ? end[0] : start[0];
    for (i = x1; i <= x2; i++) {
      linePoints.add(`${i},${y}`);
    }

    return linePoints;
  }

  return makeDiagonalLine([start, end]);
};

const createBoard = (lines) => {
  const board = lines
    .map(parseLine)
    .map(makeLine)
    .reduce((map, line) => {
      line.forEach((pos) => {
        map[pos] = map[pos] ? map[pos] + 1 : 1;
      });
      return map;
    }, {});

  return board;
};

const findHotSpots = (lines) => {
  const board = createBoard(lines);
  return Object.values(board).filter((val) => val > 1).length;
};

console.log(findHotSpots(inputLines));
