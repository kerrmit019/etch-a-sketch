const gridContainer = document.querySelector(".grid-container");

// draw 16 squares
for (i = 0; i < 16; i++) {
  for (j = 0; j < 16; j++) {
    const square = document.createElement("div");
    square.setAttribute(
      "style",
      "border: 1px solid blue; height: 20px; width: 20px"
    );
    // add class of square
    square.classList.add("square");
    // square.textContent = (i + 1) * (j + 1);

    // add event listener for click to turn blue (not what we want at end
    // but good intermediary step)
    square.addEventListener("click", (e) => {
      console.log(e.target);
      e.target.style["background-color"] = "blue";
    });
    gridContainer.appendChild(square);
  }
}

// TODO Add event listeners to change colour of grid divs when hover over them
// const squares = document.querySelectorAll(".square");

// squares.forEach((square) =>
// );
