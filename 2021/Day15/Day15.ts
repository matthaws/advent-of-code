const parseDay15Input = require('../inputParser.ts');
const caveMap = parseDay15Input('day-15.txt', 'string');
const createCaveRiskMap = require('../helpers/createNumericGridMap');

type Grid = Record<string, number>;

const neighborDiffs = [
  [0, 1],
  [1, 0],
  [-1, 0],
  [0, -1],
];

const getNeighborPositions = (
  pos: string,
  grid: Grid,
  visitedLocations: string[]
): string[] => {
  const [x, y] = pos.split(',').map(Number);
  return neighborDiffs
    .map(([xDiff, yDiff]) => [x + xDiff, y + yDiff].join(','))
    .filter((diff) => !!grid[diff] && !visitedLocations.includes(diff));
};

const addUpPath = (path: string[], grid: Grid) =>
  path.reduce((sum, pos) => sum + grid[pos], 0);

const memo: Record<string, number> = {};

const render = (visitedLocations: string[]) => {
  const maxRow = caveMap.length;
  const maxCol = caveMap[0].length;
  const grid = [];
  for (let i = 0; i < maxRow; i++) {
    const row = [];
    for (let j = 0; j < maxCol; j++) {
      row.push(visitedLocations.includes(`${i},${j}`) ? '#' : '_');
    }
    grid.push(row.join(''));
  }
  console.log(grid.join('\n'));
};

const isExitBlocked = (
  endPos: string,
  grid: Grid,
  visitedLocations: string[]
) =>
  visitedLocations.length > 80 &&
  !findPath(endPos, '8,8', grid, visitedLocations);
let shortest: number = 1000;
const findPath = (
  startPos: string,
  endPos: string,
  grid: Grid,
  visitedLocations: string[] = [startPos],
  memo: Record<string, number> = {}
): boolean => {
  if (startPos === endPos) {
    const locations = [...visitedLocations, endPos];
    const count = addUpPath(locations, grid);
    memo[locations.join('->')] = addUpPath(locations, grid);
    if (count < shortest) {
      shortest = count;
      console.log(shortest);
    }
    return true;
  }

  if (addUpPath(visitedLocations, grid) > shortest) {
    return false;
  }

  if (isExitBlocked(endPos, grid, visitedLocations)) {
    return false;
  }
  const neighbors = getNeighborPositions(startPos, grid, [...visitedLocations]);
  const results = neighbors.map((neighbor) => {
    const updatedLocations = [...visitedLocations, neighbor];
    return findPath(neighbor, endPos, grid, updatedLocations, memo);
  });
  // console.log(visitedLocations);
  // console.log(render(visitedLocations));
  return results.some((result) => result);
};

const navigateCave = (input: string[]) => {
  const startPos = '0,0';
  const endPos = `${input.length - 1},${input[0].length - 1}`;
  const grid = createCaveRiskMap(input);
  const memo: Record<string, number> = {};
  findPath(startPos, endPos, grid, [], memo);

  return Math.min(...Object.values(memo)) - grid[startPos];
};

console.log(navigateCave(caveMap));
