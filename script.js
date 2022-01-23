const gridContainer = document.querySelector(".grid-container");
const resetButton = document.querySelector(".reset-button");
const eraserButton = document.querySelector(".eraser-button");
const rainbowButton = document.querySelector(".rainbow-button");
const randomButton = document.querySelector(".random-button");
const colorPicker = document.querySelector("#colorChoice");
const greyscaleShaderButton = document.querySelector(".greyscale-button");

const numberOfSquaresPerSide = 16;
let color = "black";
let mode = "noGreyscale";

function chooseColor(e) {
  color = e.target.value;
  mode = "noGreyScale";
  squaresAddEventListeners();
  setButtonStatus("colorPicker");
}

function setButtonStatus(button) {
  switch (button) {
    case "colorPicker":
      rainbowButton.style["background-color"] = "";
      randomButton.style["background-color"] = "";
      eraserButton.style["background-color"] = "";
      greyscaleShaderButton.style["background-color"] = "";
      break;
    case "random":
      randomButton.style["background-color"] = "#6c757d";
      rainbowButton.style["background-color"] = "";
      eraserButton.style["background-color"] = "";
      greyscaleShaderButton.style["background-color"] = "";
      break;
    case "rainbow":
      rainbowButton.style["background-color"] = "#6c757d";
      eraserButton.style["background-color"] = "";
      randomButton.style["background-color"] = "";
      greyscaleShaderButton.style["background-color"] = "";
      break;
    case "greyscale":
      greyscaleShaderButton.style["background-color"] = "#6c757d";
      rainbowButton.style["background-color"] = "";
      eraserButton.style["background-color"] = "";
      randomButton.style["background-color"] = "";
      break;
    case "eraser":
      eraserButton.style["background-color"] = "#6c757d";
      rainbowButton.style["background-color"] = "";

      greyscaleShaderButton.style["background-color"] = "";
      randomButton.style["background-color"] = "";
      break;
    case "reset":
      greyscaleShaderButton.style["background-color"] = "";
      rainbowButton.style["background-color"] = "";
      eraserButton.style["background-color"] = "";
      randomButton.style["background-color"] = "";
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
        `height: ${squareLength}px; width: ${squareLength}px;`
      );
      square.style["background-color"] = "white";
      square.classList.add("square");
      // square.textContent = (i + 1) * (j + 1);

      // add event listener for pointerenter to turn black when mouse enters square
      gridContainer.appendChild(square);
    }
  }
  squaresAddEventListeners();
}

function erase() {
  squaresRemoveEventListeners();
  color = "white";
  mode = "noGreyscale";
  squaresAddEventListeners();
  setButtonStatus("eraser");
}

// clears the grid of coloured squares - turns all squares to white
// resest colour to black
function resetGrid() {
  // select all squares.
  const squares = document.querySelectorAll(".square");
  // change each square colour to white to reset
  squares.forEach((square) => (square.style["background-color"] = "white"));
  squaresRemoveEventListeners;
  //   reset drawing colour to black
  color = "black";
  colorPicker.value = "#000000";
  mode = "noGreyscale";
  squaresAddEventListeners();
  setButtonStatus("reset");
}

function generateRandomHexCode() {
  return "#" + (Math.random() * 0xfffff * 1000000).toString(16).slice(0, 6);
}

function setDrawingColor(e) {
  // check for greyscale
  if (mode === "greyscale") {
    console.log(color);
    e.target.style["filter"] = "brightness(80%)";
    return;
  } else {
    e.target.style["filter"] = "";
  }

  if (color === "rainbow") {
    e.target.style["background-color"] = generateRandomHexCode();
    // console.log(e.target.style["background-color"]);
  } else {
    e.target.style["background-color"] = color;
  }
}

function squaresAddEventListeners() {
  const squares = document.querySelectorAll(".square");
  squares.forEach((square) =>
    square.addEventListener("pointerenter", setDrawingColor)
  );
  console.log(`Add ${color}`);
}

function squaresRemoveEventListeners() {
  const squares = document.querySelectorAll(".square");
  squares.forEach((square) =>
    square.removeEventListener("pointerenter", setDrawingColor)
  );
  console.log(`remove ${color}`);
}

function rainbowColor() {
  squaresRemoveEventListeners();
  color = "rainbow";
  mode = "noGreyscale";
  squaresAddEventListeners();
  setButtonStatus("rainbow");
}

function randomColor() {
  squaresRemoveEventListeners();
  setButtonStatus("random");
  color = generateRandomHexCode();
  colorPicker.value = color;
  mode = "noGreyscale";
  squaresAddEventListeners();
}

function greyscaleShader() {
  squaresRemoveEventListeners();
  mode = "greyscale";
  squaresAddEventListeners();
  setButtonStatus("greyscale");
}

// draw grid of 16x16
// drawGrid(16);
drawGrid(numberOfSquaresPerSide);

resetButton.addEventListener("click", resetGrid);

eraserButton.addEventListener("click", erase);

rainbowButton.addEventListener("click", rainbowColor);

greyscaleShaderButton.addEventListener("click", greyscaleShader);

randomButton.addEventListener("click", randomColor);
colorPicker.addEventListener("input", chooseColor);

// TODO Create greyscale shader
// TODO Set selector for choosing number of squares per side
