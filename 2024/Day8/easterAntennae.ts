const inputParser = require("../../inputParser.ts");
const inputLines = inputParser("day-8.txt", "text");

const makeAntennaeMap = (input: string[]) => {
  const map: Record<string, [number, number][]> = {};
  input.forEach((line, i) => {
    line.split("").forEach((char, j) => {
      if (char !== ".") {
        if (!map[char]) map[char] = [];
        map[char].push([i, j]);
      }
    });
  });

  return map;
};

const isInBounds = (pos: [number, number]) => {
  if (pos[0] < 0 || pos[1] < 0) return false;
  if (pos[0] >= inputLines.length || pos[1] >= inputLines[0].length)
    return false;
  return true;
};

const findDiff = (
  nodeA: [number, number],
  nodeB: [number, number]
): [number, number] => [nodeA[0] - nodeB[0], nodeA[1] - nodeB[1]];

const determinePossibleNodes = (
  nodeA: [number, number],
  nodeB: [number, number]
) => {
  const diff = findDiff(nodeA, nodeB);
  const possibleOne: [number, number] = [
    nodeA[0] + diff[0],
    nodeA[1] + diff[1],
  ];
  const possibleTwo: [number, number] = [
    nodeB[0] - diff[0],
    nodeB[1] - diff[1],
  ];

  return [possibleOne, possibleTwo];
};

const determineResonateNodes = (
  startingPos: [number, number],
  diff: [number, number]
) => {
  const nodes = new Set();
  let cur: [number, number] = [...startingPos];

  while (isInBounds(cur)) {
    nodes.add(cur.join(":"));
    cur = [cur[0] + diff[0], cur[1] + diff[1]];
  }
  cur = [...startingPos];
  while (isInBounds(cur)) {
    nodes.add(cur.join(":"));
    cur = [cur[0] - diff[0], cur[1] - diff[1]];
  }
  return nodes;
};

const collectUniqueAntinodeLocations = (input: string[]) => {
  const map = makeAntennaeMap(input);
  const allPositions = new Set();
  Object.keys(map).map((key) => {
    const positions = map[key];
    positions.forEach((nodeA, i) => {
      positions.forEach((nodeB, j) => {
        if (i < j) {
          determinePossibleNodes(nodeA, nodeB)
            .filter(isInBounds)
            .forEach((pos) => allPositions.add(pos.join(":")));
        }
      });
    });
  });

  return allPositions;
};

const collectUniqueResonanceLocations = (input: string[]) => {
  const map = makeAntennaeMap(input);
  const allPositions = new Set();

  Object.keys(map).map((key) => {
    const positions = map[key];
    positions.forEach((nodeA, i) => {
      positions.forEach((nodeB, j) => {
        if (i < j) {
          const diff = findDiff(nodeA, nodeB);
          const newNodes = determineResonateNodes(nodeA, diff);

          Array.from(newNodes).forEach((node) => allPositions.add(node));
        }
      });
    });
  });

  return allPositions.size;
};

console.log(collectUniqueResonanceLocations(inputLines));
