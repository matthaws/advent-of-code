const seeds = [79, 14, 55, 13];

const seedToSoil = [
  [50, 98, 2],
  [52, 50, 48],
];

const soilToFertilizer = [
  [0, 15, 37],
  [37, 52, 2],
  [39, 0, 15],
];

const fertilizerToWater = [
  [49, 53, 8],
  [0, 11, 42],
  [32, 0, 7],
  [57, 7, 4],
];

const waterToLight = [
  [88, 18, 7],
  [18, 25, 70],
];

const lightToTemperature = [
  [45, 77, 23],
  [81, 45, 19],
  [68, 64, 13],
];

const temperatureToHumidity = [
  [0, 69, 1],
  [1, 0, 69],
];

const humidityToLocation = [
  [60, 56, 37],
  [56, 93, 4],
];

module.exports = {
    seeds,
    seedToSoil,
    soilToFertilizer,
    fertilizerToWater,
    waterToLight,
    lightToTemperature,
    temperatureToHumidity,
    humidityToLocation
}