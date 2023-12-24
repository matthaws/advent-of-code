const inputParser = require("../../inputParser.ts");
const inputLines = inputParser("day-22.txt", "text");

const sample = [
  "1,0,1~1,2,1",
  "0,0,2~2,0,2",
  "0,2,3~2,2,3",
  "0,0,4~0,2,4",
  "2,0,5~2,2,5",
  "0,1,6~2,1,6",
  "1,1,8~1,1,9",
];

const parseBlocks = (input: string[]): Block[] =>
  input
    .map((line) => {
      return line.split("~").map((val) => {
        const [x, y, z] = val.split(",").map(Number);

        return { x, y, z };
      });
    })
    .map((block) => {
      const { x, y, z } = block[0];
      const dir = x !== block[1].x ? "x" : y !== block[1].y ? "y" : "z";
      return [...block, dir] as Block;
    });
type Axis = "x" | "y" | "z";
type Coord = { x: number; y: number; z: number };
type Block = [Coord, Coord, Axis];
type FullBlock = Coord[];

const getAllCoords = (block: Block): Coord[] => {
  const dir = block[2];
  const sameVals = ["x" as const, "y" as const, "z" as const].filter(
    (val) => val !== dir
  );
  const range = block
    .slice(0, 2)
    .map((coord) => (coord as Coord)[dir])
    .sort();
  const allCoords: Coord[] = [];
  for (let i = range[0]; i <= range[1]; i++) {
    allCoords.push({
      [sameVals[0]]: block[0][sameVals[0]],
      [sameVals[1]]: block[0][sameVals[1]],
      [dir]: i,
    } as Coord);
  }

  return allCoords;
};

const moveBlockDown = (block: FullBlock, allBlocks: FullBlock[]) => {
  const newPos = block.map(({ x, y, z }) => ({ x, y, z: z - 1 }));
  //   console.log(newPos)
  if (newPos.some((coord) => coord.z < 1)) {
    // console.log("block cant move down to", newPos, "as its on the ground");
    return null;
  }

  const blockAlreadyFilled = newPos.find((pos) =>
    allBlocks.find((existingBlock) =>
      existingBlock.find(
        (exisitingPos) =>
          exisitingPos.x === pos.x &&
          exisitingPos.y === pos.y &&
          exisitingPos.z === pos.z
      )
    )
  );

  if (blockAlreadyFilled) {
    // console.log(
    //   "cannot move down because another brick is blocking",
    //   blockAlreadyFilled
    // );
    return null;
  }

  //   console.log("block falling to", newPos);
  return newPos;
};

const moveBlockDownAsFar = (block: FullBlock, allBlocks: FullBlock[]) => {
  let stillFalling = true;
  let pos = moveBlockDown(block, allBlocks);
  if (!pos || !pos.length) return null;

  while (stillFalling) {
    console.log('moving', pos, 'down')
    const newPos = moveBlockDown(pos, allBlocks);
    if (newPos) {
      pos = newPos;
    } else {
      stillFalling = false;
    }
  }
  return pos
};

const initialFall = (blocks: FullBlock[]) => {
  let noneFell = false;
  let newBlocks = [...blocks];

  while (!noneFell) {
    noneFell = true;
    console.log("beginning new fall");
    newBlocks = newBlocks.map((block, i) => {
      const fall = moveBlockDownAsFar(
        block,
        newBlocks.slice(0, i).concat(newBlocks.slice(i + 1))
      );
      if (fall) {
        noneFell = false;

        return fall;
      } else {
        return block;
      }
    });
  }

  return newBlocks;
};

const canRemoveBlock = (allBlocks: FullBlock[]) => {
  if (
    allBlocks.every((block, idx) => {
      const result = moveBlockDown(
        block,
        allBlocks.slice(0, idx).concat(allBlocks.slice(idx + 1))
      );

      return !result;
    })
  )
    return true;

  return false;
};

const partOne = (input: string[]) => {
  const allBlocks = parseBlocks(input).map(getAllCoords);
  const initialState = initialFall(allBlocks);
  console.log(allBlocks, initialState);
  //   console.log("starting check");
  //   console.log(canRemoveBlock(initialState.slice(0, 5).concat([initialState[6]])));
  return initialState.filter((block, i) => {
    console.log("checking", i, "of", initialState.length);
    return canRemoveBlock(
      initialState.slice(0, i).concat(initialState.slice(i + 1))
    );
  }).length;
};

// console.log(canRemoveBlock())

console.log(partOne(inputLines));
// console.log(inputLines[inputLines.length - 1])
