const opcode = require("./opcode.js");

function getAllPermutations(array) {
  if (array.length === 1) return [array];
  return array.reduce((results, letter, index) => {
    const innerPerms = getAllPermutations([
      ...array.slice(0, index),
      ...array.slice(index + 1)
    ]);
    return results.concat(innerPerms.map(perm => [letter, ...perm]));
  }, []);
}

const startAmplifier = (ampName, program, phaseCode) => ({
  [ampName]: opcode(program, [phaseCode, ...(ampName === "A" ? [0] : [])])
});

function fireAllAmplifiersWithFeedback(program, phaseSequence) {
  const amps = ["A", "B", "C", "D", "E"];
  const nextAmp = ["B", "C", "D", "E", "A"];
  const amplifiers = phaseSequence.reduce((amplifiers, phaseCode, idx) => {
    return { ...amplifiers, ...startAmplifier(amps[idx], program, phaseCode) };
  }, {});

  while (amps.slice(0, 4).some(amp => Boolean(amplifiers[amp])))
    amps.forEach((amp, idx) => {
      const { status, inputs, program, index, output } = amplifiers[amp] || {};
      if (status === "providing output") {
        amplifiers[nextAmp[idx]].inputs.push(output);
        amplifiers[amp] = opcode(program, inputs, index);
      } else if (status === "awaiting input" && inputs.length > 0) {
        amplifiers[amp] = opcode(program, inputs, index);
      }
    });

  return amplifiers["E"].output;
}

function findHighestSequence(program, seqNums) {
  const allSequences = getAllPermutations(seqNums);
  let highestSignal;
  allSequences.forEach(seq => {
    const signal = fireAllAmplifiersWithFeedback(program, seq);
    if (!highestSignal || signal > highestSignal) {
      highestSignal = signal;
    }
  });
  return highestSignal;
}

const input = require("./input.js");
const sample = [
  3,
  26,
  1001,
  26,
  -4,
  26,
  3,
  27,
  1002,
  27,
  2,
  27,
  1,
  27,
  26,
  27,
  4,
  27,
  1001,
  28,
  -1,
  28,
  1005,
  28,
  6,
  99,
  0,
  0,
  5
];

console.log(findHighestSequence(input, [5, 6, 7, 8, 9]));
