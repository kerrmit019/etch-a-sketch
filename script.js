const gridContainer = document.querySelector(".grid-container");

function drawGrid(numberOfSquaresPerSide) {
  for (i = 0; i < numberOfSquaresPerSide; i++) {
    for (j = 0; j < numberOfSquaresPerSide; j++) {
      let squareLength = 360 / numberOfSquaresPerSide;

      const square = document.createElement("div");
      square.setAttribute(
        "style",
        `height: ${squareLength}px; width: ${squareLength}px`
      );
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

// draw grid of 16x16
// drawGrid(16);
drawGrid(64);
