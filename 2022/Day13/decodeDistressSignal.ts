const inputParser = require("../inputParser.ts");
const distressSignalInput = inputParser("day-13.txt", "text");

type Signal = (Signal | number)[];

function parseSignalInput(input: string[]): Signal[] {
  return input.map((line) => JSON.parse(line));
}

function compare(firstSignal: Signal, secondSignal: Signal): boolean | string {
  const types = [typeof firstSignal, typeof secondSignal];

  if (types.every((signalType) => signalType === "number")) {
    if (firstSignal === secondSignal) return "none";
    return firstSignal < secondSignal;
  }

  if (types.every((signalType) => signalType === "object")) {
    const first = [...firstSignal];
    const second = [...secondSignal];

    while (first.length > 0 && second.length > 0) {
      const firstToCompare = first.shift();
      const secondToCompare = second.shift();
      const result = compare(
        firstToCompare as Signal,
        secondToCompare as Signal
      );

      if (result !== "none") return result;
    }

    if (first.length > 0 && second.length === 0) return false;
    if (first.length === 0 && second.length > 0) return true;
    return "none";
  }

  const first = types[0] === "number" ? [firstSignal] : firstSignal;
  const second = types[1] === "number" ? [secondSignal] : secondSignal;

  return compare(first, second);
}

function findSumOfCorrectPairs(input: string[]): number {
  const parsedInput = parseSignalInput(input);
  const correctIndices: number[] = [];
  let i = 0;
  let index = 1;
  while (i < parsedInput.length) {
    const first = parsedInput[i];
    const second = parsedInput[i + 1];

    if (compare(first, second) === true) correctIndices.push(index);
    i += 2;
    index++;
  }

  return correctIndices.reduce((sum, num) => sum + num, 0);
}

function sortAndFindDecoderKey(input: string[]): number {
  const parsedAndSortedInput = [...parseSignalInput(input), [[2]], [[6]]].sort(
    (signalA: Signal, signalB: Signal) => (compare(signalA, signalB) ? -1 : 1)
  );

  const indices = parsedAndSortedInput.map((line, idx) => {
    const lineString = JSON.stringify(line);

    return lineString === "[[2]]" || lineString === "[[6]]" ? idx + 1 : 1;
  });

  return indices.reduce((product, num) => product * num, 1);
}

console.log(sortAndFindDecoderKey(distressSignalInput));
