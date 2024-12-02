const inputParser = require("../../inputParser.ts");
const inputLines = inputParser("day-1.txt", "text");

const sampleListA = [3, 4, 2, 1, 3, 3];
const sampleListB = [4, 3, 5, 3, 9, 3];

const parseInput = () => {
  const listA: number[] = [];
  const listB: number[] = [];

  (inputLines as string[]).forEach((line) => {
    const [numA, numB] = line.split("   ");
    listA.push(Number(numA));
    listB.push(Number(numB));
  });

  return [listA, listB];
};

const findListDiff = (listA: number[], listB: number[]) => {
  const sortedListA = listA.sort();
  const sortedListB = listB.sort();

  return sortedListA.reduce(
    (sum, num, idx) => sum + Math.abs(num - sortedListB[idx]),
    0
  );
};

const getNumCounts = (list: number[]) => {
  const map: Record<number, number> = {};
  return list.reduce((output, num) => {
    if (output[num]) {
      return { ...output, [num]: output[num] + 1 };
    } else {
      return { ...output, [num]: 1 };
    }
  }, map);
};

const findSimilarScore = (listA: number[], listB: number[]) => {
  const listBCounts = getNumCounts(listB);

  return listA.reduce((sum, num) => sum + num * (listBCounts[num] || 0), 0);
};

const [listA, listB] = parseInput();
console.log(findSimilarScore(listA, listB));
