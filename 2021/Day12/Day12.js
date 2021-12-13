const inputParser = require("../../inputParser.js");
const tunnelConnections = inputParser("day-12.txt", "string");

class Cave {
  constructor(val, size) {
    this.val = val;
    this.size = val.toLocaleLowerCase() === val ? "small" : "big";
    this.connectedCaves = [];
  }

  addConnectedCave(cave) {
    this.connectedCaves.push(cave);
  }
}

const buildCaveNetwork = (input) => {
  const startingCave = new Cave("start");
  const caves = [startingCave];
  input.forEach((line) => {
    let caveA, caveB;
    const [caveAVal, caveBVal] = line.split("-");

    caveA = caves.find((cave) => cave.val === caveAVal);
    if (!caveA) {
      caveA = new Cave(caveAVal);
      caves.push(caveA);
    }

    caveB = caves.find((cave) => cave.val === caveBVal);
    if (!caveB) {
      caveB = new Cave(caveBVal);
      caves.push(caveB);
    }

    caveA.addConnectedCave(caveB);
    caveB.addConnectedCave(caveA);
  });
  return startingCave;
};

const findPaths = (startingCave, visitedSmallCaves = []) => {
  if (startingCave.val === "end") return "end";

  const haveWeVisitedASmallCaveTwice = visitedSmallCaves.some(
    (val, idx) => visitedSmallCaves.indexOf(val) !== idx
  );

  if (
    haveWeVisitedASmallCaveTwice &&
    visitedSmallCaves.includes(startingCave.val)
  )
    return "";

  const possibleExits = startingCave.connectedCaves.filter((cave) => {
    if (cave.size === "big") return true;
    if (cave.val === "start") return false;

    if (haveWeVisitedASmallCaveTwice) {
      return !visitedSmallCaves.includes(cave.val);
    }
    return true;
  });

  if (possibleExits.length === 0) return startingCave.val;

  const paths = possibleExits
    .map((exit) =>
      findPaths(exit, [
        ...visitedSmallCaves,
        ...(startingCave.size === "small" ? [startingCave.val] : []),
      ])
    )
    .flat();
  const filteredPaths = paths
    .map((path) => `${startingCave.val},${path}`)
    .filter((path, idx, arr) => arr.indexOf(path) === idx);

  console.log(filteredPaths.length);
  return filteredPaths;
};

const findNumPathsToExit = (input) => {
  const startingCave = buildCaveNetwork(input);
  const paths = findPaths(startingCave).filter((path) => path.includes("end"));

  return paths.length;
};

console.log(findNumPathsToExit(tunnelConnections));
