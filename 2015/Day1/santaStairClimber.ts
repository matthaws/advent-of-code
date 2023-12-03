const inputParser = require("../inputParser.ts");
const stairInput = inputParser("day-1.txt", "text");

const parseStairs = (stairs: string[]) =>
  stairs.reduce((floor, char) => (char === "(" ? floor + 1 : floor - 1), 0);

const findBasementPos = (stairs: string[]) => {
  let i = 0;
  let floor = 0;
  while (i < stairs.length) {
    if (stairs[i] === "(") floor++;
    if (stairs[i] === ")") floor--;
    if (floor === -1) break;
    i++;
  }
  return i + 1;
};

console.log(findBasementPos(stairInput[0].split("")));
