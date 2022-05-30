export default class Color {
    constructor(r,g,b,a=1) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
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
        this.a = Utils.clamp(x, 0, 1);
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