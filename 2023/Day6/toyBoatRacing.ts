const input: [number, number][] = [
  [45, 295],
  [98, 1734],
  [83, 1278],
  [73, 1210],
];

const findNumWaysToBeatRecord = ([time, record]: [number, number]) => {
  const winningTimes: number[] = [];
  for (let holdTime = 1; holdTime < time; holdTime++) {
    const speed = holdTime;
    const distance = (time - holdTime) * speed;

    if (distance > record) winningTimes.push(distance);
  }

  return winningTimes.length;
};

const findProductOfNumWins = (races: [number, number][]) =>
  races.reduce((product, race) => product * findNumWaysToBeatRecord(race), 1);

console.log(findProductOfNumWins(input));
console.log(findNumWaysToBeatRecord([45988373, 295173412781210]))