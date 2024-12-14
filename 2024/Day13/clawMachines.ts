const inputParser = require("../../inputParser.ts");
const inputLines = inputParser("day-13.txt", "spaces");

type Game = {
  aValues: [number, number];
  bValues: [number, number];
  prizeLocation: [number, number];
};
const parseGame = (
  [buttonAString, buttonBString, prizeLocString]: [string, string, string],
  partTwo?: boolean
): Game => {
  const [aValues, bValues] = [buttonAString, buttonBString].map(
    (buttonString) =>
      buttonString
        .split(": ")[1]
        .split(", ")
        .map((val) => Number(val.split("+")[1]))
  );
  const prizeLocation = prizeLocString
    .split(": ")[1]
    .split(", ")
    .map(
      (coord) => Number(coord.split("=")[1]) * (partTwo ? 10000000000000 : 1)
    );

  return { aValues, bValues, prizeLocation } as Game;
};

const findMinimumPressesByType = (
  buttonVals: [number, number],
  target: [number, number]
) => {
  const min = Math.min(
    ...buttonVals.map((val, idx) => Math.floor(target[idx] / val))
  );
  return min;
};

const validAnswer = (
  { aValues, bValues, prizeLocation }: Game,
  aPresses: number,
  bPresses: number
) => {
  const aCheck = aValues.map((val) => val * aPresses);
  const bCheck = bValues.map((val) => val * bPresses);

  return aCheck.every((val, idx) => val + bCheck[idx] === prizeLocation[idx]);
};

const findLeastAmountOfTokens = ({ aValues, bValues, prizeLocation }: Game) => {
  let bPresses = findMinimumPressesByType(bValues, prizeLocation);
  while (bPresses) {
    const aTarget = bValues.map(
      (val, idx) => prizeLocation[idx] - val * bPresses
    ) as [number, number];
    const aPresses = findMinimumPressesByType(aValues, aTarget);
    if (validAnswer({ aValues, bValues, prizeLocation }, aPresses, bPresses)) {
      const aTokens = aPresses * 3;
      return aTokens + bPresses;
    }
    bPresses--;
  }

  return 0;
};

const parseInput = (inputLines: string[], partTwo?: boolean) => {
  const output: Game[] = [];
  let temp: string[] = [];
  inputLines.forEach((line) => {
    if (!line) {
      output.push(parseGame(temp as [string, string, string], partTwo));
      temp = [];
    } else {
      temp.push(line);
    }
  });

  return output;
};

const countAllTokens = (input: string[]) => {
  const games = parseInput(input, true);
  const allTokens = games.map((game, idx) => {
    console.log(idx, "of", games.length);
    return findLeastAmountOfTokens(game);
  });
  return allTokens.reduce((sum, tokens) => sum + tokens, 0);
};

console.log(countAllTokens(inputLines));
