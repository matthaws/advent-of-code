const parseDay20Input = require('../../inputParser.ts');
const input = parseDay20Input('day-20.txt', 'string');

const convertImage = (image: string[]): Record<string, string> => {
  const grid: Record<string, string> = {};

  for (let rowNum = 0; rowNum < image.length; rowNum++) {
      const row = image[rowNum]
    for (let colNum = 0; colNum < row.length; colNum++) {
        grid[`${rowNum},${colNum}`] = row[colNum]
    }
  }

  return grid;
};

const findCurrentGridBoundary = (
  grid: Record<string, string>
): {
  maxX: number;
  maxY: number;
  minX: number;
  minY: number;
} => {
  let maxX: number = 0;
  let maxY: number = 0;
  let minX: number = 0;
  let minY: number = 0;

  Object.keys(grid).forEach((key) => {
    const [x, y] = key.split(',').map(Number);
    if (x > maxX) maxX = x;
    if (x < minX) minX = x;
    if (y > maxY) maxY = y;
    if (y < minY) minY = y;
  });
  return {
    maxX,
    maxY,
    minX,
    minY,
  };
};

const diffs = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 0],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

const findAdjacentPositions = (x: number, y: number): number[][] =>
  diffs.map(([diffX, diffY]) => [x + diffX, y + diffY]);

const enhanceImage = (
  imageGrid: Record<string, string>,
  algorithm: string,
  defaultCharacter: string
): Record<string, string> => {
  const { maxX, maxY, minX, minY } = findCurrentGridBoundary(imageGrid);
  const startX: number = minX - 2;
  const startY: number = minY - 2;
  const newImage: Record<string, string> = {};
  for (let x = startX; x < maxX + 2; x++) {
    for (let y = startY; y < maxY + 2; y++) {
      const pos = `${x},${y}`;
      const binaryNumber = findAdjacentPositions(x, y)
        .map(([posX, posY]) => {
          return imageGrid[`${posX},${posY}`] || defaultCharacter;
        })
        .map((char) => (char === '.' ? '0' : '1'))
        .join('');
      newImage[pos] = algorithm[parseInt(binaryNumber, 2)];
    }
  }

  return newImage;
};

const renderImage = (imageGrid: Record<string, string>) => {
  const { maxX, maxY, minX, minY } = findCurrentGridBoundary(imageGrid);
  const render = [];
  for (let x = minX; x < maxX + 2; x++) {
    let row = [];
    for (let y = minY; y < maxY + 2; y++) {
      row.push(imageGrid[`${x},${y}`]);
    }
    render.push(row.join(''));
  }
  console.log(render.join('\n'));
};

const parseImage = (inputLines: string[], numTimesToEnhance: number): number => {
  const algorithm = inputLines[0];
  let image = convertImage(inputLines.slice(1));

  for (let count = 1; count <= numTimesToEnhance; count++) {
      console.log(count)
      image = enhanceImage(image, algorithm, count % 2 === 1 ? "." : "#")
  }


  return Object.values(image).filter((char) => char === '#').length;
};

console.log(parseImage(input, 50));
