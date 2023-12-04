const parseDay22Input = require('../../inputParser.ts');
const cubitInstructions = parseDay22Input('day-22.txt', 'string');

const parseLine = (
  line: string
): { ranges: Record<string, Record<string, number>>; state: string } => {
  const [state, range] = line.split(' ');
  const ranges = range.split(',').reduce((allRanges, currentRange) => {
    const [axis, numberRange] = currentRange.split('=');
    const [min, max] = numberRange.split('..').map(Number);
    return {
      ...allRanges,
      [axis]: {
        min,
        max,
      },
    };
  }, {});

  return {
    ranges,
    state,
  };
};

const isOutOfBounds = (axisRange: Record<string, number>): boolean =>
  axisRange.min < -50 || axisRange.max > 50;

const followInstructions = (instructions: string[]) => {
  const grid: Record<string, string> = {};
  instructions.forEach((line, idx) => {
    const { state, ranges } = parseLine(line);
    console.log('executing line', idx)
    for (let x = ranges.x.min; x <= ranges.x.max; x++) {
      for (let y = ranges.y.min; y <= ranges.y.max; y++) {
        for (let z = ranges.z.min; z <= ranges.z.max; z++) {
          const key: string = `${x},${y},${z}`;
          grid[key] = state;
        }
      }
    }
  });

  return Object.values(grid).filter((val) => val === 'on').length;
};

console.log(followInstructions(cubitInstructions));
