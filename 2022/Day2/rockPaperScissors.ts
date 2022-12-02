const inputParser = require("../inputParser.ts");
const gameRounds = inputParser("day-2.txt", "text");

const sampleRounds = ["A Y", "B X", "C Z"];

const score: Record<string, number> = {
  X: 1,
  Y: 2,
  Z: 3,
};

const losingPlay: Record<string, string> = {
  A: "Z",
  B: "X",
  C: "Y",
};

const matchingPlay: Record<string, string> = {
  A: "X",
  B: "Y",
  C: "Z",
};

const winningPlay: Record<string, string> = {
  A: "Y",
  B: "Z",
  C: "X",
};

const scoreRound = (theirMove: string, myMove: string) => {
  if (matchingPlay[theirMove] === myMove) {
    return 3 + score[myMove];
  }
  if (winningPlay[theirMove] === myMove) {
    return 6 + score[myMove];
  }
  return score[myMove];
};

const calculateMoveAndScore = (round: string) => {
  const [theirMove, move] = round.split(" ");
  if (move === "X") {
    return scoreRound(theirMove, losingPlay[theirMove]);
  }
  if (move === "Y") {
    return scoreRound(theirMove, matchingPlay[theirMove]);
  }
  return scoreRound(theirMove, winningPlay[theirMove]);
};

const findMyTotalScore = (rounds: string[]): number =>
  rounds.reduce((sum, round) => sum + calculateMoveAndScore(round), 0);

console.log(findMyTotalScore(gameRounds));
