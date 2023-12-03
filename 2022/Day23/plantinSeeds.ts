const inputParser = require("../inputParser.ts");
const elfLocationInput = inputParser("day-23.txt", "string");

const sample = [
  ".......#......",
  ".....###.#....",
  "...#...#.#....",
  "....#...##....",
  "...#.###......",
  "...##.#.##....",
  "....#..#......",
];

const parseElfLocationInput = (input: string[]) => {
  const elves: Set<string> = new Set();
  input.forEach((line, yIdx) => {
    line.split("").forEach((char, xIdx) => {
      if (char === "#") elves.add(`${xIdx + 1}:${yIdx + 1}`);
    });
  });

  return elves;
};

const findEmptySpacesInElfRectangle = (elves: Set<string>) => {
  const numericElves = Array.from(elves).map((elf) =>
    elf.split(":").map(Number)
  );
  const xArray = numericElves.map((elf) => elf[0]);
  const yArray = numericElves.map((elf) => elf[1]);
  const minX = Math.min(...xArray);
  const maxX = Math.max(...xArray);
  const minY = Math.min(...yArray);
  const maxY = Math.max(...yArray);
  const xSpan = maxX - minX + 1;
  const ySpan = maxY - minY + 1;
  const totalSpaces = xSpan * ySpan;
  console.log(xSpan, ySpan, totalSpaces)
  return totalSpaces - numericElves.length;
};

const diffs = {
  N: [0, -1],
  NE: [1, -1],
  NW: [-1, -1],
  S: [0, 1],
  SE: [1, 1],
  SW: [-1, 1],
  W: [-1, 0],
  E: [1, 0],
};

const applyDiff = (elf: string, diff: number[]) =>
  elf
    .split(":")
    .map((char, idx) => Number(char) + diff[idx])
    .join(":");

const getProposedSteps = (elves: Set<string>, directionOrder: string[][]) =>
  Array.from(elves).reduce((elfMoves, elf) => {
    const positions: Record<string, string> = Object.fromEntries(
      Object.entries(diffs).map(([dir, diff]) => [dir, applyDiff(elf, diff)])
    );

    if (Object.values(positions).every((pos) => !elves.has(pos))) {
    //   console.log(elf, "has no neighbors");
      return {
        ...elfMoves,
        [elf]: elf,
      };
    }

    let i = 0;
    while (i < directionOrder.length) {
      const directions = directionOrder[i];
      if (directions.every((dir) => !elves.has(positions[dir]))) {
        // console.log(elf, "has no neighbors in positions", directions);
        return {
          ...elfMoves,
          [elf]: positions[directions[0]],
        };
      }
      i++;
    }
    // console.log("no move for", elf);
    return { ...elfMoves, [elf]: elf };
  }, {});

const eliminateElfCrashing = (proposedSteps: Record<string, string>) => {
  const targetPositions = Object.values(proposedSteps);

  targetPositions.forEach((pos) => {
    const allTarget = Object.entries(proposedSteps).filter(
      ([_, targetPos]) => targetPos === pos
    );
    if (allTarget.length > 1) {
      allTarget.forEach(([origin, _]) => {
        proposedSteps[origin] = origin;
      });
    }
  });
};


const findFirstRoundNoMove = (elfInput: string[]) => {
  let elfSet = parseElfLocationInput(elfInput);

  const directionOrder = [
    ["N", "NE", "NW"],
    ["S", "SE", "SW"],
    ["W", "NW", "SW"],
    ["E", "NE", "SE"],
  ];
  let noElfsMoved = false
  let rounds = 0;
  while (!noElfsMoved) {
    console.log(rounds + 1)
    const proposedSteps = getProposedSteps(elfSet, directionOrder);

    eliminateElfCrashing(proposedSteps);
    // console.log(proposedSteps);
    const newProposed: string[] = Object.values(proposedSteps);

    if(newProposed.length === elfSet.size && newProposed.every(pos => elfSet.has(pos))) {
        noElfsMoved = true;
    }
   
    elfSet = new Set(newProposed);
    directionOrder.push(directionOrder.shift() as string[]);
    rounds++;
  }


  return rounds;
};

console.log(findFirstRoundNoMove(elfLocationInput));
