export interface Monkey {
  items: number[];
  inspect: (worryLevel: number) => number;
  findNextMonkey: (worryLevel: number) => [number, boolean];
  trueMonkey: number;
  falseMonkey: number;
}

const modulus = 5 * 7 * 13 * 11 * 3 * 2 * 17 * 19

const makeFindNextMonkey =
  (amount: number) =>
  (worryLevel: number): [number, boolean] => {
    return [worryLevel % modulus, worryLevel % amount === 0];
  };

const monkeyInput: Monkey[] = [
  {
    items: [52, 78, 79, 63, 51, 94],
    inspect: (worryLevel) => worryLevel * 13,
    findNextMonkey: makeFindNextMonkey(5),
    trueMonkey: 1,
    falseMonkey: 6,
  },
  {
    items: [77, 94, 70, 83, 53],
    inspect: (worryLevel) => worryLevel + 3,
    findNextMonkey: makeFindNextMonkey(7),
    trueMonkey: 5,
    falseMonkey: 3,
  },
  {
    items: [98, 50, 76],
    inspect: (worryLevel) => worryLevel * worryLevel,
    findNextMonkey: makeFindNextMonkey(13),
    trueMonkey: 0,
    falseMonkey: 6,
  },
  {
    items: [92, 91, 61, 75, 99, 63, 84, 69],
    inspect: (worryLevel) => worryLevel + 5,
    findNextMonkey: makeFindNextMonkey(11),
    trueMonkey: 5,
    falseMonkey: 7,
  },
  {
    items: [51, 53, 83, 52],
    inspect: (worryLevel) => worryLevel + 7,
    findNextMonkey: makeFindNextMonkey(3),
    trueMonkey: 2,
    falseMonkey: 0,
  },
  {
    items: [76, 76],
    inspect: (worryLevel) => worryLevel + 4,
    findNextMonkey: makeFindNextMonkey(2),
    trueMonkey: 4,
    falseMonkey: 7,
  },
  {
    items: [75, 59, 93, 69, 76, 96, 65],
    inspect: (worryLevel) => worryLevel * 19,
    findNextMonkey: makeFindNextMonkey(17),
    trueMonkey: 1,
    falseMonkey: 3,
  },
  {
    items: [89],
    inspect: (worryLevel) => worryLevel + 2,
    findNextMonkey: makeFindNextMonkey(19),
    trueMonkey: 2,
    falseMonkey: 4,
  },
];

module.exports = {
  monkeyInput,
};
