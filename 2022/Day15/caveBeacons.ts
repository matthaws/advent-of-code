const inputParser = require("../inputParser.ts");
const beaconInput = inputParser("day-15.txt", "text");

const getNumericXY = (pos: string): number[] => pos.split(",").map(Number);

const findManhattanDistance = (posA: string, posB: string): number => {
  const [ax, ay] = posA.split(",").map(Number);
  const [bx, by] = posB.split(",").map(Number);
  return Math.abs(ax - bx) + Math.abs(ay - by);
};

const findOverlapOnYVal = (
  pos: string,
  line: number,
  distance: number
): number[]  => {
  const [x, y] = getNumericXY(pos);
  const xRemainder = distance - Math.abs(y - line);
  if (xRemainder < 0) return [];

  const range = [x - xRemainder, x + xRemainder];
 return range;
};

const combineRanges = (rangeA: number[], rangeB: number[]): number[][] => {
  const [aLowest, aHighest] = rangeA;
  const [bLowest, bHighest] = rangeB;

  if (aHighest < bLowest || bHighest < aLowest) {
    return [rangeA, rangeB];
  }

  return [
    [
      aLowest < bLowest ? aLowest : bLowest,
      aHighest > bHighest ? aHighest : bHighest,
    ],
  ];
};

const getNumbers = (input: string): string =>
  input
    .split(", ")
    .map((line) => line.slice(2))
    .join(",");

const parseBeaconInput = (
  input: string[]
): {
  signalMap: Record<string, number>;
  beacons: string[];
} => {
  const beacons: string[] = [];
  const signalMap: Record<string, number> = {};
  input.forEach((line) => {
    const [signalPos, beaconPos] = line
      .split(": ")
      .map((section) => getNumbers(section.split(" at ")[1]));
    beacons.push(beaconPos);
    signalMap[signalPos] = findManhattanDistance(signalPos, beaconPos);
  });

  return {
    signalMap,
    beacons,
  };
};

const findCoveredRangeForLineNum = (input: string[], lineNum: number) => {
  const { signalMap, beacons } = parseBeaconInput(input);
  const beaconsOnLine = beacons
    .filter((beaconPos) => getNumericXY(beaconPos)[1] === lineNum)
    .map((beaconPos) => [
      getNumericXY(beaconPos)[0],
      getNumericXY(beaconPos)[0],
    ]);
  let ranges = [
    ...Object.keys(signalMap)
      .map((signalPos) =>
        findOverlapOnYVal(signalPos, lineNum, signalMap[signalPos])
      ),
    ...beaconsOnLine,
  ].filter(range => range.length > 0).sort((a, b) => a[0] - b[0]);

  let combined = false;
  while (!combined) {
    const before = ranges.length;
    let newArray: number[][] = [];
    while (ranges.length > 0) {
      const a = ranges.shift();
      const b = ranges.shift();

      if (!b) {
        newArray.push(a as number[]);
      } else {
        const combination = combineRanges(a as number[], b as number[]);
        newArray = newArray.concat(combination);
      }
    }
    ranges = newArray;
    if (ranges.length === before) combined = true;
  }

  return ranges;
};

const findNumImpossiblePositionsForLine = (
  input: string[],
  lineNum: number
): number => {
  const [range] = findCoveredRangeForLineNum(input, lineNum);
  return Math.abs(range[0] - range[1]);
};

// console.log(findNumImpossiblePositionsForLine(beaconInput, 2000000));

// PART TWO

const findTuningFrequency = (input: string[]) => {
  let i = 1000000;
  let foundLine = 0;
  let range = findCoveredRangeForLineNum(input, i).map((range) => [
    range[0] < 0 ? 0 : range[0],
    range[1] > 4000000 ? 4000000 : range[1],
  ]);

  while (i < 3000000) {
    if (range.length > 1) {
      foundLine = i;
      i = 4000001;
    } else {
      i++;
      range = findCoveredRangeForLineNum(input, i);
    }
  }

  console.log(range, foundLine);
};

// findTuningFrequency(beaconInput);

console.log(4000000 * 2638485 + 2650264);