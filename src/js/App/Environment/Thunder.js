import * as THREE from 'three'

export default class Thunder {

    constructor() {
        this._isAnimated = true;
        this._flash = null;
        this.init();
    }

    init() {
        this._flash = new THREE.PointLight(0xffffff, 30, 500, 1.7);
        this._flash.position.set(200, 1000, 100);
    }

    animate() {
        if (this._flash) {
            this.movement();
        }
    }

    movement() {
        if (Math.random() > 0.93 || this._flash.power > 100) {
            if (this._flash.power < 100)
                this._flash.position.set(
                   (Math.random() * 2 - 1)* 500,
                    300 + Math.random() * 200,
                    (Math.random() * 2 - 1) * 500
                );
            this._flash.power = 50 + Math.random() * 500;
        }
    }

    get object() {
        return this._flash
    }
}
