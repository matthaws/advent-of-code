const inputParser = require("../../inputParser.ts");
const inputLines = inputParser("day-2.txt", "text");

const parseInput = (): number[][] => {
  return (inputLines as string[]).map((line) => line.split(" ").map(Number));
};

const isAscending = (line: number[]) =>
  line.every((val, idx) => {
    if (idx === 0) return true;
    return val > line[idx - 1];
  });

const isDescending = (line: number[]) =>
  line.every((val, idx) => {
    if (idx === 0) return true;
    return val < line[idx - 1];
  });

const isGradual = (line: number[]) => {
  let gradual = true;
  line.forEach((val, idx) => {
    if (idx !== 0) {
      const diff = Math.abs(val - line[idx - 1]);
      if (diff < 1 || diff > 3) gradual = false;
    }
  });

  return gradual;
};

const isLineSafe = (line: number[]) =>
  isGradual(line) && (isAscending(line) || isDescending(line));

const isLineSafeWithOneMissing = (line: number[]) => {
  let i = 0;
  while (i < line.length) {
    const newLine = line.slice(0, i).concat(line.slice(i + 1));

    if (isLineSafe(newLine)) return true;
    i++;
  }
  return false;
};

const countSafeReports = (allLines: number[][]) =>
  allLines.reduce((sum, line) => sum + (isLineSafe(line) ? 1 : 0), 0);

const countSafeReportsWithOneMissing = (allLines: number[][]) =>
  allLines.reduce((sum, line, idx) => {
    console.log("checking line", idx, "of", allLines.length);
    return sum + (isLineSafeWithOneMissing(line) ? 1 : 0);
  }, 0);

console.log(countSafeReportsWithOneMissing(parseInput()));
