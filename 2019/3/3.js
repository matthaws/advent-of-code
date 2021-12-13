// This solution is ugly and I hate it

const drawPath = path => {
  let currentPos = { x: 0, y: 0, totalSteps: 0 };
  return path.map(coord => {
    const direction = coord[0];
    const stepSize = Number(coord.slice(1));
    let segment;
    switch (direction) {
      case "R":
        segment = {
          startPos: currentPos,
          endPos: {
            x: currentPos.x,
            y: currentPos.y + stepSize,
            totalSteps: currentPos.totalSteps + stepSize
          },
          direction: "horizontal",
          stepsInSegment: stepSize
        };
        currentPos = segment.endPos;
        return segment;
      case "L":
        segment = {
          startPos: currentPos,
          endPos: {
            x: currentPos.x,
            y: currentPos.y - stepSize,
            totalSteps: currentPos.totalSteps + stepSize
          },
          stepsInSegment: stepSize,
          direction: "horizontal"
        };
        currentPos = segment.endPos;
        return segment;
      case "U":
        segment = {
          startPos: currentPos,
          endPos: {
            x: currentPos.x + stepSize,
            y: currentPos.y,
            totalSteps: currentPos.totalSteps + stepSize
          },
          stepsInSegment: stepSize,
          direction: "vertical"
        };
        currentPos = segment.endPos;
        return segment;
      case "D":
        segment = {
          startPos: currentPos,
          endPos: {
            x: currentPos.x - stepSize,
            y: currentPos.y,
            totalSteps: currentPos.totalSteps + stepSize
          },
          direction: "vertical",
          stepsInSegment: stepSize
        };
        currentPos = segment.endPos;
        return segment;
    }
  });
};

const isIntersecting = (pos, startVal, endVal) =>
  pos >= Math.min(startVal, endVal) && pos <= Math.max(startVal, endVal);

const crossedWires = (pathA, pathB) => {
  const pathMapA = drawPath(pathA);
  const pathMapB = drawPath(pathB);

  const intersections = {};

  pathMapA.forEach(segmentA => {
    pathMapB.forEach(segmentB => {
      if (segmentA.direction !== segmentB.direction) {
        const [horizontal, vertical] =
          segmentA.direction === "horizontal"
            ? [segmentA, segmentB]
            : [segmentB, segmentA];

        const x = horizontal.endPos.x;
        const y = vertical.endPos.y;
        if (
          isIntersecting(x, vertical.startPos.x, vertical.endPos.x) &&
          isIntersecting(y, horizontal.startPos.y, horizontal.endPos.y)
        ) {
          console.log(x, y);
          const totalStepsHorz =
            horizontal.startPos.totalSteps +
            Math.abs(y - horizontal.startPos.y);
          const totalStepsVert =
            vertical.startPos.totalSteps + Math.abs(x - vertical.startPos.x);

          if (!intersections[`${x}:${y}`]) {
            intersections[`${x}:${y}`] = totalStepsVert + totalStepsHorz;
          }
        }
      }
    });
  });

  return Math.min(...Object.values(intersections));
};

const input = require("./input");
console.log(crossedWires(input.a, input.b));
