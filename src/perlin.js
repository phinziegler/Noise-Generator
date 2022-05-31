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

        // Vectors from the 4 corners
        let ul_dif = posVec.subtract(ul.toVector().scale(this.scale));
        let ur_dif = posVec.subtract(ur.toVector().scale(this.scale));
        let ll_dif = posVec.subtract(ll.toVector().scale(this.scale));
        let lr_dif = posVec.subtract(lr.toVector().scale(this.scale));

        // dot products
        let ul_dot = ul_init.dotProduct(ul_dif) / this.scale;
        let ur_dot = ur_init.dotProduct(ur_dif) / this.scale;
        let ll_dot = ll_init.dotProduct(ll_dif) / this.scale;
        let lr_dot = lr_init.dotProduct(lr_dif) / this.scale;

        // interpolation
        // https://adrianb.io/2014/08/09/perlinnoise.html
        let u = Utils.fade((pos.x - (ul.x * this.scale)) / this.scale);
        let v = Utils.fade((pos.y - (ul.y * this.scale)) / this.scale);

        let x1 = Utils.lerp(ul_dot, ur_dot, u);
        let x2 = Utils.lerp(ll_dot, lr_dot, u);
        let avg = Utils.lerp(x1,x2,v);
        return avg;
    }
}