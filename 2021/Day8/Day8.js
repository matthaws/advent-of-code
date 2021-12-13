const inputParser = require("../inputParser.ts");;
const problemInput = inputParser("day-8.txt", "string");

const easySegments = {
  1: ["c", "f"],
  4: ["b", "c", "d", "f"],
  7: ["a", "c", "f"],
  8: ["a", "b", "c", "d", "e", "f", "g"],
};

const complexSegments = {
  0: ["a", "b", "c", "e", "f", "g"], // d
  2: ["a", "c", "d", "e", "g"], // b, f
  3: ["a", "c", "d", "f", "g"], // b, e
  5: ["a", "b", "d", "f", "g"], // c, e
  6: ["a", "b", "d", "e", "f", "g"], // c
  9: ["a", "b", "c", "d", "f", "g"], // e
};

const parseLine = (line) => {
  const [inputs, outputs] = line.split(" | ");
  return [inputs.split(" "), outputs.split(" ")];
};

const standardize = (chars) => chars.split("").sort().join("");

const findEasyDigits = (inputsAndOutputs) =>
  inputsAndOutputs.reduce((foundNums, signal) => {
    const easyNumSpotted = Object.entries(easySegments).find(
      (easySegment) => easySegment[1].length === signal.length
    );
    if (easyNumSpotted && !foundNums[easyNumSpotted[0]]) {
      return {
        ...foundNums,
        [easyNumSpotted[0]]: standardize(signal),
      };
    }
    return foundNums;
  }, {});

const findComplexDigits = (inputsAndOutputs, easyDigits) => {
  const complexDigits = {};
  // find 0, 6 and 9
  inputsAndOutputs
    .filter((signal) => signal.length === 6)
    .forEach((signal) => {
      const oddOneOut = easyDigits[8]
        .split("")
        .filter((char) => !signal.includes(char))[0];

      if (easyDigits[1].includes(oddOneOut)) {
        complexDigits[6] = standardize(signal);
        return;
      }
      if (easyDigits[4].includes(oddOneOut)) {
        complexDigits[0] = standardize(signal);
        return;
      }

      complexDigits[9] = standardize(signal);
    });

  // find 2, 3, 5
  inputsAndOutputs
    .filter((signal) => signal.length === 5)
    .forEach((signal) => {
      const oddOnesOut = easyDigits[8]
        .split("")
        .filter((char) => !signal.includes(char));

      if (oddOnesOut.every((char) => !easyDigits[1].includes(char))) {
        complexDigits[3] = standardize(signal);
        return;
      }

      if (oddOnesOut.every((char) => easyDigits[4].includes(char))) {
        complexDigits[2] = standardize(signal);
        return;
      }

      complexDigits[5] = standardize(signal);
    });

  return complexDigits;
};

const buildDictionary = (digits) =>
  Object.fromEntries(
    Object.entries(digits).map(([num, signal]) => [signal, num.toString()])
  );

const decodeLine = (line) => {
  const [inputs, outputs] = parseLine(line);
  const easyDigits = findEasyDigits(inputs.concat(outputs));
  const complexDigits = findComplexDigits(inputs.concat(outputs), easyDigits);
  const dictionary = {
    ...buildDictionary(easyDigits),
    ...buildDictionary(complexDigits),
  };

  const decodedNumber = outputs
    .map((output) => dictionary[standardize(output)])
    .join("");

  return parseInt(decodedNumber);
};

const sumLines = (input) =>
  input.reduce((sum, line) => sum + decodeLine(line), 0);

console.log(sumLines(problemInput));
