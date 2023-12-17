const inputParser = require("../../inputParser.ts");
const inputLines = inputParser("day-11.txt", "text");

const findEmptyRows = (inputLines: string[]) =>
  inputLines
    .map((line, i) => (line.split("").every((val) => val === ".") ? i : -1))
    .filter((val) => val > -1);

const findEmptyCols = (inputLines: string[]) => {
  const emptyCols: number[] = [];
  for (let i = 0; i < inputLines[0].length; i++) {
    if (inputLines.every((line) => line[i] === ".")) {
      emptyCols.push(i);
    }
  }
  return emptyCols;
};

const calculateDistance = (
  locA: [number, number],
  locB: [number, number],
  emptyRows: number[],
  emptyCols: number[]
): number => {
  const rowMovement =
    locA[0] > locB[0] ? [locB[0], locA[0]] : [locA[0], locB[0]];
  const emptyRowsPassedThrough = emptyRows.filter(
    (row) => row > rowMovement[0] && row < rowMovement[1]
  );
  const rowMovementWithExpansion =
    rowMovement[1] - rowMovement[0] + (emptyRowsPassedThrough.length * 999999);

  const colMovement =
    locA[1] > locB[1] ? [locB[1], locA[1]] : [locA[1], locB[1]];
  const emptyColsPassedThrough = emptyCols.filter(
    (col) => col > colMovement[0] && col < colMovement[1]
  );
  const colMovementWithExpansion =
    colMovement[1] - colMovement[0] + (emptyColsPassedThrough.length * 999999);

  return rowMovementWithExpansion + colMovementWithExpansion;
};

const findAllGalaxies = (inputLines: string[]) => {
  const galaxies: [number, number][] = [];
  inputLines.forEach((line, row) => {
    line.split("").forEach((char, col) => {
      if (char === "#") galaxies.push([row, col]);
    });
  });

  return galaxies;
};

const sample = [
  "...#......",
  ".......#..",
  "#.........",
  "..........",
  "......#...",
  ".#........",
  ".........#",
  "..........",
  ".......#..",
  "#...#.....",
];

const calculateAllDistances = () => {
  const emptyCols = findEmptyCols(inputLines);
  const emptyRows = findEmptyRows(inputLines);
  const galaxies = findAllGalaxies(inputLines);

  let sum = 0;

  galaxies.forEach((galA, i) => {
    galaxies.forEach((galB, j) => {
      if (j > i) {
        const newDistance = calculateDistance(galA, galB, emptyRows, emptyCols);
        console.log(galA, galB, newDistance)
        sum = sum + newDistance
      }
    });
  });

  return sum;
};

console.log(calculateAllDistances());
