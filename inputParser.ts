const fs = require("fs");

type inputTypes = "number" | "number-array" | "spaces" | "text";

const parseInput = (
  fileName: string,
  type: inputTypes
): string[] | number[] => {
  const text = fs.readFileSync(`../inputs/${fileName}`, "utf-8");
  const inputLines = text.split("\n");
  return type === "number"
    ? inputLines.filter(Boolean).map(Number)
    : type === "number-array"
    ? inputLines.filter(Boolean).map((line: string) => line.split(" ").map(Number))
    : type === "spaces"
    ? inputLines
    : inputLines.filter(Boolean);
};

module.exports = parseInput;
