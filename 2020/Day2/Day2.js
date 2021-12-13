const fs = require('fs');
const text = fs.readFileSync('./input.txt', 'utf-8');
const inputLines = text.split('\n');

const validatePassword = line => {
  const [range, target, password] = line.split(' ');
  const rangeNums = range.split('-');
  const targetLetter = target[0];
  const match = rangeNums.map(num => {
    if (password[Number(num) - 1] === targetLetter) return true;
    return false;
  });

  if (match.filter(Boolean).length === 1) return 1;
  return 0;
};

const getNumValidPasswords = () =>
  inputLines.reduce((count, line) => count + validatePassword(line), 0);

console.log(getNumValidPasswords());
// console.log(validatePassword('1-3 a: abcde'));
