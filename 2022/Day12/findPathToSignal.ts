import path from "path";

const inputParser = require("../inputParser.ts");
const landElevationInput = inputParser("day-12.txt", "text");

// console.log(landElevationInput)
const findPos = (input: string[], char: string): number[] => {
  let pos;
  input.forEach((line, lineIdx) => {
    const colIdx = line.split("").indexOf(char);
    if (colIdx > -1) pos = [lineIdx, colIdx];
  });

  return pos as unknown as number[];
};

const DELTAS = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

const findNextNodes = (
  input: string[],
  node: number[],
  currentHeight: string
): number[][] =>
  DELTAS.map(([xDiff, yDiff]) =>
    currentHeight <=
    String.fromCharCode(
      getElevation(input[xDiff + node[0]]?.[yDiff + node[1]])?.charCodeAt(0) + 1
    )
      ? [xDiff + node[0], yDiff + node[1]]
      : []
  ).filter((node) => node.length > 0);

// Move to a node that we haven’t visited, choosing the fastest node to
// get to first.
// At that node, check how long it will take us to get to each of its
// neighboring nodes. Add the neighbor’s weight to the time it took to
// get to the node we’re currently on. Keep in mind that we’re calculating
// the time to reach those nodes before we visit them.
// Check whether that calculated time is faster than the previously known
// shortest time to get to that node. If it is faster, update our records
// to reflect the new shortest time. We’ll also add this node to our line
// of nodes to visit next. That line will be arranged in order of shortest
// calculated time to reach.

const getElevation = (char: string): string => {
  if (char === "S") return "a";
  if (char === "E") return "z";
  return char;
};

const findShortestPathFromPoint = (input: string[], startPos: number[]) => {
  let nodesToVisit: number[][] = [startPos];
  const visited = new Set();
  const distances = {
    [startPos.join(",")]: 0,
  };
  while (nodesToVisit.length > 0) {
    const node = nodesToVisit.pop() as number[];
    const currentDistance = distances[node.join(",")];
    visited.add(node.join(","));
    const nextToVisit = findNextNodes(
      input,
      node,
      getElevation(input[node[0]][node[1]])
    )
      .filter((newNode) => !visited.has(newNode))
      .filter(
        (newNode) =>
          !distances[newNode.join(",")] ||
          distances[newNode.join(",")] > currentDistance + 1
      );

    nextToVisit.forEach(
      (newNode) => (distances[newNode.join(",")] = currentDistance + 1)
    );
    nodesToVisit = [...nodesToVisit, ...nextToVisit];
  }
  return distances;
};

const findShortestStartPoint = (input: string[]): number => {
  let shortest = 0;
  const distances = findShortestPathFromPoint(input, findPos(input, "E"));

  input.forEach((line, lineIdx) => {
    line.split("").forEach((char, colIdx) => {
      if (char === "S" || char === "a") {
        const path = distances[`${lineIdx},${colIdx}`];
        if (!shortest || path < shortest) shortest = path;
      }
    });
  });
  return shortest;
};

console.log(findShortestStartPoint(landElevationInput));
