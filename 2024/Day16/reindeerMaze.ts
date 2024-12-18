import { get } from "https";
import {
  NINETY_DEGREES_CLOCKWISE,
  NINETY_DEGREES_COUNTERCLOCKWISE,
  ORTHAGONAL_DIFFS_MAP,
  OrthagonalDirs,
} from "../../constants";
import { start } from "repl";
const inputParser = require("../../inputParser.ts");
const inputLines: string[] = inputParser("day-16.txt", "text");
// const { sampleMazeOne } = require("../inputs/day-16-samples");

type Grid = Record<string, string>;

const parseMaze = (input: string[]) => {
  const grid: Grid = {};
  input.forEach((line, i) => {
    line.split("").forEach((char, j) => (grid[`${i}:${j}`] = char));
  });

  return grid;
};

const getNextPos = (
  grid: Grid,
  pos: [number, number],
  dir: OrthagonalDirs
): string | undefined => {
  const nextInDir = pos.map(
    (coord, i) => coord + ORTHAGONAL_DIFFS_MAP[dir][i]
  ) as [number, number];

  return grid[nextInDir.join(":")] !== "#" ? nextInDir.join(":") : undefined;
};

type QueueEntry = {
  coord: string;
  distance: number;
  dir: OrthagonalDirs;
  path: string[];
};

const getNeighbors = (queueEntry: QueueEntry, grid: Grid): QueueEntry[] => {
  const { coord, distance, dir } = queueEntry;
  const numberPos = coord.split(":").map(Number) as [number, number];
  const leftDir = NINETY_DEGREES_COUNTERCLOCKWISE[dir];
  const rightDir = NINETY_DEGREES_CLOCKWISE[dir];
  const forwardCoord = getNextPos(grid, numberPos, dir);
  const forwardPos = {
    coord: forwardCoord,
    distance: distance + 1,
    dir,
    path: queueEntry.path.concat(forwardCoord ? [forwardCoord] : []),
  };
  const leftCoord = getNextPos(grid, numberPos, leftDir);
  const leftPos = {
    coord: leftCoord,
    distance: distance + 1001,
    dir: leftDir,
    path: queueEntry.path.concat(leftCoord ? [leftCoord] : []),
  };
  const rightCoord = getNextPos(grid, numberPos, rightDir);
  const rightPos = {
    coord: rightCoord,
    distance: distance + 1001,
    dir: rightDir,
    path: queueEntry.path.concat(rightCoord ? [rightCoord] : []),
  };
  return [forwardPos, leftPos, rightPos].filter((entry) =>
    Boolean(entry.coord)
  ) as QueueEntry[];
};

const findBestRoute = (input: string[]) => {
  const grid = parseMaze(input);
  let startNode = "";
  const visited: Set<string> = new Set();
  let queue: QueueEntry[] = [];

  const paths: QueueEntry[] = [];

  const distances = Object.fromEntries(
    Object.keys(grid).map((key) => {
      if (grid[key] === "S") {
        startNode = key;
        return [key, 0];
      } else {
        return [key, Infinity];
      }
    })
  );

  queue.push({ coord: startNode, distance: 0, dir: "e", path: [startNode] });

  while (queue.length) {
    const currentNode = queue.shift() as QueueEntry;
    visited.add(`${currentNode.coord};${currentNode.dir}`);

    const neighbors = getNeighbors(currentNode, grid).filter(
      (entry) => !visited.has(`${entry.coord};${entry.dir}`)
    );

    queue = queue
      .concat(neighbors)
      .sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);

    if (grid[currentNode.coord] === "E") paths.push(currentNode);
    console.log(queue.length);
  }

  const bestScore = Math.min(...paths.map((path) => path.distance));
  const bestPaths = paths.filter((path) => path.distance === bestScore);
  const greatSitSpots: Set<string> = new Set();
  bestPaths.forEach((goodPath) => {
    goodPath.path.forEach((coord) => greatSitSpots.add(coord));
  });

  return greatSitSpots.size;
};

console.log(findBestRoute(inputLines));
// console.log(memo);
