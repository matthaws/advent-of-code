const inputParser = require("../inputParser.ts");
const elfCalorieLoad = inputParser("day-1.txt", "spaces");

const divideAndSumElfLoads = (input: string[]): number[] =>
  input
    .join(":")
    .split("::")
    .map((load) => load.split(":").map(Number))
    .map((elf) => elf.reduce((sum, calorie) => sum + calorie, 0));;

const findLargestCalorieLoad = (loads: string[]) => Math.max(...divideAndSumElfLoads(loads))

const findSumOfThreeLargestLoads = (loads: string[]) => {
  const sumOfLoads = divideAndSumElfLoads(loads);
  return sumOfLoads
    .sort((sumA, sumB) => sumB - sumA)
    .slice(0, 3)
    .reduce((sum, elf) => sum + elf, 0);
};

console.log(findLargestCalorieLoad(elfCalorieLoad))
console.log(findSumOfThreeLargestLoads(elfCalorieLoad))