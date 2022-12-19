const inputParser = require("../inputParser.ts");
const lavaCubesInput = inputParser("day-18.txt", "text");

const parseLavaCubes = (input: string[]) =>
  input.reduce((cubes, cube) => ({ ...cubes, [cube]: 6 }), {});

const DELTAS = [
  [1, 0, 0],
  [-1, 0, 0],
  [0, 1, 0],
  [0, -1, 0],
  [0, 0, 1],
  [0, 0, -1],
];

const isOutsideBounds = (pos: number[]): boolean =>
  pos.some((val) => val < 0 || val > 30);

const applyDelta = (
  [x, y, z]: number[],
  [xDiff, yDiff, zDiff]: number[]
): number[] => [x + xDiff, y + yDiff, z + zDiff];

const isEmptySpaceContained = (
  emptySpacePos: string,
  cubes: Record<string, number>
): boolean => {
  const pos = emptySpacePos.split(",").map(Number);

  for (let i = 0; i < DELTAS.length; i++) {
    let contained = false;
    const delta = DELTAS[i];
    let currentPos = applyDelta(pos, delta);
    while (!isOutsideBounds(currentPos) && !contained) {
      if (cubes[currentPos.join(",")]) {
        contained = true;
      }

      currentPos = applyDelta(currentPos, delta);
    }

    if (isOutsideBounds(currentPos)) return false;
  }

  return true;
};

const findExposedSides = (
  cube: string,
  cubes: Record<string, number>,
  containedPositions: Record<string, boolean>
): number => {
  const pos = cube.split(",").map(Number);
  const numberOfAdjacent = DELTAS.reduce((sum, delta) => {
    const diffPos = applyDelta(pos, delta).join(",");
    if (!(diffPos in containedPositions)) {
      containedPositions[diffPos] =
        !cubes[diffPos] && isEmptySpaceContained(diffPos, cubes);
    }

    return !cubes[diffPos] && !containedPositions[diffPos] ? sum + 1 : sum + 0
  }, 0);

  return numberOfAdjacent;
};

const findTotalExposedSides = (input: string[]): number => {
  const cubes = parseLavaCubes(input);

  const containedPositions: Record<string, boolean> = {}

  return Object.keys(cubes).reduce((sum, cubePos) => {
    const exposedSides = findExposedSides(cubePos, cubes, containedPositions);
    console.log(cubePos, exposedSides)
 
    return sum + exposedSides;
  }, 0);
};

console.log(findTotalExposedSides(lavaCubesInput));
