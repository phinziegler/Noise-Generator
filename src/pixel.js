import Color from "./color.js";

export default class Pixel {
    constructor(r,g,b,a=1, position) {
        this.color = new Color(r,g,b,a);
        this.position = position;
    }

    setColor(color) {
        this.color = color;
    }

    getColor() {
        return this.color;
    }

    toJSON() {
        return (
            `
            {
                color: ${this.color.getRGBA()},
                position: ${this.position.toString()}
            }
            `
        );
    }
}