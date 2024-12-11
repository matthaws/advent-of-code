const inputParser = require("../../inputParser.ts");
const inputLines = inputParser("day-10.txt", "text");

const DIRS: [number, number][] = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

const makeGrid = (input: string[]) => {
  const grid: Record<string, number> = {};
  input.forEach((line, i) =>
    line.split("").forEach((char, j) => {
      grid[`${i}:${j}`] = Number(char);
    })
  );

  return grid;
};

const followTrail = (
  grid: Record<string, number>,
  startPos: [number, number]
) => {
  const startingValue = grid[startPos.join(":")];
  if (startingValue === 9) {
    // console.log("reached a 9 at", startPos);
    // return [startPos];
    return 1;
  }

  //   let trailEnds: [number, number][] = [];
  let sum = 0;
  DIRS.forEach((delta) => {
    const newPosition: [number, number] = [
      startPos[0] + delta[0],
      startPos[1] + delta[1],
    ];
    const valueAtPosition = grid[newPosition.join(":")];

    if (valueAtPosition === startingValue + 1) {
      const search = followTrail(grid, newPosition);
      //   if (search.length) trailEnds = trailEnds.concat(search);
      sum += search;
    }
  });

  return sum;
};

const countTrailheads = (input: string[]) => {
  const grid = makeGrid(input);
  let sum = 0;
  Object.keys(grid).forEach((key) => {
    if (grid[key] === 0) {
      const score = followTrail(
        grid,
        key.split(":").map(Number) as [number, number]
      );

      console.log("trailhead", key, "scores", score);
      sum += score;
    }
  });

  return sum;
};

console.log(countTrailheads(inputLines));
