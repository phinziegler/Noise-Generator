export default class Vector2 {
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }

    magnitude() {
        let out = Math.sqrt((this.x**2) + (this.y**2));
        return out;
    }

    dotProduct(vector) {
        return (this.x * vector.x) + (this.y * vector.y);
    }
    
    normalize() {
        let mag = this.magnitude();
        return new Vector2(this.x / mag, this.y / mag);
    }

    subtract(vector) {
        return new Vector2(this.x - vector.x, this.y - vector.y);
    }

    toString() {
        return `<${this.x}, ${this.y}>`;
    }

    scale(s) {
        return new Vector2(this.x * s, this.y * s);
    }
}