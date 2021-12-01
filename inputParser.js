const fs = require("fs");

const parseInput = (fileName, type) => {
  const text = fs.readFileSync(`inputs/${fileName}`, "utf-8");
  const inputLines = text.split("\n").filter(Boolean);
  return type === "number" ? inputLines.map(Number) : inputLines;
};

module.exports = parseInput;
