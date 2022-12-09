const inputParser = require("../inputParser.ts");
const treeInput = inputParser("day-8.txt", "text");

const sample = ["30373", "25512", "65332", "33549", "35390"];

type Tree = [number, string];
type VisibleTrees = Record<string, number>;

const parseTreeInput = (rawTreeGrid: string[]): Tree[][] =>
  rawTreeGrid.map((row, rowIdx) =>
    row.split("").map((tree, colIdx) => [Number(tree), `${rowIdx},${colIdx}`])
  );

// PART ONE

const countNumVisibleInLine = (line: Tree[]): VisibleTrees => {
  const visible: VisibleTrees = {};
  let highest = -1;
  line.forEach(([treeHeight, pos]) => {
    if (treeHeight > highest) {
      visible[pos] = treeHeight;
      highest = treeHeight;
    }
  });

  return visible;
};

const countNumVisibleVertical = (
  treeRows: Tree[][],
  idx: number
): VisibleTrees => {
  const line = treeRows.map((row) => row[idx]);
  return {
    ...countNumVisibleInLine(line),
    ...countNumVisibleInLine([...line].reverse()),
  };
};

const countTotalVisibleTrees = (treeGrid: Tree[][]): number => {
  let visible = treeGrid.reduce(
    (visibleTrees, row, idx) => ({
      ...visibleTrees,
      ...countNumVisibleInLine(row),
      ...countNumVisibleInLine([...row].reverse()),
    }),
    {}
  );

  for (let i = 0; i < treeGrid[0].length; i++) {
    visible = { ...visible, ...countNumVisibleVertical(treeGrid, i) };
  }

  return Object.keys(visible).length;
};

console.log(countTotalVisibleTrees(parseTreeInput(treeInput)));

// PART TWO

const parseInputToObj = (rawTreeInput: string[]): VisibleTrees =>
  rawTreeInput.reduce(
    (grid, row, rowIdx) => ({
      ...grid,
      ...row.split("").reduce(
        (rowGrid, tree, colIdx) => ({
          ...rowGrid,
          [`${rowIdx},${colIdx}`]: tree,
        }),
        {}
      ),
    }),
    {}
  );

const DELTAS: [number, number][] = [
  [-1, 0],
  [0, -1],
  [0, 1],
  [1, 0],
];

const applyDelta = (pos: string, delta: [number, number]): string => {
  const [startRow, startCol] = pos.split(",").map(Number);
  return [startRow + delta[0], startCol + delta[1]].join(",");
};
const calculateScenicScore = (treeGrid: VisibleTrees, startingPos: string) => {
  const homeTreeHeight = treeGrid[startingPos];
  const scores: number[] = [];
  DELTAS.forEach((delta) => {
    let step = applyDelta(startingPos, delta);
    let score = 0;

    while (step in treeGrid && treeGrid[step] < homeTreeHeight) {
      score++;
      step = applyDelta(step, delta);
    }
    if (step in treeGrid) score++;

    scores.push(score);
  });

  return scores.reduce((product, score) => product * score, 1);
};

const getHighestScenicScore = (gridInput: VisibleTrees): number =>
  Math.max(
    ...Object.keys(gridInput).map((pos) => calculateScenicScore(gridInput, pos))
  );

const grid = parseInputToObj(treeInput);
console.log(getHighestScenicScore(grid));
