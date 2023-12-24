const inputParser = require("../../inputParser.ts");
const inputLines = inputParser("day-18.txt", "string");

const sample = [
  "R 6 (#70c710)",
  "D 5 (#0dc571)",
  "L 2 (#5713f0)",
  "D 2 (#d2c081)",
  "R 2 (#59c680)",
  "D 2 (#411b91)",
  "L 5 (#8ceee2)",
  "U 2 (#caa173)",
  "L 1 (#1b58a2)",
  "U 2 (#caa171)",
  "R 2 (#7807d2)",
  "U 3 (#a77fa3)",
  "L 2 (#015232)",
  "U 2 (#7a21e3)",
];

type DIR = "R" | "L" | "D" | "U";

const DELTAS = {
  R: [0, 1],
  L: [0, -1],
  D: [1, 0],
  U: [-1, 0],
};

const HEX_DIR: Record<string, string> = {
  "0": "R",
  "1": "D",
  "2": "L",
  "3": "U",
};

const convertHex = (hex: string): [string, number] => {
  const dir = HEX_DIR[hex[hex.length - 1]];
  const numHex = parseInt(hex.slice(0, 5), 16);

  return [dir, numHex];
};

// console.log(convertHex('70c710'))

const findBorderCoords = (input: string[], partTwo = false) => {
  const borderCoords: [number, number][] = [[0, 0]];

  let current: [number, number] = [0, 0];

  input.forEach((line) => {
    let [dir, num, color] = line.split(" ");
    let number = Number(num);

    if (partTwo) {
      [dir, number] = convertHex(color.slice(2, 8));
    }

    for (let i = 0; i < number; i++) {
      const [rowDiff, colDiff] = DELTAS[dir as DIR];
      current = [current[0] + rowDiff, current[1] + colDiff];
      borderCoords.push(current);
    }
  });

  return borderCoords;
};

const drawBorder = (coords: [number, number][]) => {
  let minRow = 0;
  let minCol = 0;
  let maxRow = 0;
  let maxCol = 0;

  coords.forEach(([row, col]) => {
    minRow = Math.min(row, minRow);
    maxRow = Math.max(row, maxRow);
    minCol = Math.min(col, minCol);
    maxCol = Math.max(col, maxCol);
  });

  const drawing: string[] = [];

  for (let row = minRow; row <= maxRow; row++) {
    let rowString = "";
    for (let col = minCol; col <= maxCol; col++) {
      if (coords.find((coord) => coord[0] === row && coord[1] === col)) {
        rowString = rowString + "#";
      } else {
        rowString = rowString + ".";
      }
    }
    drawing.push(rowString);
  }

  return drawing;
};

const isBorderRow = (line: string) => {
  let lineCrossings = 0;
  line.split("").forEach((char, col, arr) => {
    if (char === "." && arr[col + 1] === "#") lineCrossings++;
  });
  return lineCrossings;
};

const replaceAt = (string: string, index: number, replacement: string) => {
  return `${string.slice(0, index)}${replacement}${string.slice(index + 1)}`;
};

const buildNewString = (pic: string[], row: number, col: number) => [
  ...pic.slice(0, row),
  replaceAt(pic[row], col, "X"),
  ...pic.slice(row + 1),
];

const nextStepFlood = (
  borderPic: string[],
  startPoint: [number, number]
): [string[], [number, number][]] => {
  const [row, col] = startPoint;

  const nextDirs = Object.values(DELTAS)
    .map((delta) => [row + delta[0], col + delta[1]])
    .filter((coord) => borderPic[coord[0]][coord[1]] === ".") as [
    number,
    number
  ][];

  let newPic: string[] = [...nextDirs, startPoint].reduce(
    (pic, coord) => buildNewString(pic, coord[0], coord[1]),
    borderPic
  );

  return [newPic, nextDirs];
};

const floodInsides = (borderPic: string[], startPoint: [number, number]) => {
  let [pic, nextDirs] = nextStepFlood(borderPic, startPoint);

  let queue = [...nextDirs];
  while (queue.length > 0) {
    const result = nextStepFlood(pic, queue.shift() as [number, number]);

    pic = result[0];
    queue = queue.concat(result[1]);
  }

  return pic;
};

const countLava = (picture: string[]) =>
  picture.reduce(
    (sum, line) =>
      sum +
      line.split("").filter((char) => char === "X" || char === "#").length,
    0
  );

const solvePartOne = () => {
  const border = drawBorder(findBorderCoords(sample, true),);
    console.log(border.join('\n'))
  //   console.log(border[1][287], border[1][288])
//   const filled = floodInsides(border, [1, 288]);
//   return countLava(filled);
};

console.log(solvePartOne());
