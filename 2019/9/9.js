const { convertProgram, intcodeComputer } = require("./intcodeComputer");
const input = require("./input");
const program = convertProgram(input);

let computer = intcodeComputer(program, [2]);

while (computer.status !== "program complete") {
  if (computer.status === "providing output") {
    console.log(computer.output);
    computer = intcodeComputer(
      computer.program,
      computer.inputs,
      computer.index
    );
  } else {
    console.log(computer.status);
  }
}
