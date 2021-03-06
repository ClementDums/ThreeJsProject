import * as THREE from 'three'
import TWEEN from "@tweenjs/tween.js"
import CameraManager from "../CameraManager";

export default class PhoneCamera {
    constructor() {
        this._camera = new THREE.PerspectiveCamera(40, 0.45, 0.1, 1000);
        this.init();

    }

    init() {
        this._camera.position.x = -270;
        this._camera.position.y = 160;
        this._camera.position.z = -3900;
        this._camera.name = "PhoneCamera";
        this._camera.layers.disable(1);
        this._camera.layers.enable(3);

        this._camera.rotation.y = Math.PI / 2;
    }

    zoomInFilter(x) {
        const tweenCam = new TWEEN.Tween(this._camera.position) // Create a new tween that modifies 'coords'.
            .to({x: this._camera.position.x - x, y: this._camera.position.y + 40}, 1000) // Move to (300, 200) in 1 second.
            .easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.)
            .start();
    }

    zoomOutFilter(x) {
        const tweenCam = new TWEEN.Tween(this._camera.position) // Create a new tween that modifies 'coords'.
            .to({x: this._camera.position.x + x, y: this._camera.position.y - 40}, 1000) // Move to (300, 200) in 1 second.
            .easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.)
            .start();
    }

    get camera() {
        return this._camera
    }

}
