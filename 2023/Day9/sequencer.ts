const inputParser = require("../../inputParser.ts");
const inputLines = inputParser("day-9.txt", "number-array");

const findNextSequence = (sequence: number[]) => {
  const diffs = [];
  for (let i = 0; i < sequence.length - 1; i++) {
    diffs.push(sequence[i + 1] - sequence[i]);
  }

  return diffs;
};

const findAllZeros = (sequence: number[]) => {
  const steps = [sequence];
  let currentStep = [...sequence];
  while (currentStep.some((val) => val !== 0)) {
    currentStep = findNextSequence(currentStep);
    steps.push(currentStep);
  }

  return steps;
};

const findNextValue = (sequence: number[]) => {
  const steps = findAllZeros(sequence);

  return steps.reverse().reduce((sum, step) => sum + step[step.length - 1], 0);
};

const findPreviousValue = (sequence: number[]) => {
  const steps = findAllZeros(sequence)
  console.log(steps)
  return steps.reverse().reduce((sum, step) => step[0] - sum, 0)
};

const sumExtrapolatedValues = (lines: number[][]) =>
  lines.reduce((sum, line) => sum + findNextValue(line), 0);

const sumExtrapolatedPreviousValues = (lines: number[][]) =>
  lines.reduce((sum, line) => sum + findPreviousValue(line), 0);

console.log(sumExtrapolatedPreviousValues(inputLines));
