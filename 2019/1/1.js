const input = require("./input");

const memo = {};

function findMass(num) {
  const answer = Math.floor(num / 3) - 2;
  if (answer < 0) return 0;
  const subMass = memo[answer] || findMass(answer);
  memo[answer] = subMass;
  return answer + subMass;
}

console.log(input.reduce((sum, num) => sum + findMass(num), 0));
