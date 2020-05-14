import * as THREE from 'three'
import Flashlight from "../../Light/Flashlight";
import TWEEN from "@tweenjs/tween.js"

export default class MainCamera {
    constructor() {
        this._camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 4200);
        // this._camera.position.x = 0;
        // this._camera.position.y = 190;
        // this._camera.position.z = 2400;

        this._camera.position.x = 0;
        this._camera.position.y = 190;
        this._camera.position.z = -5508;

        this._camera.layers.enable(1);
        this.flashlight = new Flashlight();
        this.init();

    }

    init() {
    }

    setLeft() {
        const tweenCam = new TWEEN.Tween(this._camera.rotation) // Create a new tween that modifies 'coords'.
            .to({x: 0, y:Math.PI/2,z: 0}, 500) // Move to (300, 200) in 1 second.
            .easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.)
            .start();
    }

    setFront() {
         const tweenCam = new TWEEN.Tween(this._camera.rotation) // Create a new tween that modifies 'coords'.
            .to({x: 0, y:0,z: 0}, 500) // Move to (300, 200) in 1 second.
            .easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.)
            .start();
    }

    activeFlashLight() {
        this._camera.add(this.flashlight.flashlight);
        this.flashlight.enable()
    }

    get camera() {
        return this._camera
    }

}
