const inputParser = require("../inputParser.js");
const foldInstructions = inputParser("day-13.txt", "string");

const parseInput = (input) => {
  const dotLocations = [];
  const foldInstructions = [];
  input.forEach((line) => {
    if (line.startsWith("fold")) {
      foldInstructions.push(line.split("fold along ")[1]);
    } else {
      dotLocations.push(line);
    }
  });
  return [dotLocations, foldInstructions];
};

const fold = (dotLocations, axis, lineNum) => {
  const newLocations = dotLocations.map((pos) => {
    const [x, y] = pos.split(",").map(Number);
    const keyCoord = axis === "x" ? x : y;
    if (keyCoord === lineNum) return false;
    const diff = Math.abs(keyCoord - lineNum);
    const newPos = axis === "x" ? [lineNum - diff, y] : [x, lineNum - diff];
    return newPos.join(",");
  });

  return newLocations
    .filter(Boolean)
    .filter((pos, idx) => newLocations.indexOf(pos) === idx);
};
const render = (locations) => {
  let maxX = 0
  let maxY = 0
  const output = [];
  locations.forEach((pos) => {
    const [x, y] = pos.split(",").map(Number);
    maxX = x > maxX ? x : maxX;
    maxY = y > maxY ? y : maxY;
  });
  let row;
  for (let y = 0; y <= maxY; y++) {
    row = [];
    for (let x = 0; x <= maxX; x++) {
      const xSpot = locations.find((pos) => pos === `${x},${y}`);

      if (xSpot) {
        row.push("#");
      } else {
        row.push(".");
      }
    }
    output.push(row.join(""));
  }

  return output.join("\n");
};

const commenceFoldingOperation = (input) => {
  const [startingLocations, foldingInstructions] = parseInput(input);
  const endingLocations = foldingInstructions.reduce(
    (currentLocations, instruction) => {
      const [axis, lineNum] = instruction.split("=");
      return fold(currentLocations, axis, Number(lineNum));
    },
    startingLocations
  );
 return render(endingLocations);
};

console.log(commenceFoldingOperation(foldInstructions));
