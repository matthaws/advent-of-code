const inputParser = require("../inputParser.ts");
const wallsInput = inputParser("day-14.txt", "text");

type Grid = Record<string, string>;

const drawHorizontalLine = (
  x: number,
  firstY: number,
  secondY: number
): Grid => {
  const grid: Grid = {};
  const [start, finish] =
    firstY < secondY ? [firstY, secondY] : [secondY, firstY];

  let i = start;
  while (i < finish + 1) {
    grid[`${x},${i}`] = "#";
    i++;
  }

  return grid;
};

const drawVerticalLine = (firstX: number, secondX: number, y: number): Grid => {
  const grid: Grid = {};
  const [start, finish] =
    firstX < secondX ? [firstX, secondX] : [secondX, firstX];

  let i = start;
  while (i < finish + 1) {
    grid[`${i},${y}`] = "#";
    i++;
  }

  return grid;
};

const drawWalls = (wallPaths: string[]): Grid =>
  wallPaths.reduce((currentGrid, wall) => {
    const points = wall
      .split(" -> ")
      .map((point) => point.split(",").map(Number));
    let grid = {};
    let i = 1;
    while (i < points.length) {
      const [firstX, firstY] = points[i - 1];
      const [secondX, secondY] = points[i];

      if (firstX === secondX) {
        grid = { ...grid, ...drawHorizontalLine(firstX, firstY, secondY) };
      }

      if (firstY === secondY) {
        grid = { ...grid, ...drawVerticalLine(firstX, secondX, firstY) };
      }
      i++;
    }

    return { ...currentGrid, ...grid };
  }, {});

const getPaths = (pos: Pos): Pos[] => {
  const down = [pos[0], pos[1] + 1];
  const downLeft = [pos[0] - 1, pos[1] + 1];
  const downRight = [pos[0] + 1, pos[1] + 1];

  return [down, downLeft, downRight];
};

type Pos = number[];

const getFloor = (grid: Grid): number =>
  Math.max(...Object.keys(grid).map((key) => Number(key.split(",")[1]))) + 2;

const isSandAtRest = (pos: Pos, grid: Grid, floor: number): boolean =>
  getPaths(pos).every((potentialPos) => !!grid[potentialPos.join(",")]) ||
  pos[1] === floor - 1;

const findNextSandPos = (pos: Pos, grid: Grid): Pos =>
  getPaths(pos).find((potentialPos) => !grid[potentialPos.join(",")]) || pos;

const findSandLandingSpot = (grid: Grid, floor: number): string | boolean => {
  let sandPos: number[] = [500, 0];

  while (!isSandAtRest(sandPos, grid, floor)) {
    // console.log({
    //   sandPos,
    //   next: findNextSandPos(sandPos, grid),
    //   rest: isSandAtRest(sandPos, grid),
    //   out: isSandOutOfBounds(sandPos, floor),
    //   paths: getPaths(sandPos).map(newPos => grid[newPos.join(',')] || ".").join('')
    // });
    sandPos = findNextSandPos(sandPos, grid);
  }

  return sandPos.join(",");
};

const findMaxNumSand = (input: string[]): number => {
  const grid = drawWalls(input);
  const floor = getFloor(grid);
  console.log(floor)
  let newSand = findSandLandingSpot(grid, floor);
  let num = 1;
  grid[newSand as string] = "S";
  while (newSand !== "500,0") {
    console.log(newSand);
    newSand = findSandLandingSpot(grid, floor);
    if (newSand) {
      grid[newSand as string] = "S";
      num++;
    }
  }
  return num;
};

console.log(findMaxNumSand(wallsInput));
