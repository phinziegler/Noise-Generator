export default class PositionXY {
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }

    distance(pos) {
        return Math.sqrt( (this.x - pos.x)**2 + (this.y - pos.y)**2 );
    }

    toString() {
        return `(${this.x}, ${this.y})`
    }
}