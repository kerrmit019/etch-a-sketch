const gridContainer = document.querySelector(".grid-container");
const resetButton = document.querySelector(".reset-button");
const eraserButton = document.querySelector(".eraser-button");
const rainbowButton = document.querySelector(".rainbow-button");
const colorPicker = document.querySelector("#colorChoice");

const numberOfSquaresPerSide = 16;

function chooseColor(e) {
  setDrawingColor(e.target.value);
  setButtonStatus("colorPicker");
}

function setButtonStatus(button) {
  switch (button) {
    case "colorPicker":
      rainbowButton.style["background-color"] = "";
      eraserButton.style["background-color"] = "";
      break;
    case "rainbow":
      rainbowButton.style["background-color"] = "#6c757d";
      eraserButton.style["background-color"] = "";
      break;
    case "eraser":
      eraserButton.style["background-color"] = "#6c757d";
      rainbowButton.style["background-color"] = "";
      break;
    case "reset":
      rainbowButton.style["background-color"] = "";
      eraserButton.style["background-color"] = "";
      break;
  }
}

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
  setButtonStatus("eraser");
}

// clears the grid of coloured squares - turns all squares to white
// resest colour to black
function resetGrid() {
  // select all squares.
  const squares = document.querySelectorAll(".square");
  // change each square colour to white to reset
  squares.forEach((square) => (square.style["background-color"] = "white"));
  //   reset drawing colour to black
  setDrawingColor("black");
  colorPicker.value = "#000000";
  setButtonStatus("reset");
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
  setButtonStatus("rainbow");
}

// draw grid of 16x16
// drawGrid(16);
drawGrid(numberOfSquaresPerSide);

resetButton.addEventListener("click", resetGrid);

eraserButton.addEventListener("click", erase);

rainbowButton.addEventListener("click", rainbowColor);

colorPicker.addEventListener("input", chooseColor);

// TODO Set selector for choosing number of squares per side
