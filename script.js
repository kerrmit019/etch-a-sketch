const gridContainer = document.querySelector(".grid-container");
const resetButton = document.querySelector(".reset-button");
const eraserButton = document.querySelector(".eraser-button");
const rainbowButton = document.querySelector(".rainbow-button");
const randomButton = document.querySelector(".random-button");
const colorPicker = document.querySelector("#colorChoice");
const greyscaleShaderButton = document.querySelector(".greyscale-button");

const slider = document.getElementById("gridSizeSlider");
const sliderOutput = document.querySelector(".grid-name");
sliderOutput.innerText = `${slider.value} X ${slider.value} grid`; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function () {
  sliderOutput.innerText = `${slider.value} X ${slider.value} grid`; // Display the default slider value
  clearGrid();
  drawGrid(slider.value);
};

const numberOfSquaresPerSide = 16;
let color = "black";
let greyscaleMode = "noGreyscale";
let squareBrightness = 1;

// choose color via the color picker
// color picker calls this
function chooseColor(e) {
  color = e.target.value;
  greyscaleMode = "noGreyScale";
  squaresAddEventListeners();
  setButtonStatus("colorPicker");
}

// removes all .square divs
function clearGrid() {
  const squares = document.querySelectorAll(".square");
  squares.forEach((square) => {
    gridContainer.removeChild(square);
  });
}

// set up grid of n X n squares
function drawGrid(numberOfSquaresPerSide) {
  for (i = 0; i < numberOfSquaresPerSide; i++) {
    for (j = 0; j < numberOfSquaresPerSide; j++) {
      let squareLength = 360 / numberOfSquaresPerSide;

      const square = document.createElement("div");
      square.setAttribute(
        "style",
        `height: ${squareLength}px; width: ${squareLength}px; background-color: white; filter: brightness(1);`
      );
      square.classList.add("square");
      // square.textContent = (i + 1) * (j + 1);

      // add event listener for pointerenter to turn black when mouse enters square
      gridContainer.appendChild(square);
    }
  }
  squaresAddEventListeners();
}

// changes sketcher to eraser
function erase() {
  squaresRemoveEventListeners();
  color = "white";
  greyscaleMode = "noGreyscale";
  squaresAddEventListeners();
  setButtonStatus("eraser");
}

function generateRandomHexCode() {
  return "#" + (Math.random() * 0xfffff * 1000000).toString(16).slice(0, 6);
}

function greyscaleShader() {
  squaresRemoveEventListeners();
  greyscaleMode = "greyscale";
  squaresAddEventListeners();
  setButtonStatus("greyscale");
}

// clears the grid of coloured squares - turns all squares to white
// resets colour to black
function resetGrid() {
  // select all squares.
  const squares = document.querySelectorAll(".square");
  // change each square colour to white to reset
  squares.forEach((square) => (square.style["background-color"] = "white"));
  squares.forEach((square) => (square.style["filter"] = "brightness(1)"));
  squaresRemoveEventListeners();
  //   reset drawing colour to black
  color = "black";
  colorPicker.value = "#000000";
  greyscaleMode = "noGreyscale";
  squaresAddEventListeners();
  setButtonStatus("reset");
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

function setDrawingColor(e) {
  // check for greyscale
  if (greyscaleMode === "greyscale") {
    // read off current brightness of square
    squareBrightness = e.target.style["filter"].split(/[a-z()]+/)[1];
    // decrease brightness by 10 percent to darken
    squareBrightness *= 0.9;
    e.target.style["filter"] = `brightness(${squareBrightness})`;
    return;
  } else {
    squareBrightness = 1;
    e.target.style["filter"] = `brightness(${squareBrightness})`;
  }

  // check colours
  if (color === "rainbow") {
    e.target.style["background-color"] = generateRandomHexCode();
  } else {
    e.target.style["background-color"] = color;
  }
}

function rainbowColor() {
  squaresRemoveEventListeners();
  color = "rainbow";
  greyscaleMode = "noGreyscale";
  squaresAddEventListeners();
  setButtonStatus("rainbow");
}

function randomColor() {
  squaresRemoveEventListeners();
  setButtonStatus("random");
  color = generateRandomHexCode();
  colorPicker.value = color;
  greyscaleMode = "noGreyscale";
  squaresAddEventListeners();
}

function squaresAddEventListeners() {
  const squares = document.querySelectorAll(".square");
  squares.forEach((square) =>
    square.addEventListener("pointerenter", setDrawingColor)
  );
}

function squaresRemoveEventListeners() {
  const squares = document.querySelectorAll(".square");
  squares.forEach((square) =>
    square.removeEventListener("pointerenter", setDrawingColor)
  );
}

// Run App from here

// draw initial grid of 16x16
// drawGrid(16);
drawGrid(numberOfSquaresPerSide);

// add button event listeners
resetButton.addEventListener("click", resetGrid);
eraserButton.addEventListener("click", erase);
rainbowButton.addEventListener("click", rainbowColor);
greyscaleShaderButton.addEventListener("click", greyscaleShader);
randomButton.addEventListener("click", randomColor);
colorPicker.addEventListener("input", chooseColor);

// TODO Set selector for choosing number of squares per side
