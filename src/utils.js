export default class Utils {
    constructor(){};

    static clamp(x, lo, hi) {
        return Math.max(lo, Math.min(x, hi));
    }
}