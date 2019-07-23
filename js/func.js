var functionModule = function() {
  const pixelPainter = document.getElementById("pixelPainter");

  function getWAndH() {
    pixelPainter.innerHTML = "";
    if (widthInput.value === undefined || heightInput.value === undefined) {
      alert("Please specify a width and a height");
    }
    createCanvas(widthInput.value, heightInput.value);
  }

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

  function newColor() {
    imaNoIro = this.style.background;
  }

  function makeSwatch(color) {
    let col = document.createElement("div");
    col.className = "color";
    col.id = color;
    col.style.background = color;
    col.addEventListener("click", newColor);
    colorPicker.appendChild(col);
  }

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
      pixArr[i].addEventListener("mouseover", funcMod.changeColor);
    }
    this.style.background = imaNoIro;
    this.dataset.color = imaNoIro;
  }

  function brush2() {
    let pixArr = document.querySelectorAll(".pixel");
    for (let i = 0; i < pixArr.length; i++) {
      pixArr[i].removeEventListener("mouseover", funcMod.changeColor);
    }
  }

  function makeMenuButton(name, id, func) {
    if (typeof name !== "string") {
      console.log("error, name argument is not a string");
    }
    let button = document.createElement("button");
    button.id = id;
    button.innerHTML = name.toUpperCase();
    button.addEventListener("click", func);
    menuBox.appendChild(button);
  }

  function clearCanvas() {
    let pixArr = document.querySelectorAll(".pixel");
    for (let i = 0; i < pixArr.length; i++) {
      pixArr[i].style.background = "";
      pixArr[i].dataset.color = "";
    }
  }

  function eraser() {
    imaNoIro = "";
    pixelPainter.removeEventListener("mouseleave", function() {
      let pixArr = document.querySelectorAll(".pixel");
      for (let i = 0; i < pixArr.length; i++) {
        pixArr[i].removeEventListener("mouseover", changeColor);
      }
    });
  }

  return {
    getWAndH: getWAndH,
    createCanvas: createCanvas,
    newColor: newColor,
    makeSwatch: makeSwatch,
    changeColor: changeColor,
    brush: brush,
    brush1: brush1,
    brush2: brush2,
    makeMenuButton: makeMenuButton,
    clearCanvas: clearCanvas,
    eraser: eraser
  };
};
