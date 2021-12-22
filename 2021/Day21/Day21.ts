const setupDice = (): number[] => {
  const deterministicDice = [...Array(101).keys()];
  deterministicDice.shift();
  return deterministicDice;
};

let rollCount = 0;

const rollDice = (dice: number[]): number[][] => {
  const rolls: number[] = [];
  let rolledDice = dice;
  for (let i = 0; i < 3; i++) {
    if (rolledDice.length > 0) {
      rolls.push(rolledDice.shift() as number);
    } else {
      rolledDice = setupDice();
      rolls.push(rolledDice.shift() as number);
    }
    rollCount++;
  }

  return [rolls, rolledDice];
};

const playTurn = (
  pos: number,
  score: number,
  dice: number[]
): [number, number, number[]] => {
  const [rolls, rolledDice] = rollDice(dice);
  const moves = rolls.reduce((sum, roll) => sum + roll, 0);
  const newPos = (pos + moves) % 10 === 0 ? 10 : (pos + moves) % 10;
  const newScore = score + newPos;

  return [newPos === 0 ? 10 : newPos, newScore, rolledDice];
};

const playGame = (): [number, number, number] => {
  let player1Pos = 10;
  let player2Pos = 3;
  let player1Score = 0;
  let player2Score = 0;
  let dice = setupDice();
  let turn = 1;

  while (player1Score < 1000 && player2Score < 1000) {
    if (turn % 2 === 1) {
      const [newPos, newScore, rolledDice] = playTurn(
        player1Pos,
        player1Score,
        dice
      );
      player1Pos = newPos;
      player1Score = newScore;
      dice = rolledDice;
    } else {
      const [newPos, newScore, rolledDice] = playTurn(
        player2Pos,
        player2Score,
        dice
      );
      player2Pos = newPos;
      player2Score = newScore;
      dice = rolledDice;
    }

    turn++;
  }

  const loserScore = player1Score > player2Score ? player2Score : player1Score;
  return [loserScore, rollCount, loserScore * rollCount];
};

console.log(playGame());
