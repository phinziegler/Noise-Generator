import Pixel from "./pixel.js";
import PositionXY from "./positionxy.js";

export default class CanvasImage {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.pixels = Array(width * height);
    }

    addPixel(index, r,g,b,a) {
        this.pixels[index] = new Pixel(r,g,b,a, new PositionXY(index % this.width, Math.floor(index / this.height)));
    }

    getPixel(index) {
        return this.pixels[index];
    }

    multiply(inCol) {
        this.pixels.forEach( (pixel) => {
            let color = pixel.getColor();
            pixel.setColor(
                color.setR(color.r * inCol.r),
                color.setR(color.g * inCol.g),
                color.setR(color.b * inCol.b),
            );
        });
    }


    print() {
        this.pixels.forEach( (pixel) => {
            console.log(pixel.toJSON());
        });
    }

    toImageData() {
        let output = new Array(this.width * this.height * 4);
        this.pixels.forEach( (pixel) => {
            let col = pixel.getColor();
            output.push(col.r,col.g,col.b,col.a);
        });
        return output;
    }
}