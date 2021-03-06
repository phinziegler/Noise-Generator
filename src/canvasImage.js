import Color from "./color.js";
import Perlin from "./perlin.js";
import Pixel from "./pixel.js";
import PositionXY from "./positionxy.js";

const MIX = "MIX";
const ADD = "ADD";
const MUL = "MUL";

export default class CanvasImage {
    constructor(width, height, ctx) {
        this.width = width;
        this.height = height;
        this.pixels = Array(width * height);
        this.ctx = ctx;
    }

    setColor(color) {
        for (let i = 0; i < this.pixels.length; i++) {
            this.pixels[i] = new Pixel(color.r, color.g, color.b, color.a, this.positionFromIndex(i));
        }
    }

    indexFromPosition(pos) {
        return (pos.y * this.width) + (pos.x % this.width);
    }

    positionFromIndex(index) {
        return new PositionXY(index % this.width, Math.floor(index / this.height));
    }

    colorPixel(pos, color) {
        let pixel = this.pixels[this.indexFromPosition(pos)];
        pixel.setColor(color);
    }

    addPixel(index, r, g, b, a) {
        this.pixels[index] = new Pixel(r, g, b, a, this.positionFromIndex(index));
    }

    getPixel(index) {
        return this.pixels[index];
    }

    useAlpha(bool) {
        if (!bool) {
            this.pixels.forEach((pixel) => {
                let color = pixel.getColor();
                color.setA(1);
            });
        }
    }

    combine(image, method, fac = 0.5) {
        let output = new CanvasImage(this.width, this.height, this.ctx);
        for (let i = 0; i < this.pixels.length; i++) {
            let p1 = this.pixels[i];
            let col1 = p1.getColor();

            let p2 = image.getPixel(i);
            let col2 = p2.getColor();

            let col3;
            switch (method) {
                case MIX:
                    col3 = col1.mix(col2, fac);
                    break;
                case MUL:
                    col3 = col1.multiply(col2, fac);
                    break;
                default:
                    console.error(`No such combination method '${method}'`);
            }
            output.addPixel(i, col3.r, col3.g, col3.b, col3.a);
        }
        return output;
    }

    print() {
        this.pixels.forEach((pixel) => {
            console.log(pixel.toJSON());
        });
    }

    toImageData() {
        let output = this.ctx.createImageData(this.width, this.height);

        let j = 0;
        for (let i = 0; i < this.pixels.length; i++) {
            let col = this.pixels[i].getColor();
            output.data[j + 0] = col.r;
            output.data[j + 1] = col.g;
            output.data[j + 2] = col.b;
            output.data[j + 3] = col.a;

            j += 4;
        }

        return output;
    }

    createNoise(scale, seed, x, y) {
        let p = new Perlin(scale, seed, x, y);
        for (let i = 0; i < this.pixels.length; i++) {
            let value = p.perlin(this.positionFromIndex(i));
            let val = ((value + 1) / 2) * 255;
            this.pixels[i] = new Pixel(val, val, val, 255, this.positionFromIndex(i));
        }
    }
}