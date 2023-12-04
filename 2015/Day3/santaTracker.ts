const inputParser = require("../../inputParser.ts");
const packageInput = inputParser("day-3.txt", "text");

const trackNumDeliveries = (path: string) => {
  let santaX = 0;
  let santaY = 0;

  let roboSantaX = 0;
  let roboySantaY = 0;

  let turn = "SANTA";

  const houseTracker = new Set<string>();
  houseTracker.add("0:0");

  path.split("").forEach((char) => {
    let difX = 0;
    let difY = 0;
    if (char === "^") difX = 1;
    if (char === "v") difX = -1;
    if (char === "<") difY = -1;
    if (char === ">") difY = 1;

    if (turn === "SANTA") {
      santaX = santaX + difX;
      santaY = santaY + difY;
      houseTracker.add(`${santaX}:${santaY}`);
      turn = "ROBOT";
    } else {
      roboSantaX = roboSantaX + difX;
      roboySantaY = roboySantaY + difY;
      houseTracker.add(`${roboSantaX}:${roboySantaY}`);
      turn = "SANTA";
    }
  });

  return houseTracker.size;
};

console.log(trackNumDeliveries(packageInput[0]));
