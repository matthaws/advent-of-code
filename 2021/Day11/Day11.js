const inputParser = require('../inputParser.ts');
const createNumericGridMap = require('../helpers/createNumericGridMap');
const octopi = inputParser('day-11.txt', 'text');

const adjacentDiffs = [
  [0, 1],
  [1, 0],
  [-1, 0],
  [0, -1],
  [1, 1],
  [-1, -1],
  [1, -1],
  [-1, 1],
];

const getAllNeighborPositions = (pos, grid) =>
  adjacentDiffs
    .map(([xDiff, yDiff]) => {
      const [x, y] = pos.split(',').map(Number);
      return [x + xDiff, y + yDiff].join(',');
    })
    .filter((neighborPos) => grid[neighborPos] !== undefined);

const step = (grid) =>
  Object.fromEntries(Object.entries(grid).map(([pos, val]) => [pos, val + 1]));

const flash = (grid) => {
  let totalFlashCount = 0;
  let newGrid = grid;
  const flashedThisRound = new Set();

  while (
    Object.entries(newGrid)
      .filter(([pos]) => !flashedThisRound.has(pos))
      .some(([_, val]) => val > 9)
  ) {
    newGrid = Object.entries(newGrid).reduce((updatedGrid, [pos, val]) => {
      if (val > 9 && !flashedThisRound.has(pos)) {
        totalFlashCount++;
        flashedThisRound.add(pos);
        const neighbors = getAllNeighborPositions(pos, updatedGrid);
        const affectedArea = Object.fromEntries(
          neighbors.map((neighborPos) => [
            neighborPos,
            flashedThisRound.has(neighborPos)
              ? 0
              : updatedGrid[neighborPos] + 1,
          ])
        );

        return {
          ...updatedGrid,
          ...affectedArea,
          [pos]: 0,
        };
      }
      return updatedGrid;
    }, newGrid);
  }
  console.log(flashedThisRound);
  return [
    newGrid,
    totalFlashCount,
    Object.keys(grid).every((pos) => flashedThisRound.has(pos)),
  ];
};

const numFlashesAfterNSteps = (input, numSteps) => {
  let grid = createNumericGridMap(input);
  let round = 0;
  let flashes = 0;
  while (round < numSteps) {
    grid = step(grid);
    const [newGrid, totalFlashCount] = flash(grid);
    grid = newGrid;
    flashes = flashes + totalFlashCount;
    round++;
  }

  return flashes;
};

const findFirstSynchronizedFlash = (input) => {
  let grid = createNumericGridMap(input);
  let stepNum = 0;
  let didAllFlash = false;
  while (!didAllFlash) {
    stepNum++;
    const [newGrid, _, didAllFlashThisRound] = flash(step(grid));
    grid = newGrid;
    didAllFlash = didAllFlashThisRound;
  }
  return stepNum;
};

console.log(numFlashesAfterNSteps(octopi, 100));
console.log(findFirstSynchronizedFlash(octopi));
