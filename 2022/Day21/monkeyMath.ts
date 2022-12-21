const inputParser = require("../inputParser.ts");
const monkeyInput = inputParser("day-21.txt", "string");

interface Monkey {
  valOne: number | string;
  valTwo?: string;
  operation?: "+" | "-" | "*" | "/";
  number?: number;
}

const parseMonkeyInput = (input: string[]) =>
  input.reduce((monkeys, line) => {
    const [monkeyName, valOne, operation, valTwo] = line.split(" ");
    const formattedName = monkeyName.split(":")[0];
    return {
      ...monkeys,
      [formattedName]: {
        valOne,
        valTwo,
        operation,
      },
    };
  }, {});

// const findHumanValue = (monkeyInput) => {
const getMonkeyValue = (
  monkeyName: string,
  monkeys: Record<string, Monkey>
): number => {
  const { valOne, valTwo, operation } = monkeys[monkeyName];
  if (!isNaN(Number(valOne))) return Number(valOne);

  const convertedValOne: number =
    monkeys[valOne].number || getMonkeyValue(valOne as string, monkeys);
  const convertedValTwo: number =
    monkeys[valTwo as string].number ||
    getMonkeyValue(valTwo as string, monkeys);
  let result: number = 0;
  switch (operation) {
    case "+": {
      result = convertedValOne + convertedValTwo;
      break;
    }
    case "-": {
      result = convertedValOne - convertedValTwo;
      break;
    }
    case "*": {
      result = convertedValOne * convertedValTwo;
      break;
    }
    case "/": {
      result = convertedValOne / convertedValTwo;
      break;
    }
    default: {
      console.log("unrecognized operation", operation, operation === "*");
    }
  }
  monkeys[monkeyName].number = result;
  return result;
};

// Part Two

const containsHuman = (
  monkeyName: string,
  monkeys: Record<string, Monkey>
): boolean => {
  if (monkeyName === "humn") return true;

  const { valOne, valTwo } = monkeys[monkeyName];
  if (!isNaN(Number(valOne))) return false;

  return (
    containsHuman(valOne as string, monkeys) ||
    containsHuman(valTwo as string, monkeys)
  );
};

const makeHumanValueToMatch = (
  monkeyName: string,
  monkeys: Record<string, Monkey>,
  valueToMatch: number
): number => {
  const { valOne, valTwo, operation } = monkeys[monkeyName];
  const sideWithHuman = containsHuman(valOne as string, monkeys)
    ? valOne
    : valTwo;
  const sideWithoutHumanValue =
    sideWithHuman === valOne
      ? getMonkeyValue(valTwo as string, monkeys)
      : getMonkeyValue(valOne as string, monkeys);

  let humnVal: number = 0;
  switch (operation) {
    case "+": {
      humnVal = valueToMatch - sideWithoutHumanValue;

      break;
    }
    case "-": {
      humnVal =
        sideWithHuman === valOne
          ? valueToMatch + sideWithoutHumanValue
          : Math.abs(valueToMatch - sideWithoutHumanValue);
      break;
    }
    case "*": {
      humnVal = valueToMatch / sideWithoutHumanValue;
      break;
    }
    case "/": {
      humnVal =
        sideWithHuman === valOne
          ? valueToMatch * sideWithoutHumanValue
          : sideWithoutHumanValue / valueToMatch;
      break;
    }
    default: {
      console.log("unrecognized operation", operation, operation === "*");
    }
  }
  console.log({valOne, valTwo, sideWithHuman, sideWithoutHumanValue, humnVal, valueToMatch, operation})
  if (sideWithHuman === 'humn') return humnVal;
  
  return makeHumanValueToMatch(sideWithHuman as string, monkeys, humnVal);
};

const rootOperation = (monkeys: Record<string, Monkey>) => {
  const { valOne, valTwo, operation } = monkeys.root;

  const [sideWithHuman, sideWithoutHuman] = containsHuman(
    valOne as string,
    monkeys
  )
    ? [valOne, valTwo]
    : [valTwo, valOne];

  const valueToMatch = getMonkeyValue(sideWithoutHuman as string, monkeys);
  const humanValue = makeHumanValueToMatch(sideWithHuman as string, monkeys, valueToMatch);
  return humanValue;
};

// console.log(getMonkeyValue("root", parseMonkeyInput(monkeyInput)));
console.log(rootOperation(parseMonkeyInput(monkeyInput)));
