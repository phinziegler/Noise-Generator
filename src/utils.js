export default class Utils {
    constructor(){};

    clamp(x, lo, hi) {
        return max(lo, min(x, hi));
    }
}