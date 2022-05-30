import Utils from "./utils.js";

export default class Color {
    constructor(r,g,b,a=255) {
        this.r = Math.floor(Utils.clamp(r, 0, 255));
        this.g = Math.floor(Utils.clamp(g, 0, 255));
        this.b = Math.floor(Utils.clamp(b, 0, 255));
        this.a = Math.floor(Utils.clamp(a, 0, 255));
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

    multiply(color) {
        this.setR(this.r * (color.getR() / 255));
        this.setG(this.g * (color.getG() / 255));
        this.setB(this.b * (color.getB() / 255));
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