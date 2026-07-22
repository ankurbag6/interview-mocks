import { useState } from "react";
import { SIZE, ANGLE, nextMove } from "./roomba.js";
import "./App.css";

export default function App() {
  const [state, setState] = useState({ position: [0, 0], direction: "up" });

  const step = () => setState((s) => nextMove(s));

  const [roombaRow, roombaCol] = state.position;

  return (
    <div className="app">
      <h1>Roomba</h1>
      <p className="status">
        Position ({roombaRow}, {roombaCol}) · facing {state.direction}
      </p>

      <div
        className="grid"
        style={{ gridTemplateColumns: `repeat(${SIZE}, 1fr)` }}
        onClick={step}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && step()}
      >
        {Array.from({ length: SIZE * SIZE }, (_, i) => {
          const row = Math.floor(i / SIZE);
          const col = i % SIZE;
          const isRoomba = row === roombaRow && col === roombaCol;
          return (
            <div key={i} className="cell">
              {isRoomba && (
                <span
                  className="roomba"
                  style={{ transform: `rotate(${ANGLE[state.direction]}deg)` }}
                >
                  ▲
                </span>
              )}
            </div>
          );
        })}
      </div>

      <button className="step-btn" onClick={step}>
        Move
      </button>
    </div>
  );
}
