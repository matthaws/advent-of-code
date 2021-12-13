const buildOrbitMap = orbits =>
  orbits.reduce((map, orbit) => ({ ...map, [orbit[1]]: orbit[0] }), {});

const findNumOrbits = orbits => {
  const orbitsMap = buildOrbitMap(orbits);

  return orbits.reduce((sum, orbit) => {
    let num = sum + 1;
    let orbited = orbitsMap[orbit[1]];
    while (orbitsMap[orbited]) {
      num = num + 1;
      orbited = orbitsMap[orbited];
    }
    return num;
  }, 0);
};

const buildOrbitPath = (orbitsMap, start) => {
  let orbited = orbitsMap[start];
  const path = [orbited];
  while (orbitsMap[orbited]) {
    orbited = orbitsMap[orbited];
    path.push(orbited);
  }
  return path;
};

const findMinOrbitsToSanta = orbits => {
  const orbitsMap = buildOrbitMap(orbits);
  const myOrbitsPath = buildOrbitPath(orbitsMap, "YOU");
  const santasPath = buildOrbitPath(orbitsMap, "SAN");

  const connection = myOrbitsPath.find(orbit => santasPath.indexOf(orbit) > -1);
  const myConnectionIndex = myOrbitsPath.indexOf(connection);
  const santasConnectionIndex = santasPath.indexOf(connection);
  return [
    ...myOrbitsPath.slice(0, myConnectionIndex),
    ...santasPath.slice(0, santasConnectionIndex)
  ].length;
};

const fs = require("fs");
const text = fs.readFileSync("./input.txt", "utf-8");

const orbits = text.split("\n").map(line => line.split(") "));
console.log(orbits.length);
console.log(findMinOrbitsToSanta(orbits));
