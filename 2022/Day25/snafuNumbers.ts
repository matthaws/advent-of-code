const inputParser = require("../inputParser.ts");
const snafuInput = inputParser("day-25.txt", "string");

const convertToSnafuDigit = (num: number): string =>
  num < 0 ? (num === -1 ? "-" : "=") : num.toString();

const getNumericValue = (digit: string): number =>
  isNaN(Number(digit)) ? (digit === "=" ? -2 : -1) : Number(digit);

const addSnafuDigits = (snafuA: string, snafuB: string) => {
  const snafuAInOrder = snafuA.split("").reverse();
  const snafuBInOrder = snafuB.split("").reverse();
  let remainder = 0;
  const maxdigits = Math.max(snafuAInOrder.length, snafuBInOrder.length);
  const sumArray: string[] = [];
  let i = 0;
  while (sumArray.length < maxdigits) {
    const a = getNumericValue(snafuAInOrder[i] || "0");
    const b = getNumericValue(snafuBInOrder[i] || "0");
    const sum = a + b + remainder;
    remainder = 0;

    if (sum <= 2 && sum >= -2) {
      sumArray.push(convertToSnafuDigit(sum));
    }

    if (sum < -2) {
      remainder = -1;
      const adjustedSum = sum + 5;
      sumArray.push(convertToSnafuDigit(adjustedSum));
    }

    if (sum > 2) {
      remainder = 1;
      const adjustedSum = sum - 5;
      sumArray.push(convertToSnafuDigit(adjustedSum));
    }
    i++;
  }
  if (remainder !== 0) sumArray.push(convertToSnafuDigit(remainder));

  return sumArray.reverse().join("");
};

const sumAllSnafus = (input: string[]) => {
  const startingVal = input[0];
  return input.slice(1).reduce((sum, num) => {
    console.log(sum, num)
    return addSnafuDigits(sum, num);
  }, startingVal);
};

console.log(sumAllSnafus(snafuInput));

const snafuToDec = (snafu: string): number => {
  const snafuOrder: string[] = snafu.split("").reverse();
  let num: number = 0;
  for (let i = 0; i < snafuOrder.length; i++) {
    const digitSize = i === 0 ? 1 : 5 ** i;
    const converted = isNaN(Number(snafuOrder[i]))
      ? snafuOrder[i] === "-"
        ? -1
        : -2
      : Number(snafuOrder[i]);
    console.log(digitSize, converted);
    num += digitSize * converted;
  }

  return num;
};
