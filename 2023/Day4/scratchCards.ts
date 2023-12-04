const inputParser = require("../../inputParser.ts");
const inputLines = inputParser("day-4.txt", "text");

const sample = [
  "Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53",
  "Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19",
  "Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1",
  "Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83",
  "Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36",
  "Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11",
];

const parseLine = (line: string): [string, number[], number[]] => {
  const [cardNum, cardVals] = line.split(":");
  const [winningNums, presentNums] = cardVals.split(" | ");
  const winningNumbers = winningNums.split(" ").filter(Boolean).map(Number);
  const presentNumbers = presentNums.split(" ").filter(Boolean).map(Number);
  const cardNumber = cardNum.split(" ").filter(Boolean)[1];
  return [cardNumber, winningNumbers, presentNumbers];
};

const findCardValue = ([cardNumber, winningNumbers, presentNumbers]: [
  string,
  number[],
  number[]
]) =>
  presentNumbers.map((num) => winningNumbers.includes(num)).filter(Boolean)
    .length;

const sumAllWinningCards = (lines: string[]) =>
  lines.reduce((sum, line) => {
    const numWinning = findCardValue(parseLine(line));
    if (numWinning === 0) return sum;
    if (numWinning === 1) return sum + 1;
    return sum + 2 ** (numWinning - 1);
  }, 0);

console.log(sumAllWinningCards(inputLines));

// PART TWO

const buildCardReference = (lines: string[]) =>
  lines.reduce((map, line) => {
    const [cardNum, winningNumbers, presentNumbers] = parseLine(line);
    console.log(cardNum, winningNumbers, presentNumbers)
    const numWinners = findCardValue([
      cardNum as string,
      winningNumbers,
      presentNumbers,
    ]);
    let cardsToAdd: number[] = [];
    for (let i = 1; i < numWinners + 1; i++) {
      cardsToAdd.push(Number(cardNum) + i);
    }
    map[cardNum] = cardsToAdd;
    return map;
  }, {} as Record<string, number[]>);

const countTotalScorecards = (lines: string[]) => {
  const totals: Record<string, number> = {};
  const cardRef = buildCardReference(lines);
console.log(cardRef)
  for (let i = 1; i < 220 ; i++) {
  
    if (!totals[i]) {
      totals[i] = 1;
    }
    const cardsToAdd = cardRef[i];
    cardsToAdd.forEach((cardNum) => {
      if (!totals[cardNum]) {
        totals[cardNum] = 1;
      }
      console.log(i, 'adding', totals[i], "to", cardNum)
      totals[cardNum] = totals[cardNum] + totals[i];
    });
  }

  console.log(totals);
  return Object.values(totals).reduce((sum, val) => sum + val, 0);
};

console.log(countTotalScorecards(inputLines));
