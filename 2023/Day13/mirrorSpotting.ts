const inputParser = require("../../inputParser.ts");
const inputLines = inputParser("day-13.txt", "spaces");

const parseInput = (lines: string[]) => {
  const allGrids: string[][] = [];
  let grid: string[] = [];

  lines.forEach((line) => {
    if (line) {
      grid.push(line);
    } else {
      allGrids.push(grid);
      grid = [];
    }
  });
  return allGrids;
};

const findHorizontalMirror = (input: string[], lineNum: number) => {
  let i = lineNum;
  let diff = 1;
  let mirrorLine = lineNum + diff;
  while (input[i] || input[mirrorLine]) {
    mirrorLine = lineNum + diff;

    // console.log(i, mirrorLine, input[i], input[mirrorLine])
    if (input[i] && input[mirrorLine] && input[i] !== input[mirrorLine]) {
      return false;
    }
    i--;
    diff++;
  }
  return true;
};

const findVerticalMirror = (input: string[], lineNum: number) => {
  let i = lineNum;
  let diff = 1;
  let mirrorLine = lineNum + diff;
  while (input[0][i] || input[0][mirrorLine]) {
    mirrorLine = lineNum + diff;
    if (
      input[0][i] &&
      input[0][mirrorLine] &&
      input.some((line) => line[i] !== line[mirrorLine])
    ) {
      return false;
    }
    i--;
    diff++;
  }
  return true;
};

const findMirrorPoint = (input: string[]): [string, number] | [] => {
  let i = 0;
 
  while (i < input.length - 1) {
    if (findHorizontalMirror(input, i)) return ['horz', i + 1]
    i++;
  }


  let j = 0;
  while (j < input[0].length - 1) {
    if (findVerticalMirror(input, j)) return ['vert', j + 1]
    j++;
  }


  return [];
};

const sumMirrors = (input: string[][]) => {
  const vertVal = input.reduce((sum, grid) => {
    const [dir, num] = findMirrorPoint(grid);

    if (dir === "vert" && !!num) return sum + num;
    return sum;
  }, 0);

  const horzVal = input.reduce((sum, grid) => {
    const [dir, num] = findMirrorPoint(grid);

    if (dir === "horz" && !!num) return sum + num
    return sum;
  }, 0);

  console.log(vertVal, horzVal);

  return vertVal + horzVal * 100;
};

const verticalSample = [
  "#.##..##.",
  "..#.##.#.",
  "##......#",
  "##......#",
  "..#.##.#.",
  "..##..##.",
  "#.#.##.#.",
];

const horizontalSample = [
  "#...##..#",
  "#....#..#",
  "..##..###",
  "#####.##.",
  "#####.##.",
  "..##..###",
  "#....#..#",
];

const oneSample = [
  "#..##...##..#.#..",
  "#..##...##..#.#..",
  "...###.##.#..#.##",
  "#.#.####...##....",
  "###..#.####.#..#.",
  "#.#.#.#..######..",
  "#.#..###.###.#.##",
  "#..#.###.####....",
  ".....###.###..###",
  "#.....#..#.##....",
  ".##..#####..#.###",
];
// console.log(sumMirrors([verticalSample, horizontalSample]));
console.log(sumMirrors(parseInput(inputLines)));
// console.log(findMirrorPoint(oneSample))
