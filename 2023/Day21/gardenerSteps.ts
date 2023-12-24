const inputParser = require("../../inputParser.ts");
const inputLines = inputParser("day-21.txt", "text");

const DELTAS = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

const sample = [
  "...........",
  ".....###.#.",
  ".###.##..#.",
  "..#.#...#..",
  "....#.#....",
  ".##..S####.",
  ".##..#...#.",
  ".......##..",
  ".##.#.####.",
  ".##..##.##.",
  "...........",
];

const step = (currentLocations: string[], grid: string[]) => {
  const nextSteps: string[] = [];
  currentLocations.forEach((location) => {
    const [row, col] = location.split(",").map(Number);
    DELTAS.forEach(([rowDiff, colDiff]) => {
      const newRow = row + rowDiff;
      const newCol = col + colDiff;
      const val = `${row + rowDiff},${col + colDiff}`;
      if (
        grid[newRow]?.[newCol] &&
        grid[newRow][newCol] !== "#" &&
        !nextSteps.includes(val)
      ) {
        nextSteps.push(val);
      }
    });
  });
  return nextSteps;
};

const numReachableAfterXSteps = (grid: string[], numSteps: number) => {
    let steps = ["65,65"]
//   let steps: string[] = ["5,5"];
  for (let i = 0; i < numSteps; i++) {
    console.log(steps);
    steps = step(steps, grid);
  }

  return steps.length;
};

console.log(numReachableAfterXSteps(inputLines, 64));
