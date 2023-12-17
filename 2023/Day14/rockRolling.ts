const inputParser = require("../../inputParser.ts");
const inputLines = inputParser("day-14.txt", "text");

const findStopPoints = (line: string[]): number[] =>
  line.reduce(
    (all, char, idx) => (char === "#" ? [...all, idx] : all),
    [] as number[]
  );

const rollRocks = (line: string[]) => {
  const stopPoints = findStopPoints(line);
  if (stopPoints[0] !== 0) stopPoints.unshift(0);

  const newLine = stopPoints
    .map((point, idx) => {
      const endPoint = stopPoints[idx + 1];
      const sectionLength = (endPoint || line.length) - point;
      const section = endPoint
        ? line.slice(point, endPoint)
        : line.slice(point);

      const numRocks = section.filter((char) => char === "O").length;
      return `#${"O".repeat(numRocks)}${".".repeat(
        sectionLength - numRocks - (idx === 0 && section[idx] !== "#" ? 0 : 1)
      )}`;
    })
    .join("");

  return line[0] === "#" ? newLine : newLine.slice(1);
};

const sumRocks = (line: string, logSums?: boolean) =>
  line.split("").reduce((sum, char, idx) => {
    if (char === "O" && logSums) console.log(line.length, idx);
    return char === "O" ? sum + (line.length - idx) : sum;
  }, 0);

const rollAndSumAllRocksNorth = (lines: string[]) => {
  const columns: Record<string, string[]> = {};
  lines.forEach((line) => {
    for (let i = 0; i < line.length; i++) {
      if (!columns[i]) columns[i] = [];
      columns[i].push(line[i]);
    }
  });

  return Object.values(columns).reduce((sum, line, idx) => {
    return sum + sumRocks(rollRocks(line));
  }, 0);
};

const sample = [
  "O....#....",
  "O.OO#....#",
  ".....##...",
  "OO.#O....O",
  ".O.....O#.",
  "O.#..O.#.#",
  "..O..#O..O",
  ".......O..",
  "#....###..",
  "#OO..#....",
];

const rollNorth = (lines: string[]) => {
  const northToSouthRows: string[][] = [];

  for (let i = 0; i < lines.length; i++) {
    northToSouthRows.push(lines.map((line) => line[i]));
  }

  const rolledNorthToSouthRows = northToSouthRows.map((row) => rollRocks(row));
  const restoredOrder: string[] = [];

  for (let i = 0; i < rolledNorthToSouthRows[0].length; i++) {
    restoredOrder.push(rolledNorthToSouthRows.map((row) => row[i]).join(""));
  }

  return restoredOrder;
};

const rollSouth = (lines: string[]) => {
  const northToSouthRows: string[][] = [];

  for (let i = 0; i < lines.length; i++) {
    northToSouthRows.push(lines.map((line) => line[i]));
  }

  const southToNorthRows = northToSouthRows.map((line) => line.reverse());
  const rolledSouthToNorthRows = southToNorthRows.map((line) =>
    rollRocks(line)
  );
  const restoredOrder: string[] = [];

  for (let i = 0; i < rolledSouthToNorthRows[0].length; i++) {
    restoredOrder.push(
      rolledSouthToNorthRows.map((row) => row.split("").reverse()[i]).join("")
    );
  }
  return restoredOrder;
};

const rollWest = (lines: string[]) =>
  lines.map((line) => rollRocks(line.split("")));
const rollEast = (lines: string[]) =>
  lines.map((line) =>
    rollRocks(line.split("").reverse()).split("").reverse().join("")
  );

const runCycle = (lines: string[]) => {
  return rollEast(rollSouth(rollWest(rollNorth(lines))));
};

const solvePartTwo = (lines: string[]) => {
  let rolledLines = lines;
  const visited: Record<string, string> = {};
  const scores: Record<string, number> = {}
//   const numTimes = (1000000000 - 110) ;
  for (let i = 0; i < 165; i++) {
    console.log(i);
    rolledLines = runCycle(rolledLines);
    const seenBefore = Object.entries(visited).find(
      ([idx, state]) => state === rolledLines.join("\n")
    );
    if (seenBefore) {
      console.log(`Repeated state (${seenBefore[0]}) after cycle ${i}`);
      if (seenBefore[0] === "0") {
        console.log("BEGINNING FOUND at", i);
        return 0
      }
    } else {
      visited[i] = rolledLines.join("\n");
      scores[i] = sumAllRocks(rolledLines)
    }
  }
  const num = (1000000000 - 110) % 27
  console.log(scores[num + 83])
  return sumAllRocks(rolledLines);
};

const sumAllRocks = (lines: string[]) => {
  const columns: Record<string, string[]> = {};
  lines.forEach((line) => {
    for (let i = 0; i < line.length; i++) {
      if (!columns[i]) columns[i] = [];
      columns[i].push(line[i]);
    }
  });

  return Object.values(columns).reduce((sum, line, idx) => {
    return sum + sumRocks(line.join(""));
  }, 0);
};

// console.log(1000000000 / 110, 1000000000 % 110);
console.log(solvePartTwo(inputLines));
