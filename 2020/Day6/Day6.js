const fs = require('fs');
const text = fs.readFileSync('./input.txt', 'utf-8');
const inputLines = text.split('\n');

const findNumQuestions = () => {
  let count = 0;
  let groupCount = 0;
  let answers = {};

  inputLines.forEach(line => {
    if (line.length === 0) {
      const numAllAnswered = Object.keys(answers).filter(char => answers[char] === groupCount)
        .length;
      groupCount = 0;
      answers = {};
      count = count + numAllAnswered;
    } else {
      groupCount = groupCount + 1;
      line.split('').forEach(char => {
        answers[char] = answers[char] ? answers[char] + 1 : 1;
      });
    }
  });

  return count;
};

console.log(findNumQuestions());
