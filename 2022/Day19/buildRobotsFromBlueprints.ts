import { Blueprint, RobotCost, RobotType } from "./parseBlueprints";

const inputParser = require("../inputParser.ts");
const blueprintInput = inputParser("day-19.txt", "text");
const { parseBlueprints } = require("./parseBlueprints.ts");

const ORDER: RobotType[] = ["geode", "obsidian", "clay", "ore"];

type Count = Record<RobotType, number>;

const howManyGeodesInXMinutes = (blueprint: Blueprint, numMinutes: number) => {
  const currentResources: Count = {
    ore: 0,
    clay: 0,
    obsidian: 0,
    geode: 0,
  };
  const completedRobots: Count = {
    ore: 1,
    clay: 0,
    obsidian: 0,
    geode: 0,
  };
  let minutes = 0;
  while (minutes < numMinutes) {
    const newRobots: Count = {
      ore: 0,
      clay: 0,
      obsidian: 0,
      geode: 0,
    };
    ORDER.forEach((resource) => {
      const {
        ore = 0,
        clay = 0,
        obsidian = 0,
      }: RobotCost = blueprint[resource];
      if (resource === "geode")
        console.log(blueprint[resource], currentResources);
      if (
        currentResources.ore >= ore &&
        currentResources.clay >= clay &&
        currentResources.obsidian >= obsidian
      ) {
        newRobots[resource] += 1;
        currentResources.ore = currentResources.ore - ore;
        currentResources.clay = currentResources.clay - clay;
        currentResources.obsidian = currentResources.obsidian - obsidian;
      }
      currentResources[resource] += completedRobots[resource];
    });
    completedRobots.ore += newRobots.ore;
    completedRobots.clay += newRobots.clay;
    completedRobots.obsidian += newRobots.obsidian;
    completedRobots.geode += newRobots.geode;

    minutes++;
  }
  return currentResources.geode;
};

const testBlueprint: Blueprint = {
  id: 1,
  ore: {
    ore: 4,
  },
  clay: {
    ore: 2,
  },
  obsidian: {
    ore: 3,
    clay: 14,
  },
  geode: {
    ore: 2,
    obsidian: 7,
  },
};

console.log(howManyGeodesInXMinutes(testBlueprint, 24));
