const inputParser = require("../../inputParser.ts");
const inputLines = inputParser("day-7.txt", "text");

const CARDS = [
  "A",
  "K",
  "Q",
  "T",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
  "J",
] as const;

type Card = (typeof CARDS)[number];

const HANDS = [
  "fiveOfKind",
  "fourOfKind",
  "fullHouse",
  "threeOfKind",
  "twoPair",
  "onePair",
  "highCard",
];

type Hand = (typeof HANDS)[number];

type CardMap = Record<Card, number>;

const countCards = (hand: string) =>
  (hand.split("") as Card[]).reduce(
    (cardMap, card) => ({
      ...cardMap,
      [card]: cardMap[card] ? cardMap[card] + 1 : 1,
    }),
    {} as CardMap
  );

const getHandType = (hand: string): (typeof HANDS)[number] => {
  const cardCounts = Object.values(countCards(hand)).sort(
    (valA, valB) => valB - valA
  );

  switch (JSON.stringify(cardCounts)) {
    case "[5]":
      return "fiveOfKind";
    case "[4,1]":
      return "fourOfKind";
    case "[3,2]":
      return "fullHouse";
    case "[3,1,1]":
      return "threeOfKind";
    case "[2,2,1]":
      return "twoPair";
    case "[2,1,1,1]":
      return "onePair";
    default:
      return "highCard";
  }
};

const getStrongestHandWithJokers = (hand: string) => {
  const hasJokers = hand.includes("J");
  let strongestHand = getHandType(hand);
  if (!hasJokers) {
    return strongestHand;
  } else {
    for (let i = 0; i < CARDS.length; i++) {
      const impersonatingCard = CARDS[i];
      const wildHand = hand.replaceAll("J", impersonatingCard);

      const wildHandType = getHandType(wildHand);
      if (HANDS.indexOf(wildHandType) < HANDS.indexOf(strongestHand)) {
        strongestHand = wildHandType;
      }
    }
  }
  return strongestHand;
};


const sortHandsAscending = (handA: string, handB: string) => {
  const typeA = getStrongestHandWithJokers(handA);
  const typeB = getStrongestHandWithJokers(handB);
  if (typeA === typeB) {
    let i = 0;
    while (handA[i] === handB[i]) i++;
    return CARDS.indexOf(handB[i] as Card) - CARDS.indexOf(handA[i] as Card);
  } else {
    return HANDS.indexOf(typeB) - HANDS.indexOf(typeA);
  }
};

const findTotalWinnings = (lines: string[]) => {
  const sortedHands = lines
    .map((line) => line.split(" "))
    .sort((lineA, lineB) => {
      return sortHandsAscending(lineA[0], lineB[0]);
    });

  return sortedHands.reduce((sum, [hand, bid], i) => {
    const rank = i + 1;
    return sum + Number(bid) * rank;
  }, 0);
};

console.log(findTotalWinnings(inputLines));
