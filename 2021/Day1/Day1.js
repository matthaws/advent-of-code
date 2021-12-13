const inputParser = require("../inputParser.js");
const sonarReadings = inputParser("day-1.txt", "number");

// PART ONE
const countNumIncreases = () =>
  sonarReadings.reduce(
    (count, reading, idx) =>
      sonarReadings[idx - 1] && sonarReadings[idx - 1] < reading
        ? count + 1
        : count,
    0
  );

// PART TWO
const windowADiffs = [-1, 0, 1];
const windowBDiffs = [0, 1, 2];

const getSum = (diffs, currentIndex) =>
  diffs
    .map((diff) => diff + currentIndex)
    .map((index) => sonarReadings[index])
    .reduce((sum, reading) => sum + reading, 0);

const countNumWindowIncreases = () =>
  sonarReadings.reduce((count, reading, idx) => {
    if (!sonarReadings[idx - 1] || !sonarReadings[idx + 2]) return count;
    const windowASum = getSum(windowADiffs, idx);
    const windowBSum = getSum(windowBDiffs, idx);
    return windowBSum > windowASum ? count + 1 : count;
  }, 0);
