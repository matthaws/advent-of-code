const inputParser = require("../inputParser.js");
const subDirections = inputParser("day-2.txt", "string");

// PART ONE
const directionDiff = {
  forward: [1, 0],
  up: [0, -1],
  down: [0, 1],
};

const calculateFinalPosition = () =>
  subDirections.reduce(
    ([horz, depth], command) => {
      const [direction, amount] = command.split(" ");
      const [horzDiff, depthDiff] = directionDiff[direction].map(
        (diff) => diff * Number(amount)
      );

      return [horz + horzDiff, depth + depthDiff];
    },
    [0, 0]
  );

// PART TWO
const calculateFinalPositionWithAim = () =>
  subDirections.reduce(
    ({ aim, horz, depth }, command) => {
      const [direction, amount] = command.split(" ");
      const numericAmount = Number(amount);
      switch (direction) {
        case "up": {
          return { aim: aim - numericAmount, horz, depth };
        }
        case "down": {
          return { aim: aim + numericAmount, horz, depth };
        }
        case "forward": {
          return {
            aim,
            horz: horz + numericAmount,
            depth: depth + aim * numericAmount,
          };
        }
      }
    },
    { aim: 0, horz: 0, depth: 0 }
  );
