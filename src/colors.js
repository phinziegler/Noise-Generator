import Color from "./color.js";

export {color};

const color = {
    WHITE:      new Color(255, 255, 255, 255),
    GRAY:       new Color(128, 128, 128, 255),
    BLACK:      new Color(  0,   0,   0, 255),
    RED:        new Color(255,   0,   0, 255),
    ORANGE:     new Color(255, 128,   0, 255),
    YELLOW:     new Color(255, 255,   0, 255),
    GREEN:      new Color(  0, 255,   0, 255),
    LIME:       new Color(128, 255,   0, 255),
    BLUE:       new Color(  0,   0, 255, 255),
    CYAN:       new Color(  0, 255, 255, 255),
    PURPLE:     new Color(155,   0, 155, 255),
    MAGENTA:    new Color(255,   0, 255, 255),
}