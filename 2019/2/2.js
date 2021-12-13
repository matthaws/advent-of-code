function opcode(input) {
  let index = 0;
  let newIndex;
  while (input[index] !== 99) {
    if (input[index] !== 1 && input[index] !== 2) return "something went wrong";
    const firstNumIndex = input[index + 1];
    const secondNumIndex = input[index + 2];
    const positionIndex = input[index + 3];
    input[index] === 1
      ? (input[positionIndex] = input[firstNumIndex] + input[secondNumIndex])
      : (input[positionIndex] = input[firstNumIndex] * input[secondNumIndex]);
    index = index + 4;
  }
  return input[0];
}

function findProgramOutput(input, target) {
  for (i = 0; i < 100; i++) {
    for (j = 0; j < 100; j++) {
      let newInput = [...input];
      newInput[1] = i;
      newInput[2] = j;
      const result = opcode(newInput);
      if (result === target) return `${i}${j}`;
    }
  }
  return "no answer found";
}

const input = require("./input");

console.log(findProgramOutput(input, 19690720));
