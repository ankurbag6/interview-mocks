// Pure movement logic for the Roomba — no React, fully unit-testable.

export const SIZE = 10;

// Clockwise order. Rotating right is just (index + 1) % 4.
export const DIRECTIONS = ["up", "right", "down", "left"];

// row 0 = top, col 0 = left.
export const DELTA = {
  up: { row: -1, col: 0 },
  right: { row: 0, col: 1 },
  down: { row: 1, col: 0 },
  left: { row: 0, col: -1 },
};

// Rotation applied to the sprite via CSS transform.
export const ANGLE = { up: 0, right: 90, down: 180, left: 270 };

export function inBounds([row, col], size = SIZE) {
  return row >= 0 && row < size && col >= 0 && col < size;
}

export function rotateCW(direction) {
  return DIRECTIONS[(DIRECTIONS.indexOf(direction) + 1) % DIRECTIONS.length];
}

// Returns a NEW state; never mutates the input.
// Behavior: turn + move in one click. Rotate clockwise until a forward
// step lands in-bounds, then take it. If fully boxed in, stay put.
export function nextMove({ position, direction }, size = SIZE) {
  let dir = direction;
  for (let i = 0; i < DIRECTIONS.length; i++) {
    const d = DELTA[dir];
    const candidate = [position[0] + d.row, position[1] + d.col];
    if (inBounds(candidate, size)) {
      return { position: candidate, direction: dir };
    }
    dir = rotateCW(dir);
  }
  return { position: [...position], direction: dir };
}
