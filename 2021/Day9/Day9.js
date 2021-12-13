const inputParser = require("../inputParser.ts");;
const heightMap = inputParser("day-9.txt", "string");

const sample = [
  "2199943210",
  "3987894921",
  "9856789892",
  "8767896789",
  "9899965678",
];

const createGrid = (input) =>
  input.reduce(
    (grid, line, rowIdx) => ({
      ...grid,
      ...line.split("").reduce(
        (subGrid, val, colIdx) => ({
          ...subGrid,
          [`${rowIdx},${colIdx}`]: val,
        }),
        {}
      ),
    }),
    {}
  );

const adjacentDiffs = [
  [0, 1],
  [1, 0],
  [-1, 0],
  [0, -1],
];

const getAdjacentPositions = (pos, grid) => {
  const [x, y] = pos.split(",").map(Number);
  return adjacentDiffs
    .map(([xDiff, yDiff]) => `${x + xDiff},${y + yDiff}`)
    .filter((adjacentPosition) => !!grid[adjacentPosition]);
};

const isLowerThanAllAdjacent = (pos, grid) => {
  const adjacentValues = getAdjacentPositions(pos, grid).map(
    (adjacentPos) => grid[adjacentPos]
  );

  return adjacentValues.every(
    (adjacentValue) => parseInt(adjacentValue) > parseInt(grid[pos])
  );
};

const findBasinSize = (lowPointPos, grid) => {
  const basin = new Set();
  basin.add(lowPointPos);
  let queue = [lowPointPos];

  while (queue.length > 0) {
    const currentPos = queue.shift();
    if (parseInt(grid[currentPos]) < 9) {
      const newAdjacentPositions = [];
      getAdjacentPositions(currentPos, grid).forEach((newAdjacentPosition) => {
        if (
          parseInt(grid[newAdjacentPosition]) !== 9 &&
          !basin.has(newAdjacentPosition)
        ) {
          newAdjacentPositions.push(newAdjacentPosition);
          basin.add(newAdjacentPosition);
        }
      });

      queue = queue.concat(newAdjacentPositions);
    }
  }

  return basin.size;
};

const sumLowestSpotRiskValues = (input) => {
  const grid = createGrid(input);
  let sum = 0;
  for (let row = 0; row < input.length; row++) {
    for (let col = 0; col < input[row].length; col++) {
      const pos = `${row},${col}`;
      if (isLowerThanAllAdjacent(pos, grid)) {
        sum = sum + Number(grid[pos]) + 1;
      }
    }
  }

  return sum;
};

const findTopThreeBasinSizes = (input) => {
  const grid = createGrid(input);

  const basins = Object.keys(grid)
    .filter((pos) => isLowerThanAllAdjacent(pos, grid))
    .map((pos) => findBasinSize(pos, grid));

  return basins
    .sort((valA, valB) => valA - valB)
    .reverse()
    .slice(0, 3)
    .reduce((product, val) => product * val, 1);
};

console.log(findTopThreeBasinSizes(heightMap));
