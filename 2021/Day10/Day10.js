const inputParser = require("../inputParser.ts");;
const inputLines = inputParser("day-10.txt", "string");

const charMap = {
  "{": "}",
  "[": "]",
  "(": ")",
  "<": ">",
};

const score = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
};

const incompleteScore = {
  ")": 1,
  "]": 2,
  "}": 3,
  ">": 4,
};

const findSyntaxError = (line) => {
  const stack = [];
  const chars = line.split("");
  for (let i = 0; i < chars.length; i++) {
    if (Object.keys(charMap).includes(chars[i])) {
      stack.push(chars[i]);
    } else {
      const opener = stack.pop();
      if (chars[i] !== charMap[opener]) return chars[i];
    }
  }
};

const completeLine = (line) => {
  const stack = [];
  const chars = line.split("");
  for (let i = 0; i < chars.length; i++) {
    if (Object.keys(charMap).includes(chars[i])) {
      stack.push(chars[i]);
    } else {
      stack.pop();
    }
  }
  return stack.reverse().map((opener) => charMap[opener]);
};

const findSyntaxScore = (lines) =>
  lines.reduce((sum, line) => {
    const error = findSyntaxError(line);
    return error ? sum + score[error] : sum;
  }, 0);

const calculateIncompleteScore = (additionalChars) =>
  additionalChars
    .map((char) => incompleteScore[char])
    .reduce((total, score) => total * 5 + score, 0);

const findMiddleIncompleteScore = (lines) => {
  const incompleteScores = lines
    .filter((line) => !findSyntaxError(line))
    .map(completeLine)
    .map(calculateIncompleteScore)
    .sort((valA, valB) => valA - valB);

  const middle = Math.floor(incompleteScores.length / 2);
  return incompleteScores[middle];
};

console.log(findMiddleIncompleteScore(inputLines));
