const inputParser = require("../inputParser.ts");
const inputLines = inputParser("day-1.txt", "text");

const textDigits: Record<string, string> = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

const parseLine = (line: string) => {
  const digits: string[] = [];
  line.split("").forEach((char, i) => {
    if (!isNaN(Number(char))) {
      digits.push(char);
    } else {
      const sectionToConsider = line.slice(i);
      const textDigitMatch = Object.keys(textDigits).find((digit) =>
        sectionToConsider.startsWith(digit)
      );
      if (textDigitMatch) digits.push(textDigits[textDigitMatch]);
    }
  });
  return Number(`${digits[0]}${digits[digits.length - 1]}`);
};

const parseAllLines = (lines: string[]) =>
  lines.reduce((sum, line) => {
    const lineTotal = parseLine(line);
    return sum + lineTotal;
  }, 0);

console.log(parseAllLines(inputLines));
