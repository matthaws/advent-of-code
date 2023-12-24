const inputParser = require("../../inputParser.ts");
const inputLines = inputParser("day-16.txt", "text");

import {
  DIR,
  getNewCoord,
  STRAIGHT_DIRS,
  NINETY_LEFT,
  NINETY_RIGHT,
} from "../utils/gridTravel";

const emptySpace = (
  grid: string[][],
  currentCoord: [number, number],
  cameFromDirection: DIR,
  memo: Set<string>
): [number, number][] => {
  const nextCoord = getNewCoord(currentCoord, STRAIGHT_DIRS[cameFromDirection]);
  if (!grid[nextCoord[0]]?.[nextCoord[1]]) return [currentCoord];

  return [
    ...nextStepBeam(grid, nextCoord, cameFromDirection, memo),
    currentCoord,
  ];
};

const splitBeam = (
  grid: string[][],
  currentCoord: [number, number],
  cameFromDirection: DIR,
  memo: Set<string>
) => {
  const leftDir = NINETY_LEFT[cameFromDirection];
  const rightDir = NINETY_RIGHT[cameFromDirection];
  const left = getNewCoord(currentCoord, leftDir);
  const right = getNewCoord(currentCoord, rightDir);

  const leftVals = grid[left[0]]?.[left[1]]
    ? nextStepBeam(grid, left, STRAIGHT_DIRS[leftDir], memo)
    : [];
  const rightVals = grid[right[0]]?.[right[1]]
    ? nextStepBeam(grid, right, STRAIGHT_DIRS[rightDir], memo)
    : [];

  return [...leftVals, ...rightVals, currentCoord];
};

const nextStepBeam = (
  grid: string[][],
  currentCoord: [number, number],
  cameFromDirection: DIR,
  memo: Set<string> = new Set<string>()
): [number, number][] => {
  //   console.log(currentCoord, cameFromDirection);
  if (memo.has(`${currentCoord},${cameFromDirection}`)) return [];
  memo.add(`${currentCoord},${cameFromDirection}`);
  const locationChar = grid[currentCoord[0]]?.[currentCoord[1]];

  let nextCoord;
  let nextDir;
  switch (locationChar) {
    case ".":
      return emptySpace(grid, currentCoord, cameFromDirection, memo);

    case "\\":
      nextDir =
        cameFromDirection === "left" || cameFromDirection === "right"
          ? NINETY_RIGHT[cameFromDirection]
          : NINETY_LEFT[cameFromDirection];

      nextCoord = getNewCoord(currentCoord, nextDir);
      if (!grid[nextCoord[0]]?.[nextCoord[1]]) return [currentCoord];
      return [
        ...nextStepBeam(grid, nextCoord, STRAIGHT_DIRS[nextDir], memo),
        currentCoord,
      ];

    case "/":
      nextDir =
        cameFromDirection === "left" || cameFromDirection === "right"
          ? NINETY_LEFT[cameFromDirection]
          : NINETY_RIGHT[cameFromDirection];

      nextCoord = getNewCoord(currentCoord, nextDir);
      if (!grid[nextCoord[0]]?.[nextCoord[1]]) return [currentCoord];
      return [
        ...nextStepBeam(grid, nextCoord, STRAIGHT_DIRS[nextDir], memo),
        currentCoord,
      ];

    case "|":
      if (cameFromDirection === "down" || cameFromDirection === "up") {
        return emptySpace(grid, currentCoord, cameFromDirection, memo);
      }
      return [
        ...splitBeam(grid, currentCoord, cameFromDirection, memo),
        currentCoord,
      ];

    case "-":
      if (cameFromDirection === "left" || cameFromDirection === "right") {
        return emptySpace(grid, currentCoord, cameFromDirection, memo);
      }

      return [
        ...splitBeam(grid, currentCoord, cameFromDirection, memo),
        currentCoord,
      ];

    default:
      return [currentCoord];
  }
};

const sample = [
  ".|...\\....",
  "|.-.\\.....",
  ".....|-...",
  "........|.",
  "..........",
  ".........\\",
  "..../.\\\\..",
  ".-.-/..|..",
  ".|....-|.\\",
  "..//.|....",
];

const findMostPossibleEnergizeTiles = (input: string[][]) => {
  let largest = 0;
  for (let i = 0; i < input[0].length; i++) {
    console.log("column", i, "of", input[0].length);
    const fromUp = new Set(
      nextStepBeam(input, [0, i], "up").map((coord) => coord.join(","))
    );
    const fromDown = new Set(
      nextStepBeam(input, [input.length - 1, i], "down").map((coord) =>
        coord.join(",")
      )
    );

    largest = Math.max(largest, fromUp.size, fromDown.size);
  }

  for (let j = 0; j < input.length; j++) {
    console.log("row", j, "of", input.length);
    const fromRight = new Set(
      nextStepBeam(input, [0, j], "right").map((coord) => coord.join(","))
    );
    const fromLeft = new Set(
      nextStepBeam(input, [input[0].length, j], "left").map((coord) =>
        coord.join(",")
      )
    );

    largest = Math.max(largest, fromLeft.size, fromRight.size);
  }
  return largest;
};

console.log(
  findMostPossibleEnergizeTiles(
    inputLines.map((line: string) => line.split(""))
  )
);
