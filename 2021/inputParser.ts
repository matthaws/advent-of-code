const fs = require('fs');

type inputTypes = 'number' | 'spaces' | 'text';

const parseInput = (
  fileName: string,
  type: inputTypes
): string[] | number[] => {
  const text = fs.readFileSync(`2021/inputs/${fileName}`, 'utf-8');
  const inputLines = text.split('\n');
  return type === 'number'
    ? inputLines.filter(Boolean).map(Number)
    : type === 'spaces'
    ? inputLines
    : inputLines.filter(Boolean);
};

module.exports = parseInput;
