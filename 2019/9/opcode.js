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

const opcode = (program, inputs, startingIndex = 0) => {
  let index = startingIndex;
  while (program[index] !== 99) {
    const [code, paramMods] =
      program[index] > 99
        ? derivePerameters(String(program[index]))
        : [program[index], []];

    switch (code) {
      case 1:
        const [firstAdd, secondAdd, sumPlacementIndex] = getThreeParams(
          paramMods,
          program,
          index
        );
        program[sumPlacementIndex] = firstAdd + secondAdd;
        index = index + 4;
        continue;
      case 2:
        const [
          firstMultiply,
          secondMultiply,
          productPlacementIndex
        ] = getThreeParams(paramMods, program, index);

        program[productPlacementIndex] = firstMultiply * secondMultiply;
        index = index + 4;
        continue;
      case 3:
        if (inputs.length > 0) {
          program[program[index + 1]] = inputs.shift();
          index = index + 2;
          continue;
        } else {
          return {
            program,
            inputs,
            status: "awaiting input",
            index
          };
        }
      case 4:
        const output =
          paramMods[0] && paramMods[0] === "1"
            ? program[index + 1]
            : program[program[index + 1]];

        return {
          status: "providing output",
          output,
          program,
          inputs,
          index: index + 2
        };
      case 5:
        index = jumpIf(code, paramMods, program, index);
        continue;
      case 6:
        index = jumpIf(code, paramMods, program, index);
        continue;
      case 7:
        const [first, second, resultPlacementIndex] = getThreeParams(
          paramMods,
          program,
          index
        );
        program[resultPlacementIndex] = first < second ? 1 : 0;
        index = index + 4;
        continue;
      case 8:
        const [
          firstComparator,
          secondComparator,
          resultPlacement
        ] = getThreeParams(paramMods, program, index);
        program[resultPlacement] = firstComparator === secondComparator ? 1 : 0;
        index = index + 4;
        continue;
    }
  }
};

module.exports = opcode;
