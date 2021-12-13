const inputParser = require("../../inputParser.js");
const startingFishInput = inputParser("day-6.txt", "string");
const sampleInput = "3,4,3,1,2";

const parseInput = (input) => input.split(",").map(Number);

const schoolModel = [...Array(9).keys()].reduce(
  (model, num) => ({ ...model, [num]: 0 }),
  {}
);

const buildFishSchool = (input) => {
  const startingFish = parseInput(input);
  return startingFish.reduce(
    (school, fish) => ({ ...school, [fish]: school[fish] + 1 }),
    schoolModel
  );
};

const simulateDay = (fishSchool) =>
  [...Array(9).keys()].reduce((newSchool, num) => {
    if (num === 0) {
      const zeroFishes = fishSchool[num];
      return { ...newSchool, 6: zeroFishes, 8: zeroFishes };
    }

    return {
      ...newSchool,
      [num - 1]: newSchool[num - 1] + fishSchool[num],
    };
  }, schoolModel);

const findNumFishAfterNDays = (input, numDays) => {
  let school = buildFishSchool(input);
  for (i = 0; i < numDays; i++) {
    school = simulateDay(school);
  }

  return Object.values(school).reduce((sum, num) => sum + num, 0);
};

console.log(findNumFishAfterNDays(startingFishInput[0], 256))