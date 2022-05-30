import Utils from "./utils.js";

export default class Color {
    constructor(r,g,b,a=255) {
        this.r = Math.floor(Utils.clamp(r, 0, 255));
        this.g = Math.floor(Utils.clamp(g, 0, 255));
        this.b = Math.floor(Utils.clamp(b, 0, 255));
        this.a = Math.floor(Utils.clamp(a, 0, 255));
    }

    setColor(col) {
        this.r = col.r;
        this.g = col.g;
        this.b = col.b;
        this.a = col.a;
    }

    setR(x) {
        this.r = Math.floor(Utils.clamp(x, 0, 255));
    }
    setG(x) {
        this.g = Math.floor(Utils.clamp(x, 0, 255));
    }
    setB(x) {
        this.b = Math.floor(Utils.clamp(x, 0, 255));
    }
    setA(x) {
        this.a = Math.floor(Utils.clamp(x, 0, 255));
    }

    getR() {
        return this.r;
    }
    getG() {
        return this.g;
    }
    getB() {
        return this.b;
    }
    getA() {
        return this.a;
    }

    multiply(color, fac=1) {
        let newCol = new Color(
            (this.r * (color.r / 255)),
            (this.g * (color.g / 255)),
            (this.b * (color.b / 255))
        );
        
        return this.mix(newCol, fac);
    }

    mix(color, fac=0.5) {
        let newCol = new Color(
            (this.r * (1 - fac)) + (color.r * fac),
            (this.g * (1 - fac)) + (color.g * fac),
            (this.b * (1 - fac)) + (color.b * fac)    
        )
        return newCol;
    }

    getRGBA() {
        return `rgba(${this.r},${this.g},${this.b},${this.a})`;
    }

    setRGBA(r=this.r,g=this.g,b=this.b,a=this.a) {
        this.r = this.setR(r);
        this.g = this.setG(g);
        this.b = this.setB(b);
        this.a = this.setA(a);
    }

    getValue() {
        return (r + g + b) / (3 * 255);
    }
}