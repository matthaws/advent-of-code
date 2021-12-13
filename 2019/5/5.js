function derivePerameters(string) {
  const charArray = string.split("").reverse();
  const code = Number(charArray[0]);
  const paramMods = charArray.slice(2);
  return [code, paramMods];
}

function getThreeParams(paramMods, input, index) {
  const firstParam =
    paramMods[0] && paramMods[0] === "1"
      ? input[index + 1]
      : input[input[index + 1]];
  const secondParam =
    paramMods[1] && paramMods[1] === "1"
      ? input[index + 2]
      : input[input[index + 2]];

  const placementIndex =
    paramMods[2] && paramMods[2] === "1" ? index + 3 : input[index + 3];

  return [firstParam, secondParam, placementIndex];
}

function jumpIf(code, paramMods, input, index) {
  const firstParam =
    paramMods[0] && paramMods[0] === "1"
      ? input[index + 1]
      : input[input[index + 1]];
  const secondParam =
    paramMods[1] && paramMods[1] === "1"
      ? input[index + 2]
      : input[input[index + 2]];

  if (code === 5 && firstParam !== 0) return secondParam;
  if (code === 6 && firstParam === 0) return secondParam;
  return index + 3;
}

function opcode(input) {
  let index = 0;

  while (input[index] !== 99) {
    const [code, paramMods] =
      input[index] > 99
        ? derivePerameters(String(input[index]))
        : [input[index], []];

    switch (code) {
      case 1:
        const [firstAdd, secondAdd, sumPlacementIndex] = getThreeParams(
          paramMods,
          input,
          index
        );
        input[sumPlacementIndex] = firstAdd + secondAdd;
        index = index + 4;
        continue;
      case 2:
        const [
          firstMultiply,
          secondMultiply,
          productPlacementIndex
        ] = getThreeParams(paramMods, input, index);

        input[productPlacementIndex] = firstMultiply * secondMultiply;
        index = index + 4;
        continue;
      case 3:
        let inputNum;
        if (index === 0) {
          inputNum = 5;
        }
        input[input[index + 1]] = inputNum;
        index = index + 2;
        continue;
      case 4:
        const output =
          paramMods[0] && paramMods[0] === "1"
            ? input[index + 1]
            : input[input[index + 1]];

        console.log(output);
        index = index + 2;
        continue;
      case 5:
        index = jumpIf(code, paramMods, input, index);
        continue;
      case 6:
        index = jumpIf(code, paramMods, input, index);
        continue;
      case 7:
        const [first, second, resultPlacementIndex] = getThreeParams(
          paramMods,
          input,
          index
        );
        input[resultPlacementIndex] = first < second ? 1 : 0;
        index = index + 4;
        continue;
      case 8:
        const [
          firstComparator,
          secondComparator,
          resultPlacement
        ] = getThreeParams(paramMods, input, index);
        input[resultPlacement] = firstComparator === secondComparator ? 1 : 0;
        index = index + 4;
        continue;
    }
  }
}

const input = require("./input");
opcode(input);
