const inputParser = require("../../inputParser.ts");
const inputLines = inputParser("day-5.txt", "spaces");

type Rules = Record<number, number[]>;

const parseInput = () => {
  const rules: Rules = {};
  const updates: number[][] = [];
  let parsingRules: boolean = true;
  (inputLines as string[]).forEach((line) => {
    if (line === "") {
      parsingRules = false;
    } else if (parsingRules) {
      const [firstNum, secondNum] = line.split("|").map(Number);
      rules[firstNum]
        ? rules[firstNum].push(secondNum)
        : (rules[firstNum] = [secondNum]);
    } else {
      updates.push(line.split(",").map(Number));
    }
  });

  return { rules, updates };
};

const updateSatisfiesRuleset = (
  testNum: number,
  ruleSet: number[],
  update: number[]
) =>
  ruleSet.every(
    (higherNum) =>
      !update.includes(higherNum) ||
      update.indexOf(higherNum) > update.indexOf(testNum)
  );

const checkIfUpdateIsValid = (rules: Rules, update: number[]) => {
  let i = 0;
  while (i < update.length) {
    const testNum = update[i];
    const ruleSet = rules[testNum];
    if (ruleSet && !updateSatisfiesRuleset(testNum, ruleSet, update)) {
      return false;
    }
    i++;
  }
  return true;
};

const countValidUpdates = () => {
  const { rules, updates } = parseInput();
  let sum = 0;
  updates.forEach((update) => {
    if (checkIfUpdateIsValid(rules, update)) {
      const middle = Math.floor(update.length / 2);
      sum += update[middle];
    }
  });

  return sum;
};

const reorderUpdate = (rules: Rules, update: number[]) => {
  const testUpdate = [...update];

  while (!checkIfUpdateIsValid(rules, testUpdate)) {
    const testNum = testUpdate.find(
      (num) =>
        rules[num] && !updateSatisfiesRuleset(num, rules[num], testUpdate)
    );
    const idx = testUpdate.indexOf(testNum as number);
    [testUpdate[idx - 1], testUpdate[idx]] = [
      testUpdate[idx],
      testUpdate[idx - 1],
    ];
  }

  return testUpdate;
};

const sumReorderedUpdates = () => {
     const { rules, updates } = parseInput();
     let sum = 0;
     updates.forEach((update) => {
       if (!checkIfUpdateIsValid(rules, update)) {
        const reordered = reorderUpdate(rules, update)
         const middle = Math.floor(update.length / 2);
         sum += reordered[middle];
       }
     });

     return sum;
}

console.log(sumReorderedUpdates())