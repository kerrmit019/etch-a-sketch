const gridContainer = document.querySelector(".grid-container");
const resetButton = document.querySelector(".reset-button");
const numberOfSquaresPerSide = 16;

// set up grid of n X n squares
function drawGrid(numberOfSquaresPerSide) {
  for (i = 0; i < numberOfSquaresPerSide; i++) {
    for (j = 0; j < numberOfSquaresPerSide; j++) {
      let squareLength = 360 / numberOfSquaresPerSide;

      const square = document.createElement("div");
      square.setAttribute(
        "style",
        `height: ${squareLength}px; width: ${squareLength}px`
      );
      square.classList.add("square");
      // square.textContent = (i + 1) * (j + 1);

      // add event listener for pointerenter to turn blue when mouse enters square
      square.addEventListener("pointerenter", (e) => {
        //   console.log(e.target);
        e.target.style["background-color"] = "blue";
      });
      gridContainer.appendChild(square);
    }
  }
}

// clears the grid of coloured squares - turns all squares to white
function resetGrid() {
  // select all squares.
  const squares = document.querySelectorAll(".square");
  // change each square colour to white to reset
  squares.forEach((square) => (square.style["background-color"] = "white"));
}

// draw grid of 16x16
// drawGrid(16);
drawGrid(numberOfSquaresPerSide);

resetButton.addEventListener("click", resetGrid);
