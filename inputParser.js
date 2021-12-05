const fs = require("fs");

const parseInput = (fileName, type) => {
  const text = fs.readFileSync(`inputs/${fileName}`, "utf-8");
  const inputLines = text.split("\n");
  return type === "number"
    ? inputLines.filter(Boolean).map(Number)
    : type === "spaces"
    ? inputLines
    : inputLine.filter(Boolean);
};

module.exports = parseInput;
