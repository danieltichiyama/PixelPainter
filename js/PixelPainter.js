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
sizer.appendChild(widthInput);

const heightText = document.createElement("span");
heightText.innerHTML = "height: ";
sizer.appendChild(heightText);

const heightInput = document.createElement("input");
heightInput.type = "number";
heightInput.id = "heightInput";
heightInput.placeholder = 65;
sizer.appendChild(heightInput);

function getWAndH() {
  pixelPainter.innerHTML = "";
  createCanvas(widthInput.value, widthInput.value);
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
  pixelPainter.style.gridTemplateColumns = "repeat(" + width + ",10px)";
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      let pix = document.createElement("div");
      pix.className = "pixel";
      pix.id = i + "," + j;
      pix.addEventListener("mousedown", function() {
        let pixArr = document.querySelectorAll(".pixel");
        for (let i = 0; i < pixArr.length; i++) {
          pixArr[i].addEventListener("mouseover", changeColor);
        }
        this.style.background = imaNoColor;
      });
      pix.addEventListener("mouseup", function() {
        let pixArr = document.querySelectorAll(".pixel");
        for (let i = 0; i < pixArr.length; i++) {
          pixArr[i].removeEventListener("mouseover", changeColor);
        }
      });
      pixelPainter.appendChild(pix);
    }
  }
}

createCanvas(100, 65);
//canvas sizing div-end

pixelPainter.addEventListener("mouseleave", function() {
  let pixArr = document.querySelectorAll(".pixel");
  for (let i = 0; i < pixArr.length; i++) {
    pixArr[i].removeEventListener("mouseover", changeColor);
  }
});

function changeColor() {
  this.style.background = imaNoColor;
}

const colorPicker = document.createElement("div");
colorPicker.id = "colorPicker";
document.body.appendChild(colorPicker);

const colorArray = [
  "red",
  "blue",
  "yellow",
  "green",
  "orange",
  "purple",
  "brown",
  "black",
  "white",
  "pink"
];

let imaNoColor = "black";

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
  imaNoColor = this.style.background;
}

let clearButton = document.createElement("button");
clearButton.id = "clear";
clearButton.innerHTML = "CLEAR";
clearButton.addEventListener("click", clearCanvas);
document.body.appendChild(clearButton);

function clearCanvas() {
  let pixArr = document.querySelectorAll(".pixel");
  for (let i = 0; i < pixArr.length; i++) {
    pixArr[i].style.background = "white";
  }
}

let eraserButton = document.createElement("button");
eraserButton.id = "eraser";
eraserButton.innerHTML = "ERASER";
eraserButton.addEventListener("click", eraserTool);
document.body.appendChild(eraserButton);

function eraserTool() {
  imaNoColor = "white";
  pixelPainter.removeEventListener("mouseleave");
}

console.log(document.getElementById("widthInput"));
