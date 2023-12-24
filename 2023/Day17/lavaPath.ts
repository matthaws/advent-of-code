const inputParser = require("../../inputParser.ts");
const inputLines = inputParser("day-17.txt", "number-array");
import {
  DIR,
  getNewCoord,
  STRAIGHT_DIRS,
  NINETY_LEFT,
  NINETY_RIGHT,
} from "../utils/gridTravel";

const findLeastLossPath = (
  grid: number[][],
  currentCoord: [number, number],
  fromDir: DIR,
  numTimesStraightLine: number,
  visited: string[] = []
): number | undefined => {
  const value = grid[currentCoord[0]]?.[currentCoord[1]];
  if (!value) {
    console.log(currentCoord.join(","), "out of bouds, ending search");
    return undefined;
  }
  if (visited.includes(currentCoord.join(","))) return undefined;

  if (
    currentCoord[0] === grid.length - 1 &&
    currentCoord[1] === grid[0].length - 1
  ) {
    console.log("reached the ending square at", currentCoord.join(","));
    return grid[currentCoord[0]]?.[currentCoord[1]];
  }
  const straightVal =
    numTimesStraightLine < 3 &&
    findLeastLossPath(
      grid,
      getNewCoord(currentCoord, STRAIGHT_DIRS[fromDir]),
      fromDir,
      numTimesStraightLine + 1,
      [...visited, currentCoord.join(",")]
    );

console.log(visited.sort())
  const leftDir = NINETY_LEFT[fromDir];
  const rightDir = NINETY_RIGHT[fromDir];
  const left = getNewCoord(currentCoord, leftDir);
  const right = getNewCoord(currentCoord, rightDir);

  const leftVal = grid[left[0]]?.[left[1]]
    ? findLeastLossPath(grid, left, STRAIGHT_DIRS[leftDir], 0, [
        ...visited,
        currentCoord.join(","),
      ])
    : undefined;
  const rightVal = grid[right[0]]?.[right[1]]
    ? findLeastLossPath(grid, right, STRAIGHT_DIRS[rightDir], 0, [
        ...visited,
        currentCoord.join(","),
      ])
    : undefined;
  const vals = [straightVal, leftVal, rightVal].filter(Boolean) as number[];

  const shortestPath = vals.length > 0 ? Math.min(...vals) : undefined;
//   if (vals.length > 0)
//     console.log(currentCoord, { straightVal, left, leftVal, right, rightVal });
  return shortestPath ? shortestPath + value : undefined;
};

const sample = [
  [2, 4, 1, 3, 4, 3, 2, 3, 1, 1, 3, 2, 3],
  [3, 2, 1, 5, 4, 5, 3, 5, 3, 5, 6, 2, 3],
  [3, 2, 5, 5, 2, 4, 5, 6, 5, 4, 2, 5, 4],
  [3, 4, 4, 6, 5, 8, 5, 8, 4, 5, 4, 5, 2],
  [4, 5, 4, 6, 6, 5, 7, 8, 6, 7, 5, 3, 6],
  [1, 4, 3, 8, 5, 9, 8, 7, 9, 8, 4, 5, 4],
  [4, 4, 5, 7, 8, 7, 6, 9, 8, 7, 7, 6, 6],
  [3, 6, 3, 7, 8, 7, 7, 9, 7, 9, 6, 5, 3],
  [4, 6, 5, 4, 9, 6, 7, 9, 8, 6, 8, 8, 7],
  [4, 5, 6, 4, 6, 7, 9, 9, 8, 6, 4, 5, 3],
  [1, 2, 2, 4, 6, 8, 6, 8, 6, 5, 5, 6, 3],
  [2, 5, 4, 6, 5, 4, 8, 8, 8, 7, 7, 3, 5],
  [4, 3, 2, 2, 6, 7, 4, 6, 5, 5, 5, 3, 3],
];

console.log(findLeastLossPath(sample, [0, 0], "up", 0));
