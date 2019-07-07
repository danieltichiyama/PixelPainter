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
        this.style.background = imaNoIro;
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
  //   let pixArr = document.querySelectorAll(".pixel");
  //   for (let i = 1; i < pixArr.length; i++) {
  //     if (pixArr[i - 1].style.backgroundImage === "none") {
  //       pixArr[i].style.backgroundImage =
  //         "url(https://images.homedepot-static.com/productImages/fc91cb23-b6db-4d32-b02a-f1ed61dd39a8/svn/folkstone-matte-formica-laminate-sheets-009271258408000-64_400_compressed.jpg)";
  //     } else {
  //       pixArr[i].style.backgroundImage = "none";
  //     }
  //   }
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
  }
}

let eraserButton = document.createElement("button");
eraserButton.id = "eraser";
eraserButton.innerHTML = "ERASER";
eraserButton.addEventListener("click", eraserTool);
menuBox.appendChild(eraserButton);

function eraserTool() {
  imaNoIro = "white";
  pixelPainter.removeEventListener("mouseleave");
}
//additional functions-end

/*Things to add:
1. a recall button (need to store the memory of all the .pixel background colors)
2. a fill tool (it would propogate the color to other cells if they are not filled with a color already. up, down, left, and right);
3. a checkered background (will need to figure out a way to do it with even-numbered dimensions, and also will need to update the clear function and the eraser)
4. make it so the eraser doesn't exit out even if the cursor leaves the canvas.
5. add special cursors for all the tools
6. make it responsive for mobile.
*/
