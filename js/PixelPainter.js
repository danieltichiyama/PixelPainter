const pixelPainter = document.getElementById("pixelPainter");

//canvas sizing div-start
const sizer = document.createElement("div");
sizer.id = "sizer";
document.querySelector("h1").after(sizer);

const widthText = document.createElement("span");
widthText.innerHTML = "width: ";
sizer.appendChild(widthText);

const widthInput = document.createElement("input");
widthInput.type = "number";
widthInput.id = "widthInput";
widthInput.placeholder = 100;
widthInput.value = 100;
sizer.appendChild(widthInput);

const heightText = document.createElement("span");
heightText.innerHTML = "height: ";
sizer.appendChild(heightText);

const heightInput = document.createElement("input");
heightInput.type = "number";
heightInput.id = "heightInput";
heightInput.placeholder = 65;
heightInput.value = 65;
sizer.appendChild(heightInput);

function getWAndH() {
  pixelPainter.innerHTML = "";
  if (widthInput.value === undefined || heightInput.value === undefined) {
    alert("Please specify a width and a height");
  }
  createCanvas(widthInput.value, heightInput.value);
}

const resizeButton = document.createElement("button");
resizeButton.id = "resizeButton";
resizeButton.innerHTML = "OK";
resizeButton.addEventListener("click", function() {
  getWAndH();
  clearCanvas();
});
sizer.appendChild(resizeButton);

function createCanvas(width, height) {
  for (let i = 0; i < height; i++) {
    let row = document.createElement("div");
    row.className = "row";
    row.id = i;
    for (let j = 0; j < width; j++) {
      let pix = document.createElement("div");
      pix.className = "pixel";
      pix.dataset.x = j;
      pix.dataset.y = i;
      pix.dataset.color = "none";
      pix.id = "pixel" + j + "," + i;
      row.appendChild(pix);
    }
    pixelPainter.appendChild(row);
  }
}

pixelPainter.addEventListener("mouseleave", function() {
  let pixArr = document.querySelectorAll(".pixel");
  for (let i = 0; i < pixArr.length; i++) {
    pixArr[i].removeEventListener("mouseover", changeColor);
  }
});

createCanvas(101, 65);
//canvas functionality-end

//menu-start
const menuBox = document.createElement("div");
menuBox.id = "menuBox";
sizer.after(menuBox);

//color-picker-start
const colorPicker = document.createElement("div");
colorPicker.id = "colorPicker";
menuBox.appendChild(colorPicker);

const colorArray = [
  "#ffffff",
  "#001f3f",
  "#0074d9",
  "#7fdbff",
  "#39cccc",
  "#3d9970",
  "#2ecc40",
  "#01ff70",
  "#ffdc00",
  "#ff851b",
  "#ff4136",
  "#85144b",
  "#f012be",
  "#b10dc9",
  "#111111",
  "#aaaaaa",
  "#dddddd"
];

for (let i = 0; i < 5; i++) {
  for (let j = 0; j < 10; j++) {
    let col = document.createElement("div");
    col.className = "color";
    col.id = i + "col" + j;
    col.style.background =
      colorArray[Math.floor(Math.random() * colorArray.length)];
    col.addEventListener("click", atarashiColor);
    colorPicker.appendChild(col);
  }
}

function atarashiColor() {
  imaNoIro = this.style.background;
}
// color-picker-end

let brushButton = document.createElement("button");
brushButton.id = "brush";
brushButton.innerHTML = "BRUSH";
brushButton.addEventListener("click", brush);
brushButton.removeEventListener("click", fill);
menuBox.appendChild(brushButton);

let clearButton = document.createElement("button");
clearButton.id = "clear";
clearButton.innerHTML = "CLEAR";
clearButton.addEventListener("click", clearCanvas);
menuBox.appendChild(clearButton);

let eraserButton = document.createElement("button");
eraserButton.id = "eraser";
eraserButton.innerHTML = "ERASER";
eraserButton.addEventListener("click", eraserTool);
menuBox.appendChild(eraserButton);

let fillButton = document.createElement("button");
fillButton.id = "fillButton";
fillButton.innerHTML = "FILL";
fillButton.addEventListener("click", function() {
  let pixArr = document.querySelectorAll(".pixel");
  for (i = 0; i < pixArr.length; i++) {
    pixArr[i].addEventListener("click", fill);
    pixArr[i].addEventListener("click", function() {
      maeNoIro = this.style.backgroundColor;
    });
    pixArr[i].removeEventListener("mousedown", brush1);
    pixArr[i].removeEventListener("mouseup", brush2);
  }
});
menuBox.appendChild(fillButton);
// menu-end

let imaNoIro = "black";
let maeNoIro = "";

function changeColor() {
  this.style.background = imaNoIro;
}

function brush() {
  let pixArr = document.querySelectorAll(".pixel");
  for (i = 0; i < pixArr.length; i++) {
    pixArr[i].addEventListener("mousedown", brush1);
    pixArr[i].addEventListener("mouseup", brush2);
  }
}

function brush1() {
  let pixArr = document.querySelectorAll(".pixel");
  for (let i = 0; i < pixArr.length; i++) {
    pixArr[i].addEventListener("mouseover", changeColor);
  }
  this.style.background = imaNoIro;
  this.dataset.color = imaNoIro;
}

function brush2() {
  let pixArr = document.querySelectorAll(".pixel");
  for (let i = 0; i < pixArr.length; i++) {
    pixArr[i].removeEventListener("mouseover", changeColor);
  }
}

//additional functions-start
function clearCanvas() {
  let pixArr = document.querySelectorAll(".pixel");
  for (let i = 0; i < pixArr.length; i++) {
    pixArr[i].style.background = "none";
    pixArr[i].dataset.color = "none";
  }
}

function eraserTool() {
  imaNoIro = "none";
  pixelPainter.removeEventListener("mouseleave", function() {
    let pixArr = document.querySelectorAll(".pixel");
    for (let i = 0; i < pixArr.length; i++) {
      pixArr[i].removeEventListener("mouseover", changeColor);
    }
  });
}

function fill() {
  let x = this.dataset.x;
  let endOfCanvas;
  if (
    this.previousSibling === null ||
    this.previousSibling.style.backgroundColor !== maeNoIro
  ) {
    endOfCanvas = true;
  } else {
    this.previousSibling.style.backgroundColor = imaNoIro;
    let nextFill = fill.bind(this.previousSibling);
    nextFill();
  }

  if (
    this.nextSibling === null ||
    this.nextSibling.style.backgroundColor !== maeNoIro
  ) {
    endOfCanvas = true;
  } else {
    this.nextSibling.style.backgroundColor = imaNoIro;
    let nextFill = fill.bind(this.nextSibling);
    nextFill();
  }

  if (
    this.parentNode.previousSibling === null ||
    this.parentNode.previousSibling.childNodes[x].style.backgroundColor !==
      maeNoIro
  ) {
    endOfCanvas = true;
  } else {
    this.parentNode.previousSibling.childNodes[
      x
    ].style.backgroundColor = imaNoIro;
    let nextFill = fill.bind(this.parentNode.previousSibling.childNodes[x]);
    nextFill();
  }

  if (
    this.parentNode.nextSibling === null ||
    this.parentNode.nextSibling.childNodes[x].style.backgroundColor !== maeNoIro
  ) {
    endOfCanvas = true;
  } else {
    this.parentNode.nextSibling.childNodes[x].style.backgroundColor = imaNoIro;
    let nextFill = fill.bind(this.parentNode.nextSibling.childNodes[x]);
    nextFill(this.parentNode.nextSibling.childNodes[x]);
  }
}
//additional functions-end

//sandbox-start

//sandbox-end

/*Things to add:
1. a recall button (need to store the memory of all the .pixel background colors)
3. a checkered background (will need to figure out a way to do it with even-numbered dimensions, and also will need to update the clear function and the eraser)
4. make it so the eraser doesn't exit out even if the cursor leaves the canvas.
5. add special cursors for all the tools
6. make it responsive for mobile.
*/
