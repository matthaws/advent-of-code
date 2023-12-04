const inputParser = require("../inputParser.ts");
const inputLines = inputParser("day-3.txt", "text");

type Loc = string;
type PartNumber = [number, Loc[]];

const sample = [
  "467.....114",
  "...*......",
  "..35..633.",
  "......#...",
  "617*......",
  ".....+.58.",
  "..592.....",
  "......755.",
  "...$.*....",
  ".664.598..",
];

const findAllNumbersWithLocations = (lines: string[]) => {
  const foundNumbers: PartNumber[] = [];
  lines.forEach((line, row) => {
    let foundNumber = "";
    let foundNumberLocs: string[] = [];
    line.split("").forEach((char, col) => {
      const testChar = Number(char);

      if (isNaN(testChar) && foundNumberLocs.length) {
        foundNumbers.push([Number(foundNumber), foundNumberLocs]);
        foundNumberLocs = [];
        foundNumber = "";
      } else if (!isNaN(testChar)) {
        foundNumber = `${foundNumber}${char}`;
        foundNumberLocs.push(`${row},${col}`);
      }
    });

    if (foundNumberLocs.length) {
      foundNumbers.push([Number(foundNumber), foundNumberLocs]);
      foundNumberLocs = [];
      foundNumber = "";
    }
  });

  return foundNumbers;
};

const isSymbol = (char: string) => char !== "." && isNaN(Number(char));

const isLocationAdjacentToSymbol = (
  loc: Loc,
  lines: string[],
  symbol?: string
) => {
  const deltas = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
    [-1, -1],
    [1, -1],
    [-1, 1],
    [1, 1],
  ];
  const [row, col] = loc.split(",").map(Number);
  for (let i = 0; i < deltas.length; i++) {
    const [deltaRow, deltaCol] = deltas[i];
    const newLoc = [row + deltaRow, col + deltaCol];
    if (
      newLoc.every((val) => val > 0) &&
      newLoc[0] < lines.length &&
      newLoc[1] < lines[0].length
    ) {
      const [newRow, newCol] = newLoc;
      const neighbor = lines[newRow][newCol];
      if (symbol ? neighbor === symbol : isSymbol(neighbor)) {
        return symbol ? newLoc : true;
      }
    }
  }

  return false;
};

const sumAllGondolaParts = (lines: string[]) => {
  const potentialParts = findAllNumbersWithLocations(lines);

  let sum = 0;
  potentialParts.forEach((part: PartNumber) => {
    const [number, locs] = part;
    if (locs.some((loc) => isLocationAdjacentToSymbol(loc, lines))) {
      sum = sum + number;
    }
  }, 0);
  return sum;
};

// PART TWO

const isLocationAdjacentToGear = (loc: Loc, lines: string[]) => {
  const deltas = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
    [-1, -1],
    [1, -1],
    [-1, 1],
    [1, 1],
  ];
  const [row, col] = loc.split(",").map(Number);
  for (let i = 0; i < deltas.length; i++) {
    const [deltaRow, deltaCol] = deltas[i];
    const newLoc = [row + deltaRow, col + deltaCol];
    if (
      newLoc.every((val) => val > 0) &&
      newLoc[0] < lines.length &&
      newLoc[1] < lines[0].length
    ) {
      const [newRow, newCol] = newLoc;
      const neighbor = lines[newRow][newCol];
      if (neighbor === "*") {
        return `${newRow},${newCol}`;
      }
    }
  }

  return null;
};

const findGearRatios = (lines: string[]) => {
  const potentialParts = findAllNumbersWithLocations(lines);
  const gears: Record<string, number[]> = {};

  potentialParts.forEach((part) => {
    const asterisks = part[1]
      .map((loc) => isLocationAdjacentToGear(loc, lines))
      .filter(Boolean)
      .filter((ast, i, arr) => arr.indexOf(ast) === i);

    (asterisks as string[]).forEach((ast) => {
      if (gears[ast]) {
        gears[ast].push(part[0]);
      } else {
        gears[ast] = [part[0]];
      }
    });
  });

  return Object.keys(gears).reduce((sum, gear) => {
    const gearNeighbors = gears[gear]
    if (gearNeighbors.length === 2) {
      return sum + (gearNeighbors[0] * gearNeighbors[1])
    }
    return sum
  }, 0);
};

console.log(findGearRatios(inputLines))