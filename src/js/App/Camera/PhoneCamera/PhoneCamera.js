import * as THREE from 'three'

export default class PhoneCamera {
    constructor() {
        this._camera = new THREE.PerspectiveCamera(40, 0.45, 0.1, 1000);
        console.log(this._camera);

        this.init();

    }

    init() {
        this._camera.position.x = 0;
        this._camera.position.z = 500;
        this._camera.position.y = 100;
        this._camera.name = "PhoneCamera";
        this._camera.layers.disable(1);

        console.log(this._camera.layers)

    }

    get camera() {
        return this._camera
    }

}
