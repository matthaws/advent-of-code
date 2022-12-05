const inputParser = require("../inputParser.ts");
const stackingInstructions = inputParser("day-5.txt", "text");

type Crates = Record<string, string>;

const startingCrates: Crates = {
  1: "DTWNL",
  2: "HPC",
  3: "JMGDNHPW",
  4: "LQTNSWC",
  5: "NCHP",
  6: "BQWMDNHT",
  7: "LSGJRBM",
  8: "TRBVGWNZ",
  9: "LPNDGW",
};

const executeStackingCommand = (
  numToMove: number,
  fromNum: string,
  toNum: string,
  currentCrates: Crates
) => {
  const movingLetters = currentCrates[fromNum].slice(0, numToMove)
  const newFromStack = currentCrates[fromNum].slice(numToMove);
  const newToStack = `${movingLetters}${currentCrates[toNum]}`;

  return {
    ...currentCrates,
    [fromNum]: newFromStack,
    [toNum]: newToStack,
  };
};

const getAllTopCrates = (currentCrates: Crates) =>
  Object.keys(currentCrates)
    .sort()
    .map((key) => currentCrates[key][0])
    .join("");

const parseCommand = (command: string) => {
  const [numberToMoveCommand, toFromCommand] = command.split(" from ");
  const number = numberToMoveCommand.split(" ")[1];
  const [fromNum, toNum] = toFromCommand.split(" to ");
  return [number, fromNum, toNum];
};

const executeCommands = (commands: string[]) => {
  const parsedCommands = commands.map(parseCommand);
  let currentCrates = startingCrates;
  parsedCommands.forEach(([numToMove, fromStack, toStack]) => {
    currentCrates = executeStackingCommand(
      Number(numToMove),
      fromStack,
      toStack,
      currentCrates
    );
  });
  return getAllTopCrates(currentCrates);
};

console.log(executeCommands(stackingInstructions));
