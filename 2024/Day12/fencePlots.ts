const inputParser = require("../../inputParser.ts");
const inputLines = inputParser("day-12.txt", "text");
const { ORTHAGONAL_DIFFS } = require("../../constants");

type Pos = [number, number];

const makeGrid = (input: string[]) => {
  const grid: Record<string, string> = {};
  input.forEach((line, i) => {
    line.split("").forEach((char, j) => {
      grid[`${i}:${j}`] = char;
    });
  });

  return grid;
};

const getCharAtPos = (grid: Record<string, string>, pos: Pos) =>
  grid[`${pos[0]}:${pos[1]}`];

const findPlotFromPos = (grid: Record<string, string>, pos: Pos) => {
  let plot = new Set([pos.join(":")]);
  let positionsToSearch = [pos];
  const char = getCharAtPos(grid, pos);

  while (positionsToSearch.length) {
    const nextPos = positionsToSearch.shift() as Pos;
    const nextPossiblePositions = (ORTHAGONAL_DIFFS as Pos[])
      .map((diff) => [diff[0] + nextPos[0], diff[1] + nextPos[1]] as Pos)
      .filter(
        (newPos) =>
          getCharAtPos(grid, newPos) === char && !plot.has(newPos.join(":"))
      );

    nextPossiblePositions
      .map((coord) => coord.join(":"))
      .forEach((stringPos) => plot.add(stringPos));
    positionsToSearch = positionsToSearch.concat(nextPossiblePositions);
  }
  return plot;
};

const innerCorners: [number, number][][] = [
  [
    [-1, 0],
    [0, 1],
    [-1, 1],
  ],
  [
    [-1, 0],
    [0, -1],
    [-1, -1],
  ],
  [
    [1, 0],
    [0, -1],
    [1, -1],
  ],
  [
    [1, 0],
    [0, 1],
    [1, 1],
  ],
];

const isNotOppositeEdges = ([posA, posB]: [string, string]) => {
  const firstNum = posA.split(":").map(Number);
  const secondNum = posB.split(":").map(Number);

  return firstNum[0] !== secondNum[0] && firstNum[1] !== secondNum[1];
};

const calculatePlotPrice = (plot: Set<string>) => {
  let corners = 0;
  plot.forEach((pos) => {
    const numberPos = pos.split(":").map(Number);

    const outerEdges = (ORTHAGONAL_DIFFS as Pos[])
      .map((diff) => {
        return [numberPos[0] + diff[0], numberPos[1] + diff[1]].join(":");
      })
      .filter((newPos) => !plot.has(newPos));

    if (
      outerEdges.length === 2 &&
      isNotOppositeEdges(outerEdges as [string, string])
    )
      corners += 1;
    if (outerEdges.length === 3) corners += 2;
    if (outerEdges.length === 4) corners += 4;
    if (pos === "4:2") console.log({ pos, outerEdges });
    innerCorners.forEach((cornerDiffs) => {
      const [first, second, diag] = cornerDiffs.map((diff) =>
        [numberPos[0] + diff[0], numberPos[1] + diff[1]].join(":")
      );
      if (pos === "1:6") console.log(pos, first, second, diag);
      if (plot.has(first) && plot.has(second) && !plot.has(diag)) {
        // console.log(pos, "has an inner corner at", diag);
        corners += 1;
      }
    });

    console.log(pos, corners);
  });
  console.log(corners, plot.size);
  return corners * plot.size;
};

const getAllPlotPrices = (input: string[]) => {
  const allPlots: Set<string>[] = [];
  const grid = makeGrid(input);

  Object.keys(grid).forEach((position) => {
    if (allPlots.every((plot) => !plot.has(position))) {
      allPlots.push(
        findPlotFromPos(grid, position.split(":").map(Number) as Pos)
      );
    }
  });

  //   return calculatePlotPrice(allPlots[4]);

  return allPlots.reduce((sum, plot) => sum + calculatePlotPrice(plot), 0);
};

console.log(getAllPlotPrices(inputLines));
