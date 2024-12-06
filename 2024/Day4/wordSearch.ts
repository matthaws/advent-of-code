const inputParser = require("../../inputParser.ts");
const inputLines = inputParser("day-4.txt", "text");

const parseInput = () => (inputLines as string[]).map((line) => line.split(""));

const diffs: [number, number][] = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
  [-1, -1],
  [1, 1],
  [1, -1],
  [-1, 1],
];

const isOutOfBounds = (lines: string[][], pos: [number, number]) => {
  if (pos[0] < 0 || pos[0] >= lines.length) return true;
  if (pos[1] < 0 || pos[1] >= lines[pos[0]].length) return true;

  return false;
};

const findNextPos = (
  pos: [number, number],
  dir: [number, number]
): [number, number] => [pos[0] + dir[0], pos[1] + dir[1]];

const getCharAtPos = (lines: string[][], pos: [number, number]) =>
  lines[pos[0]][pos[1]];

const checkDir = (
  lines: string[][],
  startPos: [number, number],
  dir: [number, number]
) => {
  let i = 0;
  let currentPos = findNextPos(startPos, dir);
  const MATCH = "MAS";
  while (i < 3) {
    if (
      isOutOfBounds(lines, currentPos) ||
      getCharAtPos(lines, currentPos) !== MATCH[i]
    ) {
      return false;
    }
    i += 1;
    currentPos = findNextPos(currentPos, dir);
  }
  return true;
};

const findAllXmases = (lines: string[][]) => {
  let count = 0;
  lines.forEach((line, i) => {
    line.forEach((char, j) => {
      if (char === "X") {
        const charCount = diffs.reduce(
          (sum, diff) => sum + (checkDir(lines, [i, j], diff) ? 1 : 0),
          0
        );
        count += charCount;
      }
    });
  });

  return count;
};

const oppositeDirs: [number, number][][] = [
  [
    [-1, -1],
    [1, 1],
  ],
  [
    [-1, 1],
    [1, -1],
  ],
];

const X_MATCH = "MS";

const checkForX = (lines: string[][], startPos: [number, number]) => {
  let output = true;
  oppositeDirs.forEach((dirPair) => {
    const [dirA, dirB] = dirPair;
    const posA = findNextPos(startPos, dirA);
    const posB = findNextPos(startPos, dirB);
    if (isOutOfBounds(lines, posA) || isOutOfBounds(lines, posB)) {
      output = false;
    } else if (
      [getCharAtPos(lines, posA), getCharAtPos(lines, posB)].sort().join("") !==
      X_MATCH
    ) {
      output = false;
    }
  });
  return output;
};

const findAllXs = (lines: string[][]) => {
  let count = 0;
  lines.forEach((line, i) => {
    line.forEach((char, j) => {
      if (char === "A" && checkForX(lines, [i, j])) {
        if (i === 1) console.log([i, j], checkForX(lines, [i, j]));
        count += 1;
      }
    });
  });

  return count;
};

console.log(findAllXs(parseInput()));
