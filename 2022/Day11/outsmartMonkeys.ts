import { Monkey } from "./monkeyInputs";

const { monkeyInput } = require("./monkeyInputs");

const oneMonkeyRound = (monkeys: Monkey[], record: number[]) => {
  monkeys.forEach((monkey, monkeyNum) => {
    while (monkey.items.length > 0) {
      // inspect the item, adjusting worry level
      let item = monkey.items.shift();
      item = monkey.inspect(item as number);

      // record that this monkey has inspected an item
      record[monkeyNum]++;

      // monkey gets bored, worry divides by 3
    //   item = Math.floor(item / 3);

      // monkey passes item to the correct next monkey
      const [adjustedItem, bool] = monkey.findNextMonkey(item);
      const nextMonkeyNum = bool ? monkey.trueMonkey : monkey.falseMonkey;
      monkeys[nextMonkeyNum].items.push(adjustedItem);
    }
  });
  return monkeys;
};

const findMostActiveMonkeys = (monkeys: Monkey[]) => {
  const record = new Array(8).fill(0);
  let currentMonkeyRound = monkeys;
  for (let i = 0; i < 10000; i++) {
    currentMonkeyRound = oneMonkeyRound(currentMonkeyRound, record);
  }

  return record
    .sort((numA, numB) => numB - numA)
    .slice(0, 2)
    .reduce((product, num) => product * num, 1);
};

console.log(findMostActiveMonkeys(monkeyInput));
