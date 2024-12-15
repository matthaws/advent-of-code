const inputParser = require("../../inputParser.ts");
const inputLines = inputParser("day-14.txt", "text");

const maxX = 101;
const maxY = 103;

type Robot = {
  position: [number, number];
  velocity: [number, number];
};

const parseLine = (line: string): Robot => {
  const [pos, vel] = line.split(" ");
  const position = pos.split("=")[1].split(",").map(Number) as [number, number];
  const velocity = vel.split("=")[1].split(",").map(Number) as [number, number];
  return { position, velocity };
};

const parseInput = (input: string[]) => input.map(parseLine);

const handleWrapping = (posVal: number, max: number) => {
  if (posVal < 0) {
    return max + posVal;
  } else if (posVal >= max) {
    return posVal - max;
  }

  return posVal;
};

const simulateSecond = (robots: Robot[]) =>
  robots.map((robot) => {
    const newRobotX = robot.position[0] + robot.velocity[0];
    const newRobotY = robot.position[1] + robot.velocity[1];

    return {
      velocity: robot.velocity,
      position: [
        handleWrapping(newRobotX, maxX),
        handleWrapping(newRobotY, maxY),
      ] as [number, number],
    };
  });

const simulateNSeconds = (robots: Robot[], seconds: number) => {
  let newRobots: Robot[] = robots;
  for (let i = 0; i < seconds; i++) {
    newRobots = simulateSecond(newRobots);
  }
  return newRobots;
};

const countQuadrants = (robots: Robot[]) => {
  const midX = Math.floor(maxX / 2);
  const midY = Math.floor(maxY / 2);
  const upperLeft: Robot[] = [];
  const upperRight: Robot[] = [];
  const lowerLeft: Robot[] = [];
  const lowerRight: Robot[] = [];

  robots.forEach((robot) => {
    if (robot.position[0] > midX) {
      if (robot.position[1] < midY) upperRight.push(robot);
      if (robot.position[1] > midY) lowerRight.push(robot);
    }
    if (robot.position[0] < midX) {
      if (robot.position[1] < midY) upperLeft.push(robot);
      if (robot.position[1] > midY) lowerLeft.push(robot);
    }
  });

  return { upperLeft, upperRight, lowerLeft, lowerRight };
};

const findUpperSymmetry = (upperLeft: Robot[], upperRight: Robot[]) => {
  const upperLeftSet = new Set(upperLeft.map((robot) => robot.position));
  const upperRightSet = new Set(upperRight.map((robot) => robot.position));
  const midX = Math.floor(maxX / 2);
  const midY = Math.floor(maxY / 2);
  let i = midX;
  let j = 0;
  while (j < midY) {
    const expectedLeft = [midX - i, j] as [number, number];
    const expectedRight = [midX + i, j] as [number, number];
    if (!upperLeftSet.has(expectedLeft) || !upperRightSet.has(expectedRight)) {
      return false;
    }
  }
  return true;
};

const findChristmasTreeStart = (robots: Robot[]) => {
  const robotsInFirstRow = robots.filter((robot) => robot.position[0] === 0);
  if (robotsInFirstRow.length !== 1) return false;

  const midX = Math.floor(maxX / 2);

  return robotsInFirstRow[0].position.join(":") === `${midX}:0`;
};

const partOne = (input: string[]) => {
  const robots = parseInput(input);
  const result = simulateNSeconds(robots, 100);

  const quads = countQuadrants(result);
  return Object.values(quads).reduce((answer, quad) => answer * quad.length, 1);
};

const partTwo = (input: string[]) => {
  let currentState = parseInput(input);
  let i = 0;

  while (currentState) {
    i++;
    currentState = simulateSecond(currentState);
    const quads = countQuadrants(currentState);
    if (findChristmasTreeStart(currentState)) {
      return [i, quads];
    }
  }
};

console.log(partTwo(inputLines));
