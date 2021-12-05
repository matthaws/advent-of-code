const parseBingoBoards = (input) => {
  const calledNumbers = input[0].split(",").map(Number);
  const bingoBoards = [];
  let rowNum = 0;
  const finalBoard = input.slice(2).reduce((currentBoard, line) => {
    if (!line) {
      bingoBoards.push(currentBoard);
      rowNum = 0;
      return {};
    }

    const newLine = line
      .split(" ")
      .filter(Boolean)
      .map(Number)
      .reduce(
        (parsedLine, number, idx) => ({
          ...parsedLine,
          [`${rowNum},${idx}`]: { value: number, selected: false },
        }),
        {}
      );

    rowNum = rowNum + 1;
    return {
      ...currentBoard,
      ...newLine,
    };
  }, {});

  bingoBoards.push(finalBoard);

  return {
    calledNumbers,
    bingoBoards: bingoBoards.filter((board) => Object.keys(board).length > 0),
  };
};

module.exports = parseBingoBoards;
