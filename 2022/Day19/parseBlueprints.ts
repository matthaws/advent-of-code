export interface RobotCost {
  ore?: number;
  clay?: number;
  obsidian?: number;
}

export interface Blueprint {
  id: number;
  ore: RobotCost;
  clay: RobotCost;
  obsidian: RobotCost;
  geode: RobotCost;
}

export type RobotType = "ore" | "clay" | "obsidian" | "geode";

const parseBlueprints = (input: string[]): Blueprint[] =>
  input.reduce((blueprints, line) => {
    const matches = line.match(/\d+/g)?.map(Number);
    const [
      id,
      oreRobotOreCost,
      clayRobotOreCost,
      obsidianRobotOreCost,
      obsidianRobotClayCost,
      geodeRobotOreCost,
      geodeRobotObsidianCost,
    ] = matches as number[];
    return [
      ...blueprints,
      {
        id,
        ore: {
          ore: oreRobotOreCost,
        },
        clay: {
          ore: clayRobotOreCost,
        },
        obsidian: {
          ore: obsidianRobotOreCost,
          clay: obsidianRobotClayCost,
        },
        geode: {
          ore: geodeRobotOreCost,
          obsidian: geodeRobotObsidianCost,
        },
      },
    ];
  }, [] as Blueprint[]);

module.exports = {
  parseBlueprints,
};
