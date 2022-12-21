const inputParser = require("../inputParser.ts");
const codeInput = inputParser("day-20.txt", "number");

const sample = [1, 2, -3, 3, -2, 0, 4];

interface MixNumber {
  val: number;
  originalPos: number;
}
const parseCodeInput = (input: number[]) =>
  input.map((num, idx) => ({ val: num, originalPos: idx + 1 }));

const mixANumber = (number: MixNumber, numbers: MixNumber[]) => {
  const currentPos = numbers.indexOf(number) + 1;
  let newPos = currentPos + number.val;

  if (newPos > numbers.length) {
    newPos = (newPos % numbers.length) + 1;
  }
  while (newPos <= 0) {
    newPos = numbers.length + newPos - 1;
  }
  const newArrayWithoutOriginal = numbers.filter(
    (num) => num.originalPos !== number.originalPos
  );
console.log(number, currentPos, newPos)
  return [
    ...newArrayWithoutOriginal.slice(0, newPos - 1),
    number,
    ...newArrayWithoutOriginal.slice(newPos - 1),
  ];
};

const getGroveCoordinates = (mixedNumbers: MixNumber[]) => {
  const numberDiffs = [1000, 2000, 3000];

  return numberDiffs
    .map((diff) => {
      const zeroNum = mixedNumbers.find((num) => num.val === 0);
      const zeroIdx = mixedNumbers.indexOf(zeroNum as MixNumber);
      let newIdx = zeroIdx + diff;
      if (newIdx >= mixedNumbers.length) {
        newIdx = newIdx % mixedNumbers.length;
      }
      console.log(zeroIdx,diff,newIdx,mixedNumbers[newIdx])
      return mixedNumbers[newIdx]?.val;
    })
    .reduce((sum, num) => sum + num, 0);
};

const mixAllNumbers = (input: number[]) => {
  const parsedCodeInput = parseCodeInput(input);
  const mixed = parsedCodeInput.reduce(
    (currentMix, num) => {
        // console.log(currentMix)
      return mixANumber(num, currentMix);
    },
    [...parsedCodeInput]
  );
console.log(mixed)
  return getGroveCoordinates(mixed);
};

console.log(mixAllNumbers(codeInput));
