import { describe, it, expect } from "vitest";
import { nextMove, inBounds, rotateCW } from "./roomba.js";

describe("inBounds", () => {
  it("accepts cells inside the grid", () => {
    expect(inBounds([0, 0])).toBe(true);
    expect(inBounds([9, 9])).toBe(true);
    expect(inBounds([5, 5])).toBe(true);
  });

  it("rejects cells outside the grid", () => {
    expect(inBounds([-1, 0])).toBe(false);
    expect(inBounds([0, -1])).toBe(false);
    expect(inBounds([10, 0])).toBe(false);
    expect(inBounds([0, 10])).toBe(false);
  });
});

describe("rotateCW", () => {
  it("cycles clockwise", () => {
    expect(rotateCW("up")).toBe("right");
    expect(rotateCW("right")).toBe("down");
    expect(rotateCW("down")).toBe("left");
    expect(rotateCW("left")).toBe("up");
  });
});

describe("nextMove", () => {
  it("takes a valid forward step, keeping direction", () => {
    expect(nextMove({ position: [5, 5], direction: "up" })).toEqual({
      position: [4, 5],
      direction: "up",
    });
  });

  it("turns clockwise at an edge, then moves", () => {
    // Top row facing up: can't go up, turns right and moves right.
    expect(nextMove({ position: [0, 5], direction: "up" })).toEqual({
      position: [0, 6],
      direction: "right",
    });
  });

  it("turns twice at a corner", () => {
    // Top-right corner facing up: up blocked, right blocked, turns to down.
    expect(nextMove({ position: [0, 9], direction: "up" })).toEqual({
      position: [1, 9],
      direction: "down",
    });
  });

  it("stays put when fully boxed in (1x1 grid)", () => {
    expect(nextMove({ position: [0, 0], direction: "up" }, 1)).toEqual({
      position: [0, 0],
      direction: "up",
    });
  });

  it("does not mutate the input state", () => {
    const state = { position: [5, 5], direction: "up" };
    nextMove(state);
    expect(state).toEqual({ position: [5, 5], direction: "up" });
  });
});
