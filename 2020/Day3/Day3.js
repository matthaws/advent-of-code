const fs = require('fs');
const text = fs.readFileSync('./input.txt', 'utf-8');
const inputLines = text.split('\n');

const checkSlope = (xPos, yPos, delta) => {
  const [xDelta, yDelta] = delta;
  const line = inputLines[yPos].trim();
  const tree = line[xPos] === '#' ? 1 : 0;
  const newY = yPos + yDelta;
  if (newY >= inputLines.length) return tree;
  const newX = (xPos + xDelta) % inputLines[newY].length;

  return tree + checkSlope(newX, newY, delta);
};

const getAllSlopes = () => {
  const deltas = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
  ];
  const numTrees = deltas.map(delta => checkSlope(0, 0, delta));
  return numTrees.reduce((result, num) => result * num, 1);
};

console.log(getAllSlopes());
