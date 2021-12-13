const fs = require('fs');
const text = fs.readFileSync('./input.txt', 'utf-8');
const inputLines = text.split('\n').filter(Boolean);

const parseLine = line => {
  const [command, adjustment] = line.split(' ');
  if (command === 'acc') return { index: 1, accumulator: Number(adjustment) };
  if (command === 'nop') return { index: 1, accumulator: 0 };
  if (command === 'jmp') return { index: Number(adjustment), accumulator: 0 };
  console.log('invalid command!');
};

const parseInstructions = lines => {
  let accum = 0;
  let index = 0;
  const visitedIndices = new Set();

  while (index !== lines.length) {
    if (visitedIndices.has(index)) return 'infinite loop';
    visitedIndices.add(index);
    const parsedInstructions = parseLine(lines[index]);
    accum = accum + parsedInstructions.accumulator;
    index = index + parsedInstructions.index;
  }

  return accum;
};

const test = (targetCommand, replacementCommand, i) =>
  parseInstructions([
    ...inputLines.slice(0, i),
    inputLines[i].replace(targetCommand, replacementCommand),
    ...inputLines.slice(i + 1),
  ]);

const changeOneLine = () => {
  for (let i = 0; i < inputLines.length; i++) {
    if (inputLines[i].startsWith('nop')) {
      const testResult = test('nop', 'jmp', i);
      if (testResult !== 'infinite loop') return testResult;
    }
    if (inputLines[i].startsWith('jmp')) {
      const testResult = test('jmp', 'nop', i);
      if (testResult !== 'infinite loop') return testResult;
    }
  }
};

console.log(changeOneLine());
