const inputParser = require("../inputParser.ts");
const packageInput = inputParser("day-2.txt", "text");

const parsePackageInput = () => {
  return packageInput.map((pack: string) => pack.split("x").map(Number));
};

const measurePackage = ([l, w, h]: number[]) => {
  const sideA = l * w;
  const sideB = w * h;
  const sideC = l * h;

  return 2 * sideA + 2 * sideB + 2 * sideC + Math.min(sideA, sideB, sideC);
};

const measureAllPackages = () => {
  const packs = parsePackageInput();
  console.log(packs);
  return packs.reduce(
    (sum: number, pack: number[]) => sum + measurePackage(pack),
    0
  );
};

const measureRibbon = ([l, w, h]: number[]) => {
  const smallestSides = [l, w, h].sort((a, b) => a - b).slice(0, 2);
  const perimeter =
    smallestSides[0] + smallestSides[0] + smallestSides[1] + smallestSides[1];
  const bow = l * w * h;
  return perimeter + bow;
};

const measureAllBows = () => {
  const packs = parsePackageInput();
  console.log(packageInput);
  return packs.reduce(
    (sum: number, pack: number[]) => sum + measureRibbon(pack),
    0
  );
};

console.log(measureAllBows());
