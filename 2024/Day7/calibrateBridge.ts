const inputParser = require("../../inputParser.ts");
const inputLines = inputParser("day-7.txt", "text");

type Equation = [number, number[]];

const parseLine = (line: string): Equation => {
  const [sum, valueString] = line.split(": ");
  const values = valueString.split(" ").map(Number);

  return [Number(sum), values];
};

const addOrMultiplyOrConcat = (
  target: number,
  sum: number,
  remainingValues: number[]
): boolean => {
  const multiply = sum * remainingValues[0];
  const add = sum + remainingValues[0];
  const concat = Number(`${sum}${remainingValues[0]}`);
  if (
    [multiply, add, concat].includes(target) &&
    remainingValues.slice(1).length === 0
  )
    return true;

  if ([multiply, add, concat].every((val) => val > target)) return false;
  if (remainingValues.slice(1).length === 0) return false;

  const testWithProduct = addOrMultiplyOrConcat(
    target,
    multiply,
    remainingValues.slice(1)
  );
  if (testWithProduct) return true;

  const testWithAdd = addOrMultiplyOrConcat(
    target,
    add,
    remainingValues.slice(1)
  );

  if (testWithAdd) return true;

  return addOrMultiplyOrConcat(target, concat, remainingValues.slice(1));
};

const sumPossiblyTrueEquations = () => {
  const equations = (inputLines as string[]).map(parseLine);
  return equations.reduce((sum, equation) => {
    const [target, values] = equation;
    const result = addOrMultiplyOrConcat(target, values[0], values.slice(1));
    return sum + (result ? target : 0);
  }, 0);
};

console.log(sumPossiblyTrueEquations());
