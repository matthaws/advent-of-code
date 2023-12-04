const inputParser = require("../../inputParser.ts");
const inputLines = inputParser("day-2.txt", "text");

type Color = "red" | "green" | "blue";
type Game = Record<Color, number>;

const sample = [
  "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green",
  "Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue",
  "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red",
  "Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red",
  "Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green",
];

const transformStringLine = (line: string): [string, Game[]] => {
  const [gameInfo, game] = line.split(": ");
  const gameId = gameInfo.split(" ")[1];

  const draws = game.split("; ").map((draw) =>
    draw.split(", ").reduce((record, colorDraw) => {
      const [number, color] = colorDraw.split(" ");
      return { ...record, [color]: Number(number) };
    }, {} as Game)
  );

  return [gameId, draws];
};

const isGamePossibleMatch = (game: Game[], matchCounts: Game) => {
  let result = true;
  Object.keys(matchCounts).forEach((color) => {
    if (
      game.some((draw) => draw[color as Color] > matchCounts[color as Color])
    ) {
      result = false;
    }
  });

  return result;
};

const findAllMatchingGames = (matchCounts: Game) =>
  inputLines.reduce((sum: number, line: string) => {
    const [id, draws] = transformStringLine(line);
    if (isGamePossibleMatch(draws, matchCounts)) {
      return sum + Number(id);
    } else {
      return sum;
    }
  }, 0);

console.log(findAllMatchingGames({ red: 12, green: 13, blue: 14 }));

// PART TWO

const findPowerOfGame = (draws: Game[]) => {
  const min = { red: 0, blue: 0, green: 0 };
  draws.forEach((draw: Game) => {
    (["red", "blue", "green"] as Color[]).forEach((color) => {
      if (draw[color] > min[color]) min[color] = draw[color];
    });
  });

  return Object.values(min).reduce((sum, val) => sum * val, 1);
};

const sumAllPowers = () =>
  inputLines.reduce((sum: number, line: string) => {
    const [id, games] = transformStringLine(line);
    return sum + findPowerOfGame(games);
  }, 0);

console.log(sumAllPowers());
