const inputParser = require("../../inputParser.ts");
const inputLines = inputParser("day-15.txt", "text");

const hashItUp = (string: string) => {
  let currentValue = 0;
  string.split("").forEach((char) => {
    const val = char.charCodeAt(0);
    currentValue = currentValue + val;
    currentValue = currentValue * 17;
    currentValue = currentValue % 256;
  });
  return currentValue;
};

const sumHashes = (strings: string[]) =>
  strings.reduce((sum, string) => sum + hashItUp(string), 0);

console.log(sumHashes(inputLines[0].split(",")));

// PART TWO

const getFocusingPower = (labelNum: number, slotNumber: number, val: number) => {
// console.log(labelNum, slotNumber, val, labelNum * slotNumber * val);

 return labelNum * slotNumber * val;
}
const dealWithLenses = (instructions: string[]) => {
  const lenses: Record<string, [string, number][]> = {};

  instructions.forEach((step) => {
    if (step.includes("=")) {
      const [label, value] = step.split("=");
      const labelVal = hashItUp(label);
      if (!lenses[labelVal]) lenses[labelVal] = [];
      if (lenses[labelVal].find(([lensLabel]) => lensLabel === label)) {
        lenses[labelVal] = lenses[labelVal].map((lens) =>
          lens[0] === label ? [label, Number(value)] : lens
        );
      } else {
        lenses[labelVal].push([label, Number(value)]);
      }
    } else if (step.includes("-")) {
      const [label, value] = step.split("-");
      const labelVal = hashItUp(label);
      if (!lenses[labelVal]) lenses[labelVal] = [];
      lenses[labelVal] = lenses[labelVal].filter((lens) => lens[0] !== label);
    }
  });

  console.log(lenses)
  return Object.entries(lenses).reduce((sum, [labelVal, lenses]) => {
    if (lenses.length === 0) return sum;
    return sum + lenses.reduce(
      (sum, [label, val], idx) =>
        sum + getFocusingPower(Number(labelVal) + 1, idx + 1, val),
      0
    );
  }, 0);
};

// console.log(
//   dealWithLenses(
//     "rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7".split(",")
//   )
// );

console.log(dealWithLenses(inputLines[0].split(',')))
