const inputParser = require("../../inputParser.ts");
const inputLines = inputParser("day-8.txt", "text");

const parseNode = (line: string) => {
  const [node, paths] = line.split(" = ");
  const formattedPaths = paths
    .split(", ")
    .map((path) => path.replace("(", "").replace(")", ""));

  return { [node]: formattedPaths };
};

const makeNodeMap = (nodeLines: string[]) =>
  nodeLines.reduce(
    (map, line) => ({ ...map, ...parseNode(line) }),
    {} as Record<string, string[]>
  );

const followMap = (directions: string, nodes: Record<string, string[]>) => {
  let currentNode = "AAA";
  let step = 0;
  let i = 0;

  while (currentNode !== "ZZZ") {
    const dir = directions[i];
    const nextNodeIdx = dir === "L" ? 0 : 1;
    const nextNode = nodes[currentNode][nextNodeIdx];
    currentNode = nextNode;
    step++;
    i++;

    if (i === directions.length) i = 0;
  }

  return step;
};

const findZIndex = (
  directions: string,
  nodes: Record<string, string[]>,
  startingNode: string
) => {
  let currentNode = startingNode;

  let i = 0;

  while (!currentNode.endsWith("Z")) {
    const dir = directions[i > directions.length ? i % directions.length : i];
    const nextNodeIdx = dir === "L" ? 0 : 1;
    const nextNode = nodes[currentNode][nextNodeIdx];
    currentNode = nextNode;
    i++;
  }

  return i;
};

const followGhostMap = (
  directions: string,
  nodes: Record<string, string[]>
) => {
  const startingNodes = Object.keys(nodes).filter((node) => node.endsWith("A"));
  const zIndices = startingNodes.map((node) =>
    findZIndex(directions, nodes, node)
  );

  return zIndices.map(idx => idx / directions.length).reduce((product, prime) => product * prime, 1) * directions.length
    
};

const sample = "LR";

const sampleNodes = [
  "11A = (11B, XXX)",
  "11B = (XXX, 11Z)",
  "11Z = (11B, XXX)",
  "22A = (22B, XXX)",
  "22B = (22C, 22C)",
  "22C = (22Z, 22Z)",
  "22Z = (22B, 22B)",
  "XXX = (XXX, XXX)",
];

// console.log(followGhostMap(sample, makeNodeMap(sampleNodes)))

console.log(followGhostMap(inputLines[0], makeNodeMap(inputLines.slice(1))));
