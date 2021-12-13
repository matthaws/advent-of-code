const fs = require('fs');
const text = fs.readFileSync('./input.txt', 'utf-8');
const inputLines = text.split('\n');

const dirSymbols = {
  row: ['F', 'B'],
  col: ['L', 'R'],
};

const parseVal = (rowPath, min, max, dir) => {
  const [minSymb, maxSymb] = dirSymbols[dir];
  if (rowPath.length === 1) {
    if (rowPath === minSymb) return min;
    if (rowPath === maxSymb) return max;
  }
  const mid = Math.floor((max - min) / 2) + min;

  const path = rowPath[0];
  if (path === minSymb) {
    return parseVal(rowPath.slice(1), min, mid, dir);
  }
  if (path === maxSymb) {
    return parseVal(rowPath.slice(1), mid + 1, max, dir);
  }
};

const findSeatId = code => {
  const rowPath = code.slice(0, 7);
  const colPath = code.slice(7);

  const row = parseVal(rowPath, 0, 127, 'row');
  const val = parseVal(colPath, 0, 7, 'col');

  return row * 8 + val;
};

const findMissingSeatId = () => {
  const allIds = new Set(inputLines.map(findSeatId));

  const missingIds = [];
  for (let i = 0; i < 1024; i++) {
    if (!allIds.has(i)) {
      missingIds.push(i);
    }
  }

  return missingIds.filter(id => allIds.has(id + 1) && allIds.has(id - 1));
};

console.log(findMissingSeatId());
