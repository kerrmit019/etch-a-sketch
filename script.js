const gridContainer = document.querySelector(".grid-container");

// draw 16 squares
for (i = 0; i < 16; i++) {
  for (j = 0; j < 16; j++) {
    const square = document.createElement("div");
    square.setAttribute(
      "style",
      "border: 1px solid blue; height: 20px; width: 20px"
    );
    // square.textContent = (i + 1) * (j + 1);
    gridContainer.appendChild(square);
  }
}
