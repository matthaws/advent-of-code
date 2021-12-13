const inputParser = require("../inputParser.ts");;
const crabSubs = inputParser("day-7.txt", "number");

const sampleCrabSubs = [16, 1, 2, 0, 4, 2, 7, 1, 2, 14];

const buildStartingPositions = (subs) =>
  subs.reduce(
    (map, sub) => ({
      ...map,
      [sub]: map[sub] ? map[sub] + 1 : 1,
    }),
    {}
  );

const calculateFuelCost = (
  startingPositions,
  meetingPoint,
  fuelType,
  currentMin
) => {
  let totalCost = 0;
  const positions = Object.keys(startingPositions);

  for (i = 0; i < positions.length; i++) {
    const diff = Math.abs(positions[i] - meetingPoint);
    const costForOneSub =
      fuelType === "expensive" ? (diff * diff + diff) / 2 : diff;

    totalCost = totalCost + costForOneSub * startingPositions[positions[i]];
    if (currentMin && totalCost > currentMin) return false;
  }

  return totalCost;
};

const findMinFuelCost = (subs, fuelType) => {
  const startingPositionsMap = buildStartingPositions(subs);
  const startingPositions = Object.keys(startingPositionsMap).sort(
    (posA, posB) => parseInt(posA) - parseInt(posB)
  );
  const maxPosition = startingPositions[startingPositions.length - 1];
  let currentMin;
  let potentialMeetingPoint = 0;

  while (potentialMeetingPoint < maxPosition) {
    const cost = calculateFuelCost(
      startingPositionsMap,
      potentialMeetingPoint,
      fuelType,
      currentMin
    );
    if (cost) currentMin = cost;
    potentialMeetingPoint++;
  }

  return currentMin;
};

console.log(findMinFuelCost(crabSubs, 'expensive'));
