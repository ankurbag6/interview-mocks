Build a small React app that simulates a Roomba on a 10×10 grid. 
It starts at a position facing a direction. Clicking moves it one cell forward in the direction it's facing. 
When it reaches the edge, it should turn instead of falling off — use a CSS transform to show the rotation. 
Grid should be responsive.

Plan - 
1. I will create a React app project: npm create vite@latest my-react-app -- --template react
2. My focus will be first to write the logic of Roomba Movements
  - Create a JS File roomab.js
  - Assumptions: 
    - Initiate a GRID (2d Array of 10 * 10), DIRECTIONS = [up, right, down, left]
      Delta = { up: {row:1, col:0},... }
    - I am assuming the positions will [i,j]
    - Intial state : {position, directions} Eg. { [0,0], "up"}
    - I am assuming Roomba move one step at a time
  - nextMove()  // funciton that determines the next step of Roomba
    - for upto 4 attempts
     - candidate = current + directions[current].offset
     - if candidate inbunds -> return candidate
     - else rotate clockwise
    - return current position 
3. Will ask AI to create Unit test for the movements : invalid steps, valid steps