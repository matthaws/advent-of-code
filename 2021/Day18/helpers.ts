const findFirstRegularNumberInDirection = (
  snailfishNumber: string,
  index: number,
  direction: 'right' | 'left'
): number => {
  if (direction === 'left') {
    for (let i = index - 1; i > 0; i = i - 1) {
      //   console.log('left', i);
      if (!isNaN(Number(snailfishNumber[i]))) return i;
    }
  } else {
    for (let i = index + 1; i < snailfishNumber.length; i++) {
      // console.log('right', i);
      if (!isNaN(Number(snailfishNumber[i]))) return i;
    }
  }
  return -1;
};

const replaceIndex = (
  snailfishNumber: string,
  newVal: number,
  index: number
): string => {
  const isDoubleDigit = !isNaN(Number(snailfishNumber[index + 1]));
  return (
    snailfishNumber.substring(0, index) +
    newVal.toString() +
    snailfishNumber.substring(index + (isDoubleDigit ? 2 : 1))
  );
};

const explode = (
  snailfishNumber: string,
  indexOfExplodingPairStart: number,
  indexOfExplodingPairEnd: number
): string => {
  let newNumber = snailfishNumber;
  // console.log(
  //   snailfishNumber.slice(
  //     indexOfExplodingPairStart,
  //     indexOfExplodingPairEnd + 1
  //   )
  // );
  const { explodingPair } = JSON.parse(
    `{ "explodingPair": ${snailfishNumber.slice(
      indexOfExplodingPairStart,
      indexOfExplodingPairEnd + 1
    )}}`
  );
  const [x, y] = explodingPair;
  // find first regular number to left and add
  const indexOfNumberToLeft = findFirstRegularNumberInDirection(
    newNumber,
    indexOfExplodingPairStart,
    'left' as const
  );
  let offset = 0;
  if (indexOfNumberToLeft > 0) {
    const newVal = isNaN(Number(newNumber[indexOfNumberToLeft + 1]))
      ? Number(newNumber[indexOfNumberToLeft]) + x
      : Number(newNumber.slice(indexOfNumberToLeft, indexOfNumberToLeft + 2)) +
        x;

    if (newVal > 9) {
      offset = 1;
    }
    newNumber = replaceIndex(newNumber, newVal, indexOfNumberToLeft);
  }
  // find first regular number to right and add
  const indexOfNumberToRight = findFirstRegularNumberInDirection(
    newNumber,
    indexOfExplodingPairStart + 5,
    'right' as const
  );

  if (indexOfNumberToRight > 0) {
    const newVal = isNaN(Number(newNumber[indexOfNumberToRight + 1]))
      ? Number(newNumber[indexOfNumberToRight]) + y
      : Number(
          newNumber.slice(indexOfNumberToRight, indexOfNumberToRight + 2)
        ) + y;
    newNumber = replaceIndex(newNumber, newVal, indexOfNumberToRight);
  }
  // replace exploding pair with 0
  console.log({
    indexOfNumberToLeft,
    indexOfNumberToRight,
    indexOfExplodingPairStart,
    indexOfExplodingPairEnd,
  });
  console.log({
    snailfishNumber,
    newNumber,
    left: newNumber.substring(0, indexOfExplodingPairStart + offset),
    right: newNumber.substring(indexOfExplodingPairEnd + offset + 1),
    offset,
  });
  return (
    newNumber.substring(0, indexOfExplodingPairStart + offset) +
    '0' +
    newNumber.substring(indexOfExplodingPairEnd + offset + 1)
  );
};

const split = (
  snailfishNumber: string,
  indexOfNumberToSplit: number
): string => {
  const number = Number(
    snailfishNumber.slice(indexOfNumberToSplit, indexOfNumberToSplit + 2)
  );
  const newLeft = Math.floor(number / 2);
  const newRight = Math.ceil(number / 2);

  console.log({ number, newRight, newLeft });
  console.log({
    snailfishNumber,
    left: snailfishNumber.substring(0, indexOfNumberToSplit),
    newNum: `[${newLeft},${newRight}]`,
    right: snailfishNumber.substring(indexOfNumberToSplit + 2),
  });

  return (
    snailfishNumber.substring(0, indexOfNumberToSplit) +
    `[${newLeft},${newRight}]` +
    snailfishNumber.substring(indexOfNumberToSplit + 2)
  );
};

const getMagnitude = (snailfishNumber: string): number => {
  const { parsedNumber } = JSON.parse(`{ "parsedNumber": ${snailfishNumber}}`);
  const [left, right] = parsedNumber;
  const leftMagnitude = Array.isArray(left)
    ? getMagnitude(JSON.stringify(left))
    : left;
  const rightMagnitude = Array.isArray(right)
    ? getMagnitude(JSON.stringify(right))
    : right;

  return 3 * leftMagnitude + 2 * rightMagnitude;
};

module.exports = {
  explode,
  split,
  getMagnitude,
};
