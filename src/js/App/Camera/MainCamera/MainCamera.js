import * as THREE from 'three'
import Flashlight from "../../Light/Flashlight";

export default class MainCamera {
    constructor() {
        this._camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 4000);
        this._camera.position.x = 0;
        this._camera.position.y = 190;
        this._camera.position.z = 800;

        this._camera.layers.enable(1);
        this.flashlight = new Flashlight();
        this.init();

    }

    init() {
    }

    setLeft() {
        this._camera.rotation.y = Math.PI / 2;
        this._camera.rotation.x = 0;
        this._camera.rotation.z = 0;
    }

    setFront() {
        this._camera.rotation.y = 0;
        this._camera.rotation.x = 0;
        this._camera.rotation.z = 0;
    }

    activeFlashLight() {
        this._camera.add(this.flashlight.flashlight);
        this.flashlight.enable()
    }

    get camera() {
        return this._camera
    }

}
