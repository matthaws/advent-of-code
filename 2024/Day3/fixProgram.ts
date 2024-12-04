const inputParser = require("../../inputParser.ts");
const inputLines = inputParser("day-3.txt", "text");

const sample =
  "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))";

const regex = /mul\([0-9]{1,3},[0-9]{1,3}\)/g;

const findValidPrompts = (line: string) => line.match(regex);

const executePrompt = (prompt: string) => {
  const sections = prompt.split(",");
  const val1 = sections[0].slice(4);
  const val2 = sections[1].split(")")[0];
  return Number(val1) * Number(val2);
};

const sumValidPrompts = (line: string): number => {
  const matches = findValidPrompts(line);
  return matches?.reduce((sum, match) => sum + executePrompt(match), 0) || 0;
};

const addAllLines = () =>
  (inputLines as string[]).reduce(
    (sum, line) => sum + sumValidPrompts(line),
    0
  );

type Match = {};

const findPromptsWithIndices = (line: string) => line.matchAll(regex);
const findDoPrompts = (line: string) => line.matchAll(/do\(\)/g);
const findDontPrompts = (line: string) => line.matchAll(/don't\(\)/g);

const getOrderedInstructions = (line: string) => {
  const mulPrompts = findPromptsWithIndices(line);
  const doPrompts = findDoPrompts(line);
  const dontPrompts = findDontPrompts(line);

  return [...mulPrompts, ...doPrompts, ...dontPrompts].sort(
    (promptA, promptB) => (promptA.index || 0) - (promptB.index || 0)
  );
};

const followOrderedInstructions = (instructions: RegExpMatchArray[]) => {
  let enabled = true;
  let sum = 0;
  instructions.forEach((instruction) => {
    if (instruction[0] === "do()") {
      enabled = true;
    } else if (instruction[0] === "don't()") {
      enabled = false;
    } else {
      if (enabled) sum += executePrompt(instruction[0]);
    }
  });

  return sum;
};

const sumWithOperators = () => {
  const fullString = (inputLines as string[]).reduce(
    (full, part) => full + part,
    ""
  );
  const orderedInstructions = getOrderedInstructions(fullString);
  return followOrderedInstructions(orderedInstructions)

};

console.log(sumWithOperators());
