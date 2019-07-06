const pixelPainter = document.getElementById("pixelPainter");

pixelPainter.addEventListener("mouseleave",function (){
    let pixArr = document.querySelectorAll(".pixel");
    for (let i=0; i<pixArr.length;i++){
        pixArr[i].removeEventListener ("mouseover",changeColor);
    };
})

function changeColor (){
    this.style.background = imaNoColor;
};

for (let i=0;i<100;i++){
    for (let j=0;j<100;j++){
        let pix = document.createElement("div");
        pix.className = "pixel";
        pix.id = i+ "," +j;
        pix.addEventListener ("mousedown", function (){
            let pixArr = document.querySelectorAll(".pixel");
            for (let i=0;i<pixArr.length;i++){
                pixArr[i].addEventListener("mouseover", changeColor);
            };
            this.style.background = imaNoColor;
        });
        pix.addEventListener ("mouseup", function (){
            let pixArr = document.querySelectorAll(".pixel");
            for (let i=0; i<pixArr.length;i++){
                pixArr[i].removeEventListener ("mouseover",changeColor);
            };
        });
        pixelPainter.appendChild (pix);
    }
}

const colorPicker = document.createElement ("div");
colorPicker.id = "colorPicker";
document.body.appendChild (colorPicker);

const colorArray = ["red","blue","yellow","green","orange","purple","brown","black","white","pink"]

let imaNoColor = "white";

for (let i=0; i<5;i++){
    for (let j = 0; j<10;j++){
        let col = document.createElement ("div");
        col.className = "color";
        col.id = i+'col'+j;
        col.style.background = colorArray[Math.floor(Math.random()*colorArray.length)];
        col.addEventListener("click",atarashiColor);
        colorPicker.appendChild(col);
    }
};

function atarashiColor (){
    imaNoColor = this.style.background;
}

let clearButton = document.createElement("button");
clearButton.id = "clear";
clearButton.innerHTML = "CLEAR";
clearButton.addEventListener("click",clearCanvas);
document.body.appendChild(clearButton);


function clearCanvas (){
    let pixArr = document.querySelectorAll(".pixel");
    for (i=0;i<pixArr.length;i++){
        pixArr[i].style.background = "white";
    }
};

let eraserButton = document.createElement("button");
eraserButton.id = "eraser";
eraserButton.innerHTML = "ERASER";
eraserButton.addEventListener("click",eraserTool);
document.body.appendChild(eraserButton);

function eraserTool (){
    imaNoColor = "white";
}