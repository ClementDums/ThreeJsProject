export default class MathsHelpers {

    init() {

    }

    static getRandomNumber(min, max) {
        return Math.random() * (max - min) + min;
    }

    static linearInterpolation(a, b, t) {
        return a + (b - a) * t
    }
}