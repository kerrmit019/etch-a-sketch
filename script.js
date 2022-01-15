const gridContainer = document.querySelector(".grid-container");
const resetButton = document.querySelector(".reset-button");
const eraserButton = document.querySelector(".eraser-button");
const rainbowButton = document.querySelector(".rainbow-button");
const colorPicker = document.querySelector("#colorChoice");

const numberOfSquaresPerSide = 16;

colorPicker.addEventListener("input", (e) => setDrawingColor(e.target.value));

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

      // add event listener for pointerenter to turn black when mouse enters square
      setDrawingColor("black");
      gridContainer.appendChild(square);
    }
  }
}

function erase() {
  setDrawingColor("white");
}

// clears the grid of coloured squares - turns all squares to white
function resetGrid() {
  // select all squares.
  const squares = document.querySelectorAll(".square");
  // change each square colour to white to reset
  squares.forEach((square) => (square.style["background-color"] = "white"));
}

function setDrawingColor(color) {
  const squares = document.querySelectorAll(".square");
  squares.forEach((square) => {
    square.addEventListener("pointerenter", (e) => {
      //   console.log(e.target);
      e.target.style["background-color"] = color;
    });
  });
}

// TODO implement rainbow function
function rainbowColor() {
  setDrawingColor("black");
}

// draw grid of 16x16
// drawGrid(16);
drawGrid(numberOfSquaresPerSide);

resetButton.addEventListener("click", resetGrid);

eraserButton.addEventListener("click", erase);

rainbowButton.addEventListener("click", rainbowColor);
