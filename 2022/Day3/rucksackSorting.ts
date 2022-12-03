const inputParser = require("../inputParser.ts");
const rucksacksInput = inputParser("day-3.txt", "text");

const sampleSack = "vJrwpWtwJgWrhcsFMMfFFhFp";

const alpha = Array.from(Array(26)).map((e, i) => i + 97);
const alphabet = alpha.map((x) => String.fromCharCode(x));

const findRepeatItem = (rucksack: string): string => {
  const mid = Math.ceil(rucksack.length / 2);
  const firstSack = rucksack.slice(0, mid);
  const secondSack = rucksack.slice(mid);

  for (let i = 0; i < firstSack.length; i++) {
    if (secondSack.includes(firstSack[i])) {
      return firstSack[i];
    }
  }
  return "";
};

const findItemValue = (item: string) => {
  if (alphabet.includes(item)) {
    return alphabet.indexOf(item) + 1;
  }

  return alphabet.indexOf(item.toLocaleLowerCase()) + 27;
};

const findSumOfAllRepeatItemValues = (rucksacks: string[]) =>
  rucksacks.reduce((sum, sack) => {
    const repeat = findRepeatItem(sack);
    return sum + findItemValue(repeat);
  }, 0);

console.log(findSumOfAllRepeatItemValues(rucksacksInput));

// PART 2
type ElfGroup = [string, string, string];

const findItemCommonToGroup = (elfGroup: ElfGroup) => {
  const [elfOne, elfTwo, elfThree] = elfGroup;
  for (let i = 0; i < elfOne.length; i++) {
    if (elfTwo.includes(elfOne[i]) && elfThree.includes(elfOne[i])) {
      return elfOne[i];
    }
  }
  return "";
};

const findSumOfElfGroupItems = (rucksacks: string[]) => {
  let i = 0;
  let sum = 0;
  while (i < rucksacks.length) {
    const elfGroup = rucksacks.slice(i, i + 3);
    const badge = findItemCommonToGroup(elfGroup as ElfGroup);
    sum += findItemValue(badge);
    i += 3;
  }

  return sum;
};

console.log(findSumOfElfGroupItems(rucksacksInput));
