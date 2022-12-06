const inputParser = require("../inputParser.ts");
const elfCommunicationInput = inputParser("day-6.txt", "text");

const findMarker = (input: string, markerSize: number): number => {
  let num = markerSize;
  const lastFour = input.slice(0, markerSize).split("");

  if (new Set(lastFour).size === markerSize) return 1;

  while (num < input.length) {
    lastFour.shift();
    lastFour.push(input[num]);
    if (new Set(lastFour).size === markerSize) {
      return num + 1;
    }
    num++;
  }

  return num;
};

const findStartOfPacketMarker = (input: string): number => findMarker(input, 4);
const findStartOfMessageMarker = (input: string): number =>
  findMarker(input, 14);

module.exports = {
  findStartOfMessageMarker,
  findStartOfPacketMarker,
};
