const inputParser = require("../inputParser.ts");
const ropeMovementInput = inputParser("day-9.txt", "text");

type Dirs = "U" | "D" | "R" | "L";
type Pos = [number, number];

interface Rope {
  head: Pos;
  tail: Pos;
}

const directionDeltas: Record<Dirs, Pos> = {
  U: [0, 1],
  D: [0, -1],
  R: [1, 0],
  L: [-1, 0],
};

const applyDelta = (pos: Pos, delta: Pos) =>
  pos.map((coord, i) => coord + delta[i]) as Pos;

const getDiffs = ([headX, headY]: Pos, [tailX, tailY]: Pos): Pos => [
  headX - tailX,
  headY - tailY,
];

const shouldTailMove = (diffs: Pos) =>
  diffs.some((diff) => Math.abs(diff) >= 2);
const shouldTailMoveDiagonally = (diffs: Pos) =>
  shouldTailMove(diffs) && diffs.every((diff) => Math.abs(diff) > 0);

const getTailDiffs = (diffs: Pos): Pos => {
  if (shouldTailMoveDiagonally(diffs)) {
    return diffs.map((diff: number) => (diff < 0 ? -1 : 1)) as Pos;
  }
  // standard non-diagonal movement
  return diffs.map((diff: number) => {
    if (diff < -1) return -1;
    if (diff > 1) return 1;
    return 0;
  }) as Pos;
};

const moveTail = (newHead: Pos, tail: Pos): Pos => {
  const diffs = getDiffs(newHead, tail);

  if (!shouldTailMove(diffs)) {
    return tail;
  }

  const tailDeltas = getTailDiffs(diffs);
  return applyDelta(tail, tailDeltas);
};

const moveRope = (direction: Dirs, rope: Rope) => {
  const newHead = applyDelta(rope.head, directionDeltas[direction] as Pos);

  return {
    head: newHead,
    tail: moveTail(newHead, rope.tail),
  };
};

const moveLongRope = (dir: Dirs, longRope: Pos[]) => {
  const newRope: Pos[] = [];
  const newHead = applyDelta(longRope[0], directionDeltas[dir] as Pos)
  newRope.push(newHead)
  console.log(newRope)
  for (let i = 1; i < longRope.length; i++) {
    const prevSeg = newRope[i - 1];
    const newSegPos = moveTail(prevSeg, longRope[i]);
    newRope.push(newSegPos);
  }

  return newRope;
};

const moveRopeAndTrackTail = (ropeMovements: string[]): number => {
  const tailPosList = new Set(["0,0"]);
  let masterRope = new Array(10).fill([0, 0]);
  ropeMovements.forEach((line) => {
    const [dir, num] = line.split(" ");
    for (let i = 0; i < Number(num); i++) {
      masterRope = moveLongRope(dir as Dirs, masterRope);
      console.log(masterRope);
      tailPosList.add(masterRope[9].join(","));
    }
  });
  return tailPosList.size;
};

console.log(moveRopeAndTrackTail(ropeMovementInput));
