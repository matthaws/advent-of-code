const parseDay18Input = require('../../inputParser.ts');
const stringValues = parseDay18Input('day-18-sample.txt', 'string');
const day18Helpers = require('./helpers.ts');

const reduceSnailfishNumber = (snailfishNumber: string): string => {
  let reduced = snailfishNumber;
  let bracketQueue = [];
  let index = -1;
  while (index < reduced.length) {
    index++;

    if (reduced[index] === '[') {
      bracketQueue.push(index);
    }

    if (reduced[index] === ']') {
      const startIdx = bracketQueue.pop();
      if (bracketQueue.length + 1 > 4) {
        reduced = day18Helpers.explode(reduced, startIdx, index);
        bracketQueue = [];
        index = -1;
        //   console.log('exploding', reduced, index);
      }
    }

    if (!isNaN(Number(reduced[index])) && !isNaN(Number(reduced[index + 1]))) {
      bracketQueue = [];
      reduced = day18Helpers.split(reduced, index);
      //   console.log('splitting!', reduced, index);
      index = -1;
    }
    // console.log({index, reduced})
  }
  return reduced;
};

const sumSnailFishNumbers = (input: string[]): string => {
  let sum: string = input[0];
  for (let i = 1; i < input.length; i++) {
    sum = reduceSnailfishNumber(`[${sum},${input[i]}]`);
    console.log({ sum });
  }

  return sum;
};

const doSnailHomework = (input: string[]): number => {
  const sum = sumSnailFishNumbers(input);
  return day18Helpers.getMagnitude(sum);
};

console.log(sumSnailFishNumbers(stringValues));
