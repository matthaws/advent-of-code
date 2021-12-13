const fs = require('fs');
const text = fs.readFileSync('./input.txt', 'utf-8');
const inputLines = text.split('\n').filter(Boolean).map(Number);

const findJoltDiffs = () => {
  const max = Math.max(...inputLines);
  const adapterSet = new Set([...inputLines, max + 3]);
  let oneDiffs = 0;
  let threeDiffs = 0;
  let jolt = 0;

  while (jolt <= max) {
    for (let i = 1; i < 4; i++) {
      if (adapterSet.has(jolt + i)) {
        jolt = jolt + i;
        if (i === 1) oneDiffs++;
        if (i === 3) threeDiffs++;
        break;
      }
    }
  }
  return oneDiffs * threeDiffs;
};

const memo = {};
const max = Math.max(...inputLines);
const adapterSet = new Set([...inputLines, max]);

const findAdapterArrangements = val => {
  console.log(memo);
  if (memo[val]) return memo[val];
  const results = [1, 2, 3]
    .map(diff => {
      if (adapterSet.has(val + diff)) {
        return findAdapterArrangements(val + diff);
      }
    })
    .filter(Boolean);
  const numArragements = results.reduce((accum, result) => accum + result, 0);
  memo[val] = numArragements + 1;
  return numArragements;
};

console.log(findAdapterArrangements(0));
