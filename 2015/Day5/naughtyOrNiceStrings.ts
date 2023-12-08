const inputParse = require("../../inputParser.ts");
const inputLines = inputParse("day-5.txt", "text");

const naughtySubs = ["ab", "cd", "pq", "xy"];
const vowels = ["a", "e", "i", "o", "u"];

const hasDoubleLetter = (string: string) =>
  string.split("").some((char, i) => char === string[i + 1]);

const isStringNice = (string: string) => {
  if (naughtySubs.some((sub) => string.includes(sub))) return false;
  if (!hasDoubleLetter(string)) return false;
  if (string.split("").filter((letter) => vowels.includes(letter)).length < 3)
    return false;
  return true;
};

const findTotalNiceStrings = (lines: string[]) =>
  lines.filter((line) => isStringNice(line)).length;

console.log("ONE", findTotalNiceStrings(inputLines));

// PART TWO
const doesSubstringRepeat = (x: number, y: number, string: string) => {
  const sub = `${string[x]}${string[y]}`;
  return (string.slice(0, x) + string.slice(y + 1)).includes(sub);
};

const isStringNiceTwo = (string: string) => {
  if (!string.split("").some((char, i) => char === string[i + 2])) {
    console.log(
      string,
      "is naughty because no same letter with 1 char between them"
    );
    return false;
  }
  if (
    !string.split("").some((char, i) => doesSubstringRepeat(i, i + 1, string))
  ) {
    console.log(string, "is naughty because no repeating pair");
    return false;
  }
  return true;
};

const findTotalNiceStringsTwo = (lines: string[]) =>
  lines.filter((line) => isStringNiceTwo(line)).length;

console.log("TWO", findTotalNiceStringsTwo(inputLines));
