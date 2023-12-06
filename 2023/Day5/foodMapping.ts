const inputs = require("../inputs/day-5");

type Mapping = number[][];

const findSourceToDestinationMapping = (
  sourceNum: number,
  mapping: Mapping
) => {
  const map = mapping.find(([destinationStart, sourceRangeStart, length]) => {
    const sourceRangeEnd = sourceRangeStart + length - 1;
    if (sourceNum >= sourceRangeStart && sourceNum <= sourceRangeEnd)
      return true;
    return false;
  });

  if (map) {
    const [destinationStart, sourceRangeStart, length] = map;
    const diff = sourceNum - sourceRangeStart;
    const destinationNum = destinationStart + diff;

    return destinationNum;
  } else {
    return sourceNum;
  }
};

type Seed = {
  soil: number;
  fertilizer: number;
  water: number;
  light: number;
  temp: number;
  humidity: number;
  location: number;
};

const findLocationFromSeed = (seedNum: number) => {
  const {
    seedToSoil,
    soilToFertilizer,
    fertilizerToWater,
    waterToLight,
    lightToTemperature,
    temperatureToHumidity,
    humidityToLocation,
  } = inputs;
  const soil = findSourceToDestinationMapping(seedNum, seedToSoil);
  const fertilizer = findSourceToDestinationMapping(soil, soilToFertilizer);
  const water = findSourceToDestinationMapping(fertilizer, fertilizerToWater);
  const light = findSourceToDestinationMapping(water, waterToLight);
  const temp = findSourceToDestinationMapping(light, lightToTemperature);
  const humidity = findSourceToDestinationMapping(temp, temperatureToHumidity);
  const location = findSourceToDestinationMapping(humidity, humidityToLocation);

  return location;
};

const findLowestLocation = (inputSeeds: number[]) => {
  const mappedSeeds = inputSeeds.map((seedNum) =>
    findLocationFromSeed(seedNum)
  );
  return Math.min(...mappedSeeds);
};

// PART TWO

const findDestinationToSourceMapping = (
  destinationNum: number,
  mapping: Mapping
) => {
  const map = mapping.find(([destinationStart, sourceRangeStart, length]) => {
    const destinationRangeEnd = destinationStart + length - 1;

    return (
      destinationNum >= destinationStart &&
      destinationNum <= destinationRangeEnd
    );
  });

  if (map) {
    const [destinationStart, sourceRangeStart, length] = map;
    const diff = destinationNum - destinationStart;
    const sourceNum = sourceRangeStart + diff;
    return sourceNum;
  } else {
    return destinationNum;
  }
};

const findSeedFromLocation = (locationNum: number) => {
  const {
    seedToSoil,
    soilToFertilizer,
    fertilizerToWater,
    waterToLight,
    lightToTemperature,
    temperatureToHumidity,
    humidityToLocation,
  } = inputs;

  const humidity = findDestinationToSourceMapping(
    locationNum,
    humidityToLocation
  );
  const temp = findDestinationToSourceMapping(humidity, temperatureToHumidity);
  const light = findDestinationToSourceMapping(temp, lightToTemperature);
  const water = findDestinationToSourceMapping(light, waterToLight);
  const fertilizer = findDestinationToSourceMapping(water, fertilizerToWater);
  const soil = findDestinationToSourceMapping(fertilizer, soilToFertilizer);

  const seed = findDestinationToSourceMapping(soil, seedToSoil);
  return seed;
};

const isSeedInRange = (seed: number, inputSeeds: number[]) => {
  for (let i = 0; i < inputSeeds.length; i = i + 2) {
    const [start, length] = [inputSeeds[i], inputSeeds[i + 1]];
    if (seed >= start && seed < start + length) return true;
  }

  return false;
};

const findLowestLocationWithSeedRanges = (inputSeeds: number[]) => {
  let i = 0;
  let seed = 0;
  while (!isSeedInRange(seed, inputSeeds)) {
    i = i + 1000;
    seed = findSeedFromLocation(i);
    console.log("location ", i, " : seed ", seed);
  }

  let j = i - 2000;
  seed = 0;
  while (!isSeedInRange(seed, inputSeeds)) {
    j++;
    seed = findSeedFromLocation(j);
    console.log("location ", j, " : seed ", seed);
  }

  return j;
};

// console.log(findLowestLocation(inputs.seeds));
console.log(findLowestLocationWithSeedRanges(inputs.seeds));
