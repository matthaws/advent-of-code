const inputParser = require("../../inputParser.ts");
const inputLines = inputParser("day-11.txt", "text");

const sample = ["125", "17"];

const blink = (line: string[]) => {
  const newLine: string[] = [];
  line.forEach((stone) => {
    if (stone === "0") {
      newLine.push("1");
    } else if (stone.length % 2 === 0) {
      const mid = stone.length / 2;
      const left = stone.slice(0, mid);
      const right = stone.slice(mid);
      newLine.push(Number(left).toString());
      newLine.push(Number(right).toString());
    } else {
      const newVal = Number(stone) * 2024;
      newLine.push(newVal.toString());
    }
  });

  return newLine;
};

const blinkNTimes = (line: string[], times: number) => {
  let output = line;
  for (let i = 0; i < times; i++) {
    console.log(i);
    output = blink(output);
  }

  return output;
};

const memo: Record<string, number> = {};

const recursiveBlink = (stone: string, step: number): number => {
  if (step === 75) {
    return 1;
  }

  if (stone === "0") {
    if (memo[`1:${step + 1}`]) return memo[`1:${step + 1}`];
    const calculate = recursiveBlink("1", step + 1);
    memo[`1:${step + 1}`] = calculate;
    return calculate;
  } else if (stone.length % 2 === 0) {
    const mid = stone.length / 2;
    const left = stone.slice(0, mid);
    const right = stone.slice(mid);
    const leftVal =
      memo[`${left}:${step + 1}`] ||
      recursiveBlink(Number(left).toString(), step + 1);
    const rightVal =
      memo[`${right}:${step + 1}`] ||
      recursiveBlink(Number(right).toString(), step + 1);

    memo[`${left}:${step + 1}`] = leftVal;
    memo[`${right}:${step + 1}`] = rightVal;

    return leftVal + rightVal;
  } else {
    const newStone = Number(stone) * 2024;
    const solution =
      memo[`${stone}: +${step + 1}`] ||
      recursiveBlink(newStone.toString(), step + 1);

    memo[`${stone}: +${step + 1}`] = solution;
    return solution;
  }
};

const recursiveSolution = (input: string[]) => {
  let sum = 0;
  input.forEach((stone) => {
    sum += recursiveBlink(stone, 0);
  });

  return sum;
};
// console.log(recursiveSolution(sample));
console.log(recursiveSolution(inputLines[0].split(" ")));
