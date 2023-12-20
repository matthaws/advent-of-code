const inputParser = require("../../inputParser.ts");
const inputLines = inputParser("day-19.txt", "spaces");

const sampleWorkflow = [
  "px{a<2006:qkq,m>2090:A,rfg}",
  "pv{a>1716:R,A}",
  "lnx{m>1548:A,A}",
  "rfg{s<537:gd,x>2440:R,A}",
  "qs{s>3448:A,lnx}",
  "qkq{x<1416:A,crn}",
  "crn{x>2662:A,R}",
  "in{s<1351:px,qqz}",
  "qqz{s>2770:qs,m<1801:hdj,R}",
  "gd{a>3333:R,R}",
  "hdj{m>838:A,pv}",
];

const parseWorkflow = (workflow: string) => {
  const [name, steps] = workflow.split("{");
  const mappedSteps = steps
    .replace("}", "")
    .split(",")
    .map((step) => {
      if (!step.includes(":")) return [step];
      const [condition, outcome] = step.split(":");
      return [condition, outcome];
    });

  return {
    [name]: mappedSteps,
  };
};

const parseAllWorkflows = (lines: string[]) =>
  lines.reduce((map, line) => ({ ...map, ...parseWorkflow(line) }), {});

const sampleParts = [
  "{x=787,m=2655,a=1222,s=2876}",
  "{x=1679,m=44,a=2067,s=496}",
  "{x=2036,m=264,a=79,s=2244}",
  "{x=2461,m=1339,a=466,s=291}",
  "{x=2127,m=1623,a=2188,s=1013}",
];

const parsePart = (line: string) =>
  line
    .replace("{", "")
    .replace("}", "")
    .split(",")
    .reduce((map, line) => {
      const [name, value] = line.split("=");
      return {
        ...map,
        [name]: Number(value),
      };
    }, {} as Record<string, number>);

const followSteps = (part: Record<string, number>, steps: string[]) => {
    
  for (let i = 0; i < steps.length; i++) {
    const condition = steps[i][0];
    const destination = steps[i][1];
    if (!condition.includes("<") && !condition.includes(">")) {
      return condition;
    }
    if (condition.includes("<")) {
      const [val, num] = condition.split("<");
      if (part[val] < Number(num)) return destination;
    }
    const [val, num] = condition.split(">");
    if (part[val] > Number(num)) return destination;
  }
};

const isPartAccepted = (
  part: Record<string, number>,
  workflow: Record<string, string[]>
) => {
  let currentFlow = "in";

  while (currentFlow !== "A" && currentFlow !== "R") {
    const currentFlowSteps = workflow[currentFlow];
    console.log(currentFlow, currentFlowSteps)
    currentFlow = followSteps(part, currentFlowSteps) as string;
  }

  return currentFlow === "A" ? true : false;
};

const partOne = (rawFlow: string[], rawParts: string[]) => {
  const workflow = parseAllWorkflows(rawFlow);
  const parts = rawParts.map(parsePart);
  const acceptedParts = parts.filter((part) => isPartAccepted(part, workflow));
  return acceptedParts.reduce(
    (sum, part) =>
      sum + Object.values(part).reduce((partSum, val) => partSum + val),
    0
  );
};

console.log(partOne(inputLines.slice(0, 535), inputLines.slice(535)));
// console.log(inputLines.slice(535))
