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

//color-picker functionality-start
function changeColor() {
  this.style.background = imaNoIro;
}

const colorPicker = document.createElement("div");
colorPicker.id = "colorPicker";
menuBox.appendChild(colorPicker);

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

let imaNoIro = "black";

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

let brushButton = document.createElement("button");
brushButton.id = "brush";
brushButton.innerHTML = "BRUSH";
brushButton.addEventListener("click", brush);
menuBox.appendChild(brushButton);

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

let clearButton = document.createElement("button");
clearButton.id = "clear";
clearButton.innerHTML = "CLEAR";
clearButton.addEventListener("click", clearCanvas);
menuBox.appendChild(clearButton);

//color-picker functionality-end

//additional functions-start
function clearCanvas() {
  let pixArr = document.querySelectorAll(".pixel");
  for (let i = 0; i < pixArr.length; i++) {
    pixArr[i].style.background = "none";
    pixArr[i].dataset.color = "none";
  }
}

let eraserButton = document.createElement("button");
eraserButton.id = "eraser";
eraserButton.innerHTML = "ERASER";
eraserButton.addEventListener("click", eraserTool);
menuBox.appendChild(eraserButton);

function eraserTool() {
  imaNoIro = "none";
  pixelPainter.removeEventListener("mouseleave", function() {
    let pixArr = document.querySelectorAll(".pixel");
    for (let i = 0; i < pixArr.length; i++) {
      pixArr[i].removeEventListener("mouseover", changeColor);
    }
  });
}
//additional functions-end

//sandbox-start

let fillButton = document.createElement("button");
fillButton.id = "fillButton";
fillButton.innerHTML = "FILL";
fillButton.addEventListener("click", function() {
  let pixArr = document.querySelectorAll(".pixel");
  for (i = 0; i < pixArr.length; i++) {
    pixArr[i].addEventListener("click", fill);
    pixArr[i].removeEventListener("mousedown", brush1);
    pixArr[i].removeEventListener("mouseup", brush2);
  }
});
menuBox.appendChild(fillButton);

function fill() {
  let x = this.dataset.x;
  let preSibling = this.previousSibling;
  let nextSibling = this.nextSibling;
  let upSibling = this.parentNode.previousSibling.childNodes[x];
  let downSibling = this.parentNode.nextSibling.childNodes[x];
  //hor-left
  while (preSibling) {
    if (preSibling.style.backgroundColor !== this.style.backgroundColor) {
      preSibling = false;
    } else {
      preSibling.style.backgroundColor = imaNoIro;
      let a = preSibling.dataset.x;
      let thisUpSibling = preSibling.parentNode.previousSibling.childNodes[a];
      while (thisUpSibling) {
        if (
          thisUpSibling.style.backgroundColor !== this.style.backgroundColor
        ) {
          thisUpSibling = false;
        } else {
          thisUpSibling.style.backgroundColor = imaNoIro;
          if (thisUpSibling.parentNode.previousSibling) {
            thisUpSibling =
              thisUpSibling.parentNode.previousSibling.childNodes[a];
          } else {
            thisUpSibling = false;
          }
        }
      }

      let b = preSibling.dataset.x;
      let thisDownSibling = preSibling.parentNode.nextSibling.childNodes[b];
      while (thisDownSibling) {
        if (
          thisDownSibling.style.backgroundColor !== this.style.backgroundColor
        ) {
          thisDownSibling = false;
        } else {
          thisDownSibling.style.backgroundColor = imaNoIro;
          if (thisDownSibling.parentNode.nextSibling) {
            thisDownSibling =
              thisDownSibling.parentNode.nextSibling.childNodes[b];
          } else {
            thisDownSibling = false;
          }
        }
      }
      preSibling = preSibling.previousSibling;
    }
  }
  //hor-right
  while (nextSibling) {
    if (nextSibling.style.backgroundColor !== this.style.backgroundColor) {
      nextSibling = false;
    } else {
      nextSibling.style.backgroundColor = imaNoIro;
      let a = nextSibling.dataset.x;
      let thisUpSibling = nextSibling.parentNode.previousSibling.childNodes[a];
      while (thisUpSibling) {
        if (
          thisUpSibling.style.backgroundColor !== this.style.backgroundColor
        ) {
          thisUpSibling = false;
        } else {
          thisUpSibling.style.backgroundColor = imaNoIro;
          if (thisUpSibling.parentNode.previousSibling) {
            thisUpSibling =
              thisUpSibling.parentNode.previousSibling.childNodes[a];
          } else {
            thisUpSibling = false;
          }
        }
      }
      let b = nextSibling.dataset.x;
      let thisDownSibling = nextSibling.parentNode.nextSibling.childNodes[b];
      while (thisDownSibling) {
        if (
          thisDownSibling.style.backgroundColor !== this.style.backgroundColor
        ) {
          thisDownSibling = false;
        } else {
          thisDownSibling.style.backgroundColor = imaNoIro;
          if (thisDownSibling.parentNode.nextSibling) {
            thisDownSibling =
              thisDownSibling.parentNode.nextSibling.childNodes[b];
          } else {
            thisDownSibling = false;
          }
        }
      }
      nextSibling = nextSibling.nextSibling;
    }
  }
  //vert-up
  while (upSibling) {
    if (upSibling.style.backgroundColor !== this.style.backgroundColor) {
      upSibling = false;
    } else {
      upSibling.style.backgroundColor = imaNoIro;
      if (upSibling.parentNode.previousSibling) {
        upSibling = upSibling.parentNode.previousSibling.childNodes[x];
      } else {
        upSibling = false;
      }
    }
  }
  //vert-down
  while (downSibling) {
    if (downSibling.style.backgroundColor !== this.style.backgroundColor) {
      downSibling = false;
    } else {
      downSibling.style.backgroundColor = imaNoIro;
      if (downSibling.parentNode.nextSibling) {
        downSibling = downSibling.parentNode.nextSibling.childNodes[x];
      } else {
        downSibling = false;
      }
    }
  }

  this.style.backgroundColor = imaNoIro;
}
//sandbox-end

/*Things to add:
1. a recall button (need to store the memory of all the .pixel background colors)
2. a fill tool (it would propogate the color to other cells if they are not filled with a color already. up, down, left, and right);
3. a checkered background (will need to figure out a way to do it with even-numbered dimensions, and also will need to update the clear function and the eraser)
4. make it so the eraser doesn't exit out even if the cursor leaves the canvas.
5. add special cursors for all the tools
6. make it responsive for mobile.
*/
