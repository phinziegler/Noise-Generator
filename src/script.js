import CanvasImage from "./canvasImage.js";
import Color from "./color.js";
import Perlin from "./perlin.js";
import Utils from "./utils.js";
import {color} from "./colors.js";

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

function updateCanvas(imgData) {
    ctx.putImageData(imgData, 0,0,0,0, width, height);
}

function noise(scale, color, fac) {
    let img = new CanvasImage(width, height, ctx);
    img.createNoise(scale, String(scale), 0, 0);

    if(color != null) {
        let img2 = new CanvasImage(width, height, ctx);
        img2.setColor(color);
        img = img.combine(img2, "MUL", fac);
    }

    return img;
}

let noise1 = noise(100, color.RED, 0.3);
let noise2 = noise(50, color.CYAN, 1);
let noise3 = noise(20, color.MAGENTA, 1);

let mix = noise1.combine(noise2, "MUL", 0.2).combine(noise3, "MUL", 0.15);

updateCanvas(mix.toImageData());