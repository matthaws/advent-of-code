const inputParser = require("../../inputParser.ts");
const inputLines = inputParser("day-10.txt", "text");

const DELTAS = {
  L: [
    [1, 0],
    [0, -1],
  ],
  "7": [
    [-1, 0],
    [0, 1],
  ],
  F: [
    [1, 0],
    [0, 1],
  ],
  J: [
    [0, -1],
    [-1, 0],
  ],
  "|": [
    [0, 1],
    [0, -1],
  ],
  "-": [
    [-1, 0],
    [1, 0],
  ],
  S: [],
};

const convertIndexToLocations = (lines: string[]) =>
  lines.reduce(
    (map, line, y) => ({
      ...map,
      ...line
        .split("")
        .reduce(
          (lineMap, char, x) => ({ ...lineMap, [`${x},${y}`]: char }),
          {}
        ),
    }),
    {}
  );

const findStartingLocation = (locationGrid: Record<string, string>) =>
  Object.entries(locationGrid).find(([loc, char]) => char === "S")?.[0];

const findNextLocation = (  location: string,
  locationGrid: Record<string, keyof typeof DELTAS>,
  visitedLocations: string[]) => {
    
  }

const findEndOfPipe = (
  location: string,
  locationGrid: Record<string, keyof typeof DELTAS>,
  visitedLocations: string[]
): string[] => {
  let currentLocation = location;

  while (locationGrid[currentLocation] !== "S") {
    const char = locationGrid[currentLocation];
    if (char === "S") return visitedLocations;
    visitedLocations.push(currentLocation);

    const diffs = DELTAS[char];
    const [x, y] = currentLocation.split(",").map(Number);
    const possibleNextLocations = diffs.map(([xDiff, yDiff]) =>
      [xDiff + x, yDiff + y].join(",")
    );

    const nextLocation = possibleNextLocations.find(
      (loc) => !visitedLocations.includes(loc)
    );

    if (!nextLocation) return visitedLocations;
    console.log(char, nextLocation, possibleNextLocations)
    currentLocation = nextLocation
  }
  return visitedLocations;
};

const sample = ["..F7.", ".FJ|.", "SJ.L7", "|F--J", "LJ..."];

const partOne = () => {
  const locationGrid = convertIndexToLocations(inputLines);
  const startingLocation = findStartingLocation(locationGrid);
  console.log(startingLocation);
  return findEndOfPipe("15,53", locationGrid, [startingLocation as string]);
};

const result = partOne()
console.log(result, result.length / 2);
