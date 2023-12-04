const inputParser = require('../../inputParser.ts');
const realInput = inputParser('day-14.txt', 'string');

type Template = string;
type Instructions = Record<string, string>;
type CountMap = Record<string, number>;

const parseInsertionInstructions = (
  input: string[]
): [Template, Instructions] => {
  const template = input[0];
  const instructions = input.slice(1).reduce((instructionMap, line) => {
    const [pair, insertionValue] = line.split(' -> ');
    return {
      ...instructionMap,
      [pair]: insertionValue,
    };
  }, {});
  return [template, instructions];
};

class PairNode {
  pair: string;
  insertedChar: string;
  connections: PairNode[];
  scoreMemo: Record<string, CountMap>;

  constructor(pair: string, insertedChar: string) {
    this.pair = pair;
    this.insertedChar = insertedChar;
    this.connections = [];
    this.scoreMemo = {};
    const [first, second] = pair.split('');
    this.setMemo(
      1,
      [first, second, insertedChar].reduce(
        (count, char) => ({
          ...count,
          [char]: count[char] ? count[char] + 1 : 1,
        }),
        {} as CountMap
      )
    );
  }

  getConnections() {
    return this.connections;
  }

  addConnection(node: PairNode) {
    this.connections.push(node);
  }

  setMemo(num: number, score: CountMap) {
    this.scoreMemo[num] = score;
  }

  getMemo(num: number): CountMap {
    return this.scoreMemo[num];
  }
}

type PairsMap = Record<string, PairNode>;

const buildNetwork = (instructions: Instructions) => {
  const pairsMap: PairsMap = Object.keys(instructions).reduce(
    (map, instruction) => ({
      ...map,
      [instruction]: new PairNode(instruction, instructions[instruction]),
    }),
    {}
  );
  Object.entries(pairsMap).forEach(
    ([instruction, node]: [string, PairNode]) => {
      const [first, second] = instruction.split('');
      const insertedChar = instructions[instruction];
      const resultingPairs = [
        `${first}${insertedChar}`,
        `${insertedChar}${second}`,
      ];
      resultingPairs.forEach((pair) => {
        if (pairsMap[pair]) {
          node.addConnection(pairsMap[pair]);
        }
      });
    }
  );
  return pairsMap;
};

const combineScores = (scoreA: CountMap, scoreB: CountMap) => {
  const allInA = Object.fromEntries(
    Object.entries(scoreA).map(([char, num]) => [
      char,
      scoreB[char] ? scoreB[char] + num : num,
    ])
  );
  const allJustInB = Object.fromEntries(
    Object.entries(scoreB).filter(([char]) => !scoreA[char])
  );
  return {
    ...allInA,
    ...allJustInB,
  };
};

const buildToNumIterations = (pairMap: PairsMap, numIterations: number) => {
  let i = 2;
  while (i <= numIterations) {
    Object.entries(pairMap).forEach(([pair, pairNode]) => {
      const [scoreA, scoreB] = pairNode
        .getConnections()
        .map((node) => node.getMemo(i - 1));
      const score = combineScores(scoreA, scoreB);
      pairNode.setMemo(i, {
        ...score,
        [pairNode.insertedChar]: score[pairNode.insertedChar] - 1,
      });
    });
    i++;
  }
  return pairMap;
};

const letsDoThis = (input: string[], numInterations: number) => {
  const [template, instructions] = parseInsertionInstructions(input);
  const pairMap = buildNetwork(instructions);
  const pairMapWithMemos = buildToNumIterations(pairMap, numInterations);

  const finalScore = template.split('').reduce((scores, char, idx) => {
    const pair = `${char}${template[idx + 1]}`;
    if (!pairMap[pair])
      return idx === template.length - 1
        ? { ...scores, [char]: scores[char] + 1 }
        : scores;
    const subScore = pairMapWithMemos[pair].getMemo(numInterations);

    return combineScores(scores, {
      ...subScore,
      [template[idx + 1]]: subScore[template[idx + 1]] - 1,
    });
  }, {} as CountMap);

  const sortedScores = Object.values(finalScore).sort(
    (valA, valB) => valA - valB
  );

  return sortedScores[sortedScores.length - 1] - sortedScores[0];
};

console.log(letsDoThis(realInput, 40));
