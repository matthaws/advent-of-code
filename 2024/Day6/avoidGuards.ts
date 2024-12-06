const inputParser = require("../../inputParser.ts");
const inputLines = inputParser("day-6.txt", "text");

type Direction = "UP" | "RIGHT" | "DOWN" | "LEFT";

const makeGrid = (input: string[]) => {
  const grid: Record<string, string> = {};

  input.forEach((line, i) => {
    line.split("").forEach((char, j) => {
      grid[`${i}:${j}`] = char;
    });
  });

  return grid;
};

const DIRS: Record<Direction, [number, number]> = {
  UP: [-1, 0],
  RIGHT: [0, 1],
  DOWN: [1, 0],
  LEFT: [0, -1],
};

const RIGHT_TURN: Record<Direction, Direction> = {
  UP: "RIGHT",
  RIGHT: "DOWN",
  DOWN: "LEFT",
  LEFT: "UP",
};

const findInitialPos = (grid: Record<string, string>): [number, number] => {
  const pos =
    Object.entries(grid).find(([pos, char]) => char === "^")?.[0] || ":";

  return pos.split(":").map(Number) as [number, number];
};

const isOutOfBounds = (input: string[], pos: [number, number]) => {
  if (pos[0] < 0 || pos[1] < 0) return true;
  if (pos[0] >= input.length || pos[1] >= input[0].length) return true;

  return false;
};

const checkForGuardLoop = (
  input: string[],
  grid: Record<string, string>
): [boolean, Set<string>] => {
  let pos: [number, number] = findInitialPos(grid);
  const visitedLocations = new Set<string>();
  let currentDir: Direction = "UP";

  while (!isOutOfBounds(input, pos)) {
    let dirDelta = DIRS[currentDir];

    let nextPos = [pos[0] + dirDelta[0], pos[1] + dirDelta[1]] as [
      number,
      number
    ];

    while (grid[`${nextPos.join(":")}`] === "#") {
      currentDir = RIGHT_TURN[currentDir];
      dirDelta = DIRS[currentDir];
      nextPos = [pos[0] + dirDelta[0], pos[1] + dirDelta[1]] as [
        number,
        number
      ];
    }
    const log = `${nextPos.join(",")},${currentDir}`;
    if (visitedLocations.has(log)) return [true, visitedLocations];
    visitedLocations.add(`${nextPos.join(",")},${currentDir}`);

    pos = nextPos;
  }

  return [false, visitedLocations];
};

const findAllGuardLoopPositions = (input: string[]) => {
  const grid = makeGrid(input);
  const loopSpots = new Set<string>();
  const [loop, unobstructedPath] = checkForGuardLoop(input, grid);

  console.log(loop, unobstructedPath.size);

  Array.from(unobstructedPath)
    .map((entry) => {
      const [x, y] = entry.split(",");
      return `${x}:${y}`;
    })
    .filter((entry, i, arr) => arr.indexOf(entry) === i)
    .forEach((pos, i, arr) => {
      console.log("testing", i, "of", arr.length);
      const [x, y] = pos.split(":");
      const charAtPos = grid[`${x}:${y}`];

      if (charAtPos && charAtPos !== "^") {
        const newGrid = { ...grid, [`${x}:${y}`]: "#" };

        const [loop] = checkForGuardLoop(input, newGrid);
        if (loop) {
          loopSpots.add(`${x}:${y}`);
        }
      }
    });

  return loopSpots.size;
};

console.log(findAllGuardLoopPositions(inputLines));
