import Pixel from "./pixel.js";
import PositionXY from "./positionxy.js";

export default class CanvasImage {
    constructor(width, height, ctx) {
        this.width = width;
        this.height = height;
        this.pixels = Array(width * height);
        this.ctx = ctx;
    }

    setColor(color) {
        // console.log(color.r);
        for(let i = 0; i < this.pixels.length; i++) {
            this.pixels[i] = new Pixel(color.r, color.g, color.b, color.a, new PositionXY(i % this.width, Math.floor(i / this.height)));
        }
    }

    addPixel(index, r,g,b,a) {
        this.pixels[index] = new Pixel(r,g,b,a, new PositionXY(index % this.width, Math.floor(index / this.height)));
    }

    getPixel(index) {
        return this.pixels[index];
    }

    useAlpha(bool) {
        if(!bool) {
            this.pixels.forEach( (pixel) => {
                let color = pixel.getColor();
                color.setA(1);
            });
        }
    }

    multiply(image) {
        console.error("UNIMPLEMENTED METHOD");
    }

    mix(image) {
        console.error("UNIMPLEMENTED METHOD");
    }

    add(image) {
        console.error("UNIMPLEMENTED METHOD");
    }

    subtract(image) {
        console.error("UNIMPLEMENTED METHOD");
    }

    print() {
        this.pixels.forEach( (pixel) => {
            console.log(pixel.toJSON());
        });
    }

    toImageData() {
        let output = this.ctx.createImageData(this.width, this.height);

        let j = 0;
        for(let i = 0; i < this.pixels.length; i++) {
            let col = this.pixels[i].getColor();
            output.data[j + 0] = col.r;
            output.data[j + 1] = col.g;
            output.data[j + 2] = col.b;
            output.data[j + 3] = col.a;
            
            j += 4;
        }

        return output;
    }
}