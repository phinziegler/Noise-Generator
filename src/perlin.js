import PositionXY from "./positionxy.js";
import Utils from "./utils.js";
import Vector2 from "./vector2.js";

// class Corner {
//     constructor(x,y) {
//         this.x = x;
//         this.y = y;
//         this.vector = new Vector2(Utils.random(-1,1), Utils.random(-1,1)).normalize();
//     }
// }

export default class Perlin {
    constructor(scale, seed, x, y) {
        this.scale = scale;
        this.seed = seed;
        this.x = x;
        this.y = y;
    }

    // what gridPoint does an x,y location correspond to??
    gridCorner(pos) {
        let gridX = Math.floor(pos.x / this.scale); // offset x by this.x??
        let gridY = Math.floor(pos.y / this.scale); // offset y by this.y??
        let out = new PositionXY(gridX, gridY);
        return out;
    }

    perlin(pos) {
        // input position represented as a vector
        let posVec = pos.toVector();

        // positions
        let ul = this.gridCorner(pos);
        let ur = new PositionXY(ul.x + 1, ul.y);
        let ll = new PositionXY(ul.x,              ul.y + 1);
        let lr = new PositionXY(ul.x + 1, ul.y + 1);

        // determine initial vectors
        let ul_init = new Vector2(Utils.seedRandom(ul.toString() + "X" + this.seed, -1,1), Utils.seedRandom(ul.toString() + "Y" + this.seed, -1,1)).normalize();
        let ur_init = new Vector2(Utils.seedRandom(ur.toString() + "X" + this.seed, -1,1), Utils.seedRandom(ur.toString() + "Y" + this.seed, -1,1)).normalize();
        let ll_init = new Vector2(Utils.seedRandom(ll.toString() + "X" + this.seed, -1,1), Utils.seedRandom(ll.toString() + "Y" + this.seed, -1,1)).normalize();
        let lr_init = new Vector2(Utils.seedRandom(lr.toString() + "X" + this.seed, -1,1), Utils.seedRandom(lr.toString() + "Y" + this.seed, -1,1)).normalize();

        // console.log(`FOR corner:${ul.toString()}, get ${ul_init.toString()}`);

        // Vectors from the 4 corners
        let ul_dif = posVec.subtract(ul.toVector().scale(this.scale));
        let ur_dif = posVec.subtract(ur.toVector().scale(this.scale));
        let ll_dif = posVec.subtract(ll.toVector().scale(this.scale));
        let lr_dif = posVec.subtract(lr.toVector().scale(this.scale));

        // console.log(ul_dif.toString());

        // dot products
        let ul_dot = ul_init.dotProduct(ul_dif) / this.scale;
        let ur_dot = ur_init.dotProduct(ur_dif) / this.scale;
        let ll_dot = ll_init.dotProduct(ll_dif) / this.scale;
        let lr_dot = lr_init.dotProduct(lr_dif) / this.scale;

        // console.log(`Dot of ${lr_init.toString()} and ${lr_dif.toString()} is ${lr_dot}`);

        // interpolation
        // ...
        return Utils.average(ul_dot, ur_dot, ll_dot, lr_dot);
    }
}