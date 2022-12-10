const inputParser = require("../inputParser.ts");
const programSignalsInput = inputParser("day10.txt", "text");

// [cycleNum, register]
type State = [number, number];
type AddCycles = (state: State, num: number) => State;

const determinePixelStatus = (newCycleNum: number, register: number): string =>
  Math.abs((newCycleNum % 40) - register) < 2 ? "#" : ".";

const makeAddCycles = (collection: string[]): AddCycles => {
  const addCycles: AddCycles = ([cycleNum, register], numToAdd) => {
    let i = 0;
    let newCycleNum = cycleNum;
    while (i < numToAdd) {
      collection.push(determinePixelStatus(newCycleNum, register));
      console.log({ newCycleNum, register });
      i++;
      newCycleNum++;
    }

    return [newCycleNum, register];
  };

  return addCycles;
};

const parseSingleInstruction = (
  [cycleNum, register]: State,
  instruction: string,
  addCycles: AddCycles
): State => {
  let newState;
  if (instruction.startsWith("noop")) {
    newState = addCycles([cycleNum, register], 1);
  }

  if (instruction.startsWith("addx")) {
    const num = instruction.split(" ")[1];
    const addedCycles = addCycles([cycleNum, register], 2);
    newState = [addedCycles[0], addedCycles[1] + Number(num)];
  }

  return newState as State;
};

const parseAllInstructions = (input: string[]) => {
  const collection: string[] = [];
  const addCycles = makeAddCycles(collection);
  let state: State = [0, 1];
  input.forEach((line) => {
    state = parseSingleInstruction(state, line, addCycles);
  });

  console.log(collection);
  return collection;
};

const renderOutput = (collection: string[]) => {
  let toBeRendered = [...collection];
  while (toBeRendered.length > 0) {
    const line = toBeRendered.slice(0, 40);
    toBeRendered = toBeRendered.slice(40);
    console.log(line.join(""));
  }
};

console.log(renderOutput(parseAllInstructions(programSignalsInput)));
