const inputParser = require("../inputParser.ts");;
const diagnosticReport = inputParser("day-3.txt", "string");
const testInput = [
  "00100",
  "11110",
  "10110",
  "10111",
  "10101",
  "01111",
  "00111",
  "11100",
  "10000",
  "11001",
  "00010",
  "01010",
];
const startingCount = [0, 0];

const adjustCount = ([zeroCount, oneCount], digit) =>
  digit === "0" ? [zeroCount + 1, oneCount] : [zeroCount, oneCount + 1];

const countDigits = (input) =>
  input.reduce(
    (count, line) =>
      line
        .split("")
        .filter(Boolean)
        .map((digit, idx) => adjustCount(count[idx] || startingCount, digit)),
    []
  );

// PART ONE
const getGammaAndEpsilon = (input) => {
  const numberCount = countDigits(input);
  const epsilonBinary = numberCount.map(([zeroCount, oneCount]) =>
    console.log(zeroCount, oneCount) || zeroCount > oneCount ? "0" : "1"
  );
  const gammaBinary = epsilonBinary.map((digit) => (digit === "0" ? "1" : "0"));

  const epsilon = parseInt(epsilonBinary.join(""), 2);
  const gamma = parseInt(gammaBinary.join(""), 2);

  return [epsilonBinary, gammaBinary, epsilon * gamma];
};

// PART TWO

const countAtDigitIndex = (input, idx) =>
  input.reduce(
    ([zeroCount, oneCount], number) =>
      number[idx] === "0"
        ? [zeroCount + 1, oneCount]
        : [zeroCount, oneCount + 1],
    startingCount
  );

const findNumberByBitCriteria = (type, input) => {
  let numbers = input;

  for (i = 0; i < input[0].length; i++) {
    const [zeroCount, oneCount] = countAtDigitIndex(numbers, i);
    const bitCriteria =
      zeroCount > oneCount
        ? type === "oxygen"
          ? "0"
          : "1"
        : type === "oxygen"
        ? "1"
        : "0";
    console.log(numbers, bitCriteria, zeroCount, oneCount);
    numbers = numbers.filter((number) => number[i] === bitCriteria);
    if (numbers.length === 1) return numbers[0];
  }
};

const getOxygenAndCO2 = (input) => {
  const oxygenBinary = findNumberByBitCriteria("oxygen", input);
  const co2Binary = findNumberByBitCriteria("co2", input);
  const oxygen = parseInt(oxygenBinary, 2);
  const co2 = parseInt(co2Binary, 2);
  return [oxygenBinary, co2Binary, oxygen * co2];
};

console.log(getOxygenAndCO2(diagnosticReport));
