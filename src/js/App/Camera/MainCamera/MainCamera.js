import * as THREE from 'three'
import Flashlight from "../../Light/Flashlight";
import FlashPhoto from "../../Light/FlashPhoto";

export default class MainCamera {
    constructor() {
        this._camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 4000);
        this._camera.position.x = 0;
        this._camera.position.y = 190;
        this._camera.position.z = 800;

        this._camera.layers.enable(1);
        this.flashlight = new Flashlight();
        this.flashphoto = new FlashPhoto();
        this.init();

    }

    init() {
        this._camera.add(this.flashlight.flashlight);
        this._camera.add(this.flashphoto.flashPhoto);
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
        this.flashlight.enable()
    }

    flash() {
        this.flashphoto.flash()
    }

    get camera() {
        return this._camera
    }

}
