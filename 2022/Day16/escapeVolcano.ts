const inputParser = require("../inputParser.ts");
const valveInput = inputParser("day-16-sample.txt", "text");

interface Valve {
  name: string;
  open: boolean;
  flow: number;
  connections: string[];
}

const parseValveInput = (input: string[]) => {
  const valves: Record<string, Valve> = input.reduce((allValves, line) => {
    const splitVal = line.includes("tunnels")
      ? "; tunnels lead to valves "
      : "; tunnel leads to valve ";
    const [valveInfo, connectionInfo] = line.split(splitVal);
    const [valveName, flowInfo] = valveInfo.split(" has flow rate=");
    const name = valveName.split(" ")[1];
    const flow = Number(flowInfo);
    const connections = connectionInfo.split(", ");
    return {
      ...allValves,
      [name]: {
        name,
        open: false,
        flow,
        connections,
      },
    };
  }, {});

  return valves;
};

const findDistanceToNode = (
  nodeA: Valve,
  nodeB: Valve,
  allValves: Record<string, Valve>,
  visitedNodes: string[]
): number => {
  if (nodeA.connections.includes(nodeB.name)) {
    return 1;
  }
  const paths: number[] = nodeA.connections
    .filter((node) => allValves[node].open && !visitedNodes.includes(node))
    .map((node) => {
      return findDistanceToNode(allValves[node], nodeB, allValves, [
        ...visitedNodes,
        node,
      ]);
    })
    .filter((distance) => distance > 0)
    .map((distance) => distance + 1);

  if (paths.length === 0) return -1;

  return Math.min(...paths);
};

const findMostPressureToRelease = (input: string[]) => {
  const nodes: Record<string, Valve> = parseValveInput(input);
  let unopenedNodes: string[] = Object.keys(nodes).filter(
    (node) => node !== "AA"
  );
  let currentNode = "AA";
  nodes[currentNode].open = true;
  let time = 30;
  let releasedPressure = 0;

  while (Object.keys(nodes).filter((node) => !nodes[node].open).length > 1) {
    const potentialPressure = Object.keys(nodes)
      .filter((node) => !nodes[node].open)
      .reduce((paths, unopenedNode) => {
        const distance = findDistanceToNode(
          nodes[currentNode],
          nodes[unopenedNode],
          nodes,
          []
        );
        // console.log("checking distances between", currentNode, unopenedNode, "=", distance);

        const theoreticalRemainingTime = time - distance - 1;
        const theoreticalPressure =
          nodes[unopenedNode].flow * theoreticalRemainingTime;
        return [
          ...paths,
          ...(distance > 0 && theoreticalRemainingTime > 0
            ? [
                [
                  unopenedNode,
                  theoreticalPressure,
                  theoreticalRemainingTime,
                ] as [string, number, number],
              ]
            : []),
        ];
      }, [] as [string, number, number][]);
    const bestPath = potentialPressure.sort(
      (pathA, pathB) => pathB[1] - pathA[1]
    )[0];
    if (bestPath) {
      currentNode = bestPath[0];
      time = bestPath[2];
      releasedPressure += bestPath[1];
      nodes[bestPath[0]].open = true;
      unopenedNodes = unopenedNodes.filter((node) => node !== bestPath[0]);
      console.log("moving to node", bestPath[0], potentialPressure);
    }
  }
  console.log(releasedPressure);
};

console.log(findMostPressureToRelease(valveInput));
