export type DIR = "right" | "left" | "down" | "up";

export const STRAIGHT_DIRS: Record<string, DIR> = {
  left: "right",
  right: "left",
  up: "down",
  down: "up",
};

export const NINETY_LEFT: Record<string, DIR> = {
  left: "up",
  up: "right",
  down: "left",
  right: "down",
};

export const NINETY_RIGHT: Record<string, DIR> = {
  left: "down",
  up: "left",
  down: "right",
  right: "up",
};

export const getNewCoord = (
  coord: [number, number],
  direction: DIR
): [number, number] => {
  switch (direction) {
    case "right":
      return [coord[0], coord[1] + 1];
    case "left":
      return [coord[0], coord[1] - 1];
    case "up":
      return [coord[0] - 1, coord[1]];
    case "down":
      return [coord[0] + 1, coord[1]];

    default:
      return coord;
  }
};
