// x=201..230, y=-99..-65

// The probe's x position increases by its x velocity.
// The probe's y position increases by its y velocity.
// Due to drag, the probe's x velocity changes by 1 toward the value 0; that is, it decreases by 1 if it is greater than 0, increases by 1 if it is less than 0, or does not change if it is already 0.
// Due to gravity, the probe's y velocity decreases by 1.

const [minTargetX, maxTargetX, minTargetY, maxTargetY]: number[] = [
  201, 230, -99, -65,
];

const isPosPastTarget = (x: number, y: number): boolean =>
  x > maxTargetX || y < minTargetY;
const isPosInTarget = (x: number, y: number): boolean =>
  x >= minTargetX && x <= maxTargetX && y >= minTargetY && y <= maxTargetY;

const fireZeMissile = (xVelocity: number, yVelocity: number): number[][] => {
  let currentX = 0;
  let currentY = 0;
  let currentXVel = xVelocity;
  let currentYVel = yVelocity;
  const path = [[0, 0]];

  while (!isPosPastTarget(currentX, currentY)) {
    // console.log({ currentX, currentXVel, currentY, currentYVel });
    if (isPosInTarget(currentX, currentY)) {
      console.log(
        'A HIT; A PALPABLE HIT!',
        console.log({ xVelocity, yVelocity })
      );
      return path;
    }
    currentX = currentX + currentXVel;
    currentY = currentY + currentYVel;
    currentXVel =
      currentXVel > 0
        ? currentXVel - 1
        : currentXVel < 0
        ? currentXVel + 1
        : currentXVel;
    currentYVel = currentYVel - 1;
    path.push([currentX, currentY]);
  }
  return [];
};

const findHighestY = (path: number[][]): number =>
  Math.max(...path.map((pos: number[]): number => pos[1]));

const fireAllZeMissles = () => {
  let count: number = 0;

  for (let x = 0; x < 300; x++) {
    let y: number = -1000;
    let path: number[][] = [];
    while (y < 10000) {
      y++;
      path = fireZeMissile(x, y);
      if (path.length > 0) count++;
    }
  }
  return count;
};

console.log(fireAllZeMissles());
