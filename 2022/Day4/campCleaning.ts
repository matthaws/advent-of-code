const inputParser = require("../inputParser.ts");
const cleaningAssignmentsInput = inputParser("day-4.txt", "text");

const formatRange = (range: string) => {
  const elves = range.split(",");
  return elves.map((elf) => elf.split("-").map(Number));
};

type Elf = [number, number];

const isElfInsideOtherElf = (elfOne: Elf, elfTwo: Elf) => {
  const [elfOneStart, elfOneEnd] = elfOne;
  const [elfTwoStart, elfTwoEnd] = elfTwo;

  if (elfOneStart >= elfTwoStart && elfOneEnd <= elfTwoEnd) {
    return true;
  }

  return false;
};

const doElvesOverlap = (elfOne: Elf, elfTwo: Elf) => {
  const [elfOneStart, elfOneEnd] = elfOne;
  const [elfTwoStart, elfTwoEnd] = elfTwo;

  if (elfOneStart > elfTwoEnd || elfOneEnd < elfTwoStart) {
    return false;
  }

  return true;
};

const findNumberOfElvesInsideOtherElves = (input: any) => {
  const formatedElves = input.map(formatRange);
  console.log(formatedElves);
  let num = 0;

  formatedElves.forEach((elves: Elf[]) => {
    const [elfOne, elfTwo] = elves;
    if (
      // PART ONE  isElfInsideOtherElf(elfOne, elfTwo) ||
      //           isElfInsideOtherElf(elfTwo, elfOne)
      doElvesOverlap(elfOne, elfTwo)
    ) {
      num += 1;
    }
  });

  return num;
};

console.log(findNumberOfElvesInsideOtherElves(cleaningAssignmentsInput));
