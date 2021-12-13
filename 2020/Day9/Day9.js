const fs = require('fs');
const text = fs.readFileSync('./input.txt', 'utf-8');
const inputLines = text.split('\n').filter(Boolean).map(Number);

const isSumOfPreceedingNums = (index, numProceeding) => {
  const num = inputLines[index];
  const range = new Set(inputLines.slice(index - numProceeding, index));
  let answer = false;
  range.forEach(value => {
    const target = num - value;
    if (range.has(target) && target !== value) {
      answer = true;
    }
  });

  return answer;
};

const findFirst = () => {
  for (let i = 25; i < inputLines.length; i++) {
    const test = isSumOfPreceedingNums(i, 25);
    if (!test) return inputLines[i];
  }
};

const getAnswer = range => {
  const sortedRange = range.sort();
  return sortedRange[0] + sortedRange[sortedRange.length - 1];
};

const findContinguousSum = () => {
  const target = findFirst();
  for (let i = 0; i < inputLines.length; i++) {
    let rangeIndex = i + 1;
    let sum = inputLines[i] + inputLines[rangeIndex];
    while (sum < target && rangeIndex < inputLines.length) {
      rangeIndex++;
      sum = inputLines.slice(i, rangeIndex + 1).reduce((newSum, val) => newSum + val, 0);
    }
    if (sum === target) return getAnswer(inputLines.slice(i, rangeIndex + 1));
  }
};

console.log(findContinguousSum());
