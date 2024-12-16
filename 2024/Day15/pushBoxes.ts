const inputParser = require("../../inputParser.ts");
const inputLines: string[] = inputParser("day-15.txt", "spaces");

const parseGridInput = (input: string[]) => {
  const grid: Record<string, string> = {};
  input.forEach((line, y) =>
    line.split("").forEach((char, x) => (grid[`${x}:${y}`] = char))
  );

  return grid;
};
const parseMoveInput = (input: string[]) => {
  const moves: [number, number][] = [];
  const dirs: Record<string, [number, number]> = {
    "<": [-1, 0],
    ">": [1, 0],
    "^": [0, -1],
    v: [0, 1],
  };

  input.forEach((line) =>
    line.split("").forEach((char) => {
      console.log(char, dirs[char]);
      moves.push(dirs[char]);
    })
  );

  return moves;
};

const mid = inputLines.indexOf("");
const grid = parseGridInput(inputLines.slice(0, mid));

const pushInDir = (pos: string, dir: [number, number]) => {
  const newPos = pos
    .split(":")
    .map((num, i) => Number(num) + dir[i])
    .join(":");

  const charAtNewPos = grid[newPos];
  if (charAtNewPos === "#") {
    return false;
  } else if (charAtNewPos === ".") {
    grid[newPos] = "O";
    return true;
  } else if (charAtNewPos === "O") {
    const canKeepPushing = pushInDir(newPos, dir);
    if (canKeepPushing) {
      grid[newPos] = "O";
      return true;
    } else {
      return false;
    }
  }
};

const calculateScore = () =>
  Object.keys(grid).reduce((sum, key) => {
    const [x, y] = key.split(":").map(Number);
    const score = grid[key] === "O" ? 100 * y + x : 0;
    return sum + score;
  }, 0);

const moveRobot = () => {
  const moves = parseMoveInput(inputLines.slice(mid + 1));
  let robotPos = Object.keys(grid).find((key) => grid[key] === "@") as string;
  while (moves.length) {
    const currentMove = moves.shift() as [number, number];
    const newPos = robotPos
      .split(":")
      .map((num, i) => Number(num) + currentMove[i])
      .join(":");

    const charAtNewPos = grid[newPos];

    if (charAtNewPos === ".") {
      grid[robotPos] = ".";
      robotPos = newPos;
      grid[newPos] = "@";
    } else if (charAtNewPos === "O") {
      const canPush = pushInDir(newPos, currentMove);
      if (canPush) {
        grid[robotPos] = ".";
        robotPos = newPos;
        grid[newPos] = "@";
      }
    }
  }
  return calculateScore();
};

console.log(moveRobot());
// console.log(grid);
