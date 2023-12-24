const inputParser = require("../../inputParser.ts");
const inputLines = inputParser("day-20.txt", "text");

const sampleOne = [
  "broadcaster -> a, b, c",
  "%a -> b",
  "%b -> c",
  "%c -> inv",
  "&inv -> a",
];

const sampleTwo = [
  "broadcaster -> a",
  "%a -> inv, con",
  "&inv -> b",
  "%b -> con",
  "&con -> output",
];

type Signal = "high" | "low";

class FlipFlop {
  value: boolean;
  outputs: string[];
  name: string;

  constructor(name: string, outputs: string[]) {
    this.value = false;
    this.outputs = outputs;
    this.name = name;
  }

  addInput(inputName: string) {}

  receive(inputName: string, signal: Signal) {
    if (signal === "low") {
      const sendValue = !this.value ? "high" : "low";
      this.value = !this.value;
      return this.outputs.map((output) => [this.name, output, sendValue]);
    }
    return [];
  }
}

class Conjunction {
  name: string;
  inputs: { name: string; value: Signal }[];
  outputs: string[];
  constructor(name: string, outputs: string[]) {
    this.name = name;
    this.inputs = [];
    this.outputs = outputs;
  }

  addInput(inputName: string) {
    this.inputs.push({ name: inputName, value: "low" });
  }

  receive(inputName: string, signal: Signal) {
    this.inputs = this.inputs.map(({ name, value }) =>
      name === inputName ? { name, value: signal } : { name, value }
    );
    const outputValue = this.inputs.every(({ value }) => value === "high")
      ? "low"
      : "high";

    return this.outputs.map((output) => [this.name, output, outputValue]);
  }
}

class Broadcaster {
  name: string;
  outputs: string[];

  constructor(name: string, outputs: string[]) {
    this.name = name;
    this.outputs = outputs;
  }

  addInput(inputName: string) {}

  receive(inputName: string, signal: Signal) {
    return this.outputs.map((output) => [this.name, output, signal]);
  }
}

const parseNodes = (input: string[]) => {
  const allNodes = input.reduce((map, line) => {
    const [name, outputs] = line.split(" -> ");
    const parsedOutputs = outputs.split(", ");
    let instance = new Broadcaster(name, parsedOutputs);

    if (name.startsWith("%")) {
      instance = new FlipFlop(name.slice(1), parsedOutputs);
    }
    if (name.startsWith("&")) {
      instance = new Conjunction(name.slice(1), parsedOutputs);
    }
    map[instance.name] = instance;
    return map;
  }, {} as Record<string, any>);

  Object.values(allNodes).forEach((node) => {
    node.outputs.forEach((output: any) => {
      if (allNodes[output]) allNodes[output].addInput(node.name);
    });
  });

  return allNodes;
};

const pushButtonXTimes = (times: number, partTwo = false) => {
  const allNodes = parseNodes(inputLines);

  const queue = [["button", "broadcaster", "low"]];
  let highs = 0;
  let lows = 0;
  let timesPressed = 1;
  let rxSignals: string[] = [];
  while (queue.length > 0) {
    const signal = queue.shift();
    const [inputName, outputName, signalVal] = signal || [];
    const targetNode = outputName && allNodes[outputName];
    if (outputName === "rx") rxSignals.push(signalVal);
    if (signalVal === "high") highs++;
    if (signalVal === "low") lows++;
    if (targetNode) {
      //   console.log(inputName, "sends", signalVal, "to", outputName);
      const newSignals = targetNode.receive(inputName, signalVal);
      newSignals.forEach((nextSignal: any) => {
        queue.push(nextSignal);
      });
    }

    if (queue.length === 0) {
      console.log(
        "queue empty, pressing button for the",
        timesPressed + 1,
        "time"
      );
      if (partTwo) {
        console.log(rxSignals.length);
        if (rxSignals.length === 1 && rxSignals[0] === "low") {
          return timesPressed;
        } else {
          rxSignals = [];
          queue.push(["button", "broadcaster", "low"]);
          timesPressed++;
        }
      } else {
        if (timesPressed < times) {
          queue.push(["button", "broadcaster", "low"]);
          timesPressed++;
        }
      }
    }
  }

  return [lows, highs, lows * highs];
};

console.log(pushButtonXTimes(1000, true));
