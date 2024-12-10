const inputParser = require("../../inputParser.ts");
const inputLines = inputParser("day-9.txt", "text");

const sample = "2333133121414131402";

const makeArray = (input: string) => {
  let id = 0;
  const array: string[] = [];

  input.split("").forEach((char, i) => {
    const size = Number(char);

    for (let step = 0; step < size; step++) {
      array.push(i % 2 === 0 ? id.toString() : ".");
    }

    if (i % 2 === 0) id++;
  });

  return array;
};

const findNextIdx = (array: string[], startIdx: number) => {
  let newIdx = startIdx;
  while (array[newIdx] === ".") newIdx--;

  return newIdx;
};

const compactArray = (array: string[]) => {
  const newArray: string[] = [];
  let endIdx = findNextIdx(array, array.length - 1);
  array.forEach((char, i) => {
    if (i <= endIdx) {
      if (char === ".") {
        newArray.push(array[endIdx]);
        endIdx = findNextIdx(array, endIdx - 1);
      } else {
        newArray.push(char);
      }
    }
  });

  return newArray;
};

const calculateCheckSum = (array: string[]) => {
  console.log(array);
  return array.reduce((sum, char, i) => {
    if (char !== ".") {
      const subtotal = Number(char) * i;
      return sum + subtotal;
    }
    return sum;
  }, 0);
};

const partOne = (input: string) => {
  const array = makeArray(input);
  const compactedArray = compactArray(array);
  console.log(compactedArray.join(""));
  return calculateCheckSum(compactedArray);
};

const makeSubstringArray = (input: string) => {
  const list: string[] = [];
  let id = 0;

  input.split("").forEach((char, i) => {
    list.push(new Array(Number(char)).fill(i % 2 === 0 ? id : ".").join(","));
    if (i % 2 === 0) id++;
  });

  return list.filter(Boolean);
};

const combineBlanks = (subArray: string[]) => {
  const output: string[] = [];
  subArray.forEach((item) => {
    if (item[0] === "." && output[output.length - 1][0] === ".") {
      console.log(item, output);
      output[output.length - 1] = output[output.length - 1] + "," + item;
    } else {
      output.push(item);
    }
  });
  return output;
};

const compactLeft = (substringArray: string[]) => {
  const output: string[] = [];
  let stringToModify = [...substringArray];

  while (stringToModify.length) {
    const sectionToMove = stringToModify.pop();
    console.log(sectionToMove, sectionToMove?.[0] === ".");
    if (sectionToMove?.[0] === ".") {
      if (output[0]?.[0] === ".") {
        output[0] = output[0] + "," + sectionToMove;
      } else {
        output.unshift(sectionToMove);
      }
    } else {
      const availableSpaceIdx = [...stringToModify].findIndex((subString) => {
        const space = subString.split(",").length;
        const char = subString[0];

        return (
          char === "." && space >= (sectionToMove as string).split(",").length
        );
      });

      if (availableSpaceIdx < 0) {
        output.unshift(sectionToMove as string);
      } else {
        const emptySize = stringToModify[availableSpaceIdx].split(",").length;
        const movingSize = sectionToMove?.split(",").length || 0;

        const extra = new Array(emptySize - movingSize).fill(".").join(",");
        stringToModify = [
          ...stringToModify.slice(0, availableSpaceIdx),
          sectionToMove as string,
          extra,
          ...stringToModify.slice(availableSpaceIdx + 1),
          new Array(movingSize).fill(".").join(","),
        ].filter(Boolean);
      }
    }
  }
  console.log(substringArray.join(","), "|", output.join(","));
  return output.filter(Boolean) as string[];
};

const checkSum = (stringArray: string[]) => {
  let idx = 0;
  let sum = 0;
  stringArray.forEach((string) => {
    string.split(",").forEach((char) => {
      if (char !== ".") {
        const val = idx * Number(char);
        sum += val;
      }
      idx++;
    });
  });

  return sum;
};

console.log(checkSum(compactLeft(makeSubstringArray(inputLines[0]))));
