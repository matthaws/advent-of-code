const inputParser = require("../../inputParser.ts");
const inputLines = inputParser("day-23.txt", "text");

const sample = [
  "#.#####################",
  "#.......#########...###",
  "#######.#########.#.###",
  "###.....#.>.>.###.#.###",
  "###v#####.#v#.###.#.###",
  "###.>...#.#.#.....#...#",
  "###v###.#.#.#########.#",
  "###...#.#.#.......#...#",
  "#####.#.#.#######.#.###",
  "#.....#.#.#.......#...#",
  "#.#####.#.#.#########v#",
  "#.#...#...#...###...>.#",
  "#.#.#v#######v###.###v#",
  "#...#.>.#...>.>.#.###.#",
  "#####v#.#.###v#.#.###.#",
  "#.....#...#...#.#.#...#",
  "#.#########.###.#.#.###",
  "#...###...#...#...#.###",
  "###.###.#.###v#####v###",
  "#...#...#.#.>.>.#.>.###",
  "#.###.###.#.###.#.#v###",
  "#.....###...###...#...#",
  "#####################.#",
];

const SLOPES: Record<string, [number, number]> = {
  ">": [0, 1],
  "<": [0, -1],
  "^": [-1, 0],
  v: [1, 0],
};

const DELTAS: [number, number][] = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

const hike = (
  [row, column]: [number, number],
  seenLocations: string[],
  grid: string[]
): string[][] => {
  if (row === grid.length - 1) {
    console.log("found the end!");
    return [seenLocations];
  }
  // let deltas: [number, number][] = [];
  // if (Object.keys(SLOPES).includes(grid[row][column])) {
  //   deltas.push(SLOPES[grid[row][column]]);
  // } else {
  //   deltas = [...DELTAS];
  // }
  const possibleDirections = DELTAS
    .map(([deltaRow, deltaColumn]) => {
      const newPos: [number, number] = [row + deltaRow, column + deltaColumn];
      return newPos;
    })
    .filter(
      (newPos) =>
        !seenLocations.includes(newPos.join(",")) &&
        grid[newPos[0]]?.[newPos[1]] &&
        grid[newPos[0]][newPos[1]] !== "#"
    );
  const newSeenLocations = [...seenLocations, `${row},${column}`];
  return possibleDirections.reduce((allPaths, dir) => {
    const paths = hike(dir, newSeenLocations, grid);
    return allPaths.concat(paths);
  }, [] as string[][]);
};

console.log(Math.max(...hike([0, 1], [], inputLines).map((path) => path.length)));
