const inputParser = require("../../inputParser.ts");
const inputLines = inputParser("day-12.txt", "text");

const satisfiesConstraint = (string: string, constraint: number[]) => {
  const groupsOfDamagedSprings = string.split(".").filter(Boolean);

  return (
    JSON.stringify(groupsOfDamagedSprings.map((group) => group.length)) ===
    JSON.stringify(constraint)
  );
};

const insertComboIntoString = (string: string, combo: string) => {
  let i = 0;
  return string
    .split("")
    .map((char) => {
      if (char === "?") {
        const newChar = combo[i];
        i++;
        return newChar;
      }
      return char;
    })
    .join("");
};

const findAllPossibleCombinations = (string: string) => {
  const unknownIndices = string
    .split("")
    .map((char, i) => [char, i])
    .filter(([char, i]) => char === "?")
    .map(([char, i]) => i);

  const combos = unknownIndices.reduce((comboList, idx) => {
    if (comboList.length === 0) return ["#", "."];

    return [
      ...comboList.map((combo) => `${combo}#`),
      ...comboList.map((combo) => `${combo}.`),
    ];
  }, [] as string[]);

  return combos.map((combo) => insertComboIntoString(string, combo));
};

const solvePartOne = (lines: string[]) =>
  lines.reduce((sum, line, idx) => {
    const [string, constraintString] = line.split(" ");
    const constraint = constraintString.split(",").map(Number);
    const allCombos = findAllPossibleCombinations(string);
    console.log("solving line", idx);
    return (
      sum +
      allCombos.reduce(
        (comboSum, combo) =>
          comboSum + (satisfiesConstraint(combo, constraint) ? 1 : 0),
        0
      )
    );
  }, 0);

// console.log(solvePartOne(inputLines))

// PART TWO

const unfoldLine = (line: string): [string, number[]] => {
  const [string, constraintString] = line.split(" ");
  const unfoldedString = [string, string, string, string, string].join("?");
  const unfoldedConstraint = [
    constraintString,
    constraintString,
    constraintString,
    constraintString,
    constraintString,
  ]
    .join(",")
    .split(",")
    .map(Number);

  return [unfoldedString, unfoldedConstraint];
};

const solvePartTwo = (lines: string[]) =>
  lines.reduce((sum, line, idx) => {
    const [string, constraint] = unfoldLine(line);
    console.log('solving line', idx)
    const allCombos = findAllPossibleCombinations(string);
    return (
      sum +
      allCombos.reduce(
        (comboSum, combo) =>
          comboSum + (satisfiesConstraint(combo, constraint) ? 1 : 0),
        0
      )
    );
  }, 0);

  console.log(solvePartTwo(inputLines))