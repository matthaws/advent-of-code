const derivePerameters = string => {
  const charArray = string.split("").reverse();
  const code = Number(charArray[0]);
  const paramMods = charArray.slice(2);
  return [code, paramMods];
};

const convertProgram = program =>
  program.reduce((programMap, code, idx) => {
    programMap[idx] = code;
    return programMap;
  }, {});

const intcodeComputer = (program, inputs = [], startingIndex = 0) => {
  let relativeBase = 0;
  let index = startingIndex;

  const initializeIfEmpty = (indices = []) => {
    indices.forEach(index => {
      if (!program[index]) program[index] = 0;
    });
  };

  const deriveParamIndex = (indexOfParam, paramMod = "0") => {
    switch (paramMod) {
      case "0":
        return program[indexOfParam];
      case "1":
        return indexOfParam;
      case "2":
        return program[indexOfParam] + relativeBase;
    }
  };

  const getParamIndices = (codeIndex, paramMods, numParams) => {
    const paramIndices = [];
    for (let i = 0; i < numParams; i++) {
      paramIndices.push(deriveParamIndex(codeIndex + i + 1, paramMods[i]));
    }
    initializeIfEmpty(paramIndices);
    return paramIndices;
  };

  while (program[index] !== 99) {
    const [code, paramMods] =
      program[index] > 99
        ? derivePerameters(String(program[index]))
        : [program[index], []];

    switch (code) {
      case 1:
        const [
          firstAddIndex,
          secondAddIndex,
          sumPlacementIndex
        ] = getParamIndices(index, paramMods, 3);
        program[sumPlacementIndex] =
          program[firstAddIndex] + program[secondAddIndex];
        index += 4;
        continue;
      case 2:
        const [
          firstMultiplyIndex,
          secondMultiplyIndex,
          productPlacementIndex
        ] = getParamIndices(index, paramMods, 3);
        program[productPlacementIndex] =
          program[firstMultiplyIndex] * program[secondMultiplyIndex];
        index += 4;
        continue;
      case 3:
        if (inputs.length > 0) {
          const [inputIndex] = getParamIndices(index, paramMods, 1);
          program[inputIndex] = inputs.shift();
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
        const [outputIndex] = getParamIndices(index, paramMods, 1);
        initializeIfEmpty([outputIndex]);
        const output = program[outputIndex];
        return {
          status: "providing output",
          output,
          program,
          inputs,
          index: index + 2
        };
      case 5:
        const [jumpIfTrue, jumpIfTrueIndex] = getParamIndices(
          index,
          paramMods,
          2
        );
        index =
          program[jumpIfTrue] !== 0 ? program[jumpIfTrueIndex] : index + 3;
        continue;
      case 6:
        const [jumpIfFalse, jumpIfFalseIndex] = getParamIndices(
          index,
          paramMods,
          2
        );
        index =
          program[jumpIfFalse] === 0 ? program[jumpIfFalseIndex] : index + 3;
        continue;
      case 7:
        const [compareA, compareB, ifLessThanIndex] = getParamIndices(
          index,
          paramMods,
          3
        );
        program[ifLessThanIndex] =
          program[compareA] < program[compareB] ? 1 : 0;
        index += 4;
        continue;
      case 8:
        const [isEqualA, isEqualB, isEqualIndex] = getParamIndices(
          index,
          paramMods,
          3
        );
        program[isEqualIndex] = program[isEqualA] === program[isEqualB] ? 1 : 0;
        index += 4;
        continue;
      case 9:
        const [baseModifierIndex] = getParamIndices(index, paramMods, 1);
        relativeBase += program[baseModifierIndex];
        index += 2;
        continue;
    }
  }

  return { status: "program complete" };
};

module.exports = {
  convertProgram,
  intcodeComputer
};
