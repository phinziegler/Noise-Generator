export default class Utils {
    constructor() { };

    static clamp(x, lo, hi) {
        return Math.max(lo, Math.min(x, hi));
    }

    static random(lo, hi) {
        return Math.random() * (hi - lo) + lo;
    }

    static seedRandom(seed, lo=0, hi=1) {
        // https://stackoverflow.com/a/47593316
        function xmur3(str) {
            for (var i = 0, h = 1779033703 ^ str.length; i < str.length; i++) {
                h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
                h = h << 13 | h >>> 19;
            } return function () {
                h = Math.imul(h ^ (h >>> 16), 2246822507);
                h = Math.imul(h ^ (h >>> 13), 3266489909);
                return (h ^= h >>> 16) >>> 0;
            }
        }
        function sfc32(a, b, c, d) {
            return function () {
                a >>>= 0; b >>>= 0; c >>>= 0; d >>>= 0;
                var t = (a + b) | 0;
                a = b ^ b >>> 9;
                b = c + (c << 3) | 0;
                c = (c << 21 | c >>> 11);
                d = d + 1 | 0;
                t = t + d | 0;
                c = c + t | 0;
                return (t >>> 0) / 4294967296;
            }
        }
        let hash = xmur3(seed);
        let rand = sfc32(hash(), hash(), hash(), hash());

        return rand() * (hi - lo) + lo;
    }

    static average(...args) {
        let sum = 0;
        let i = 0;
        args.forEach(element => {
            i++;
            sum += element;
        });
        let output = sum / i;
        return output;
    }
}