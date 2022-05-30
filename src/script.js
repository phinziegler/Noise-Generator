import CanvasImage from "./canvasImage.js";

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let width = canvas.width;
let height = canvas.height;


// Creates a CanvasImage from the canvas image data. 
function getCanvasData() {
    let img = ctx.createImageData(width,height);
    console.log(img.data.length);

    let data = img.data;

    let newImage = new CanvasImage(width, height);

    for(let i = 0; i < data.length; i = i + 4) {
        let r = i;
        let g = i + 1;
        let b = i + 2;
        let a = i + 3;

        newImage.addPixel(i / 4, data[r], data[g], data[b], data[a]);
    }
    console.log("done");
    return newImage;
}

getCanvasData();

function updateCanvas(imgData) {
    ctx.putImageData(imgData, 0, 0);
}