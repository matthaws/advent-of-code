const createNumericGridMap = (input: string[]): Record<string, number> =>
  input.reduce(
    (grid, line, rowIdx) => ({
      ...grid,
      ...line.split('').reduce(
        (subGrid, val, colIdx) => ({
          ...subGrid,
          [`${rowIdx},${colIdx}`]: parseInt(val),
        }),
        {}
      ),
    }),
    {}
  );

module.exports =  createNumericGridMap ;
