import Loader from '../../../Helpers/Loader'
import TextureManager from '../../Texture/TextureManager'
import * as THREE from 'three'
import TWEEN from "@tweenjs/tween.js"
import SceneManager from "../../Scene/SceneManager";
import CameraManager from "../../Camera/CameraManager";

export default class Phone {
    constructor() {
        this._cameraPosition = new THREE.Vector3(0, 0, 0);
        this._cameraRotation = new THREE.Vector3(0, 0, 0);
        this._path = './assets/3DModels/Iphone.glb';
        this._object = null;
        this._isHud = true;
        this.screen = null;
    }

    load() {
        return Loader.loadGLTF(this._path);
    }

    setup() {
        this._object.name = "Phone";
        //Small position
        // this._object.position.z = -8;
        // this._object.position.x = 4.5;
        // this._object.position.y = -3;
        //Big position
        this._object.position.x = 42;
        this._object.position.y = -67;
        this._object.position.z = -80;
        this.setBlackScreenTexture();
        this._object.layers.set(1);
    }

    setFullscreen() {
        //Fullscreen position
        const tween = new TWEEN.Tween(this._object.position) // Create a new tween that modifies 'coords'.
            .to({x: -2, y: -30, z: -65}, 1000) // Move to (300, 200) in 1 second.
            .easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.)
            .start();
    }

    zoomPhone(x) {
        CameraManager.phoneCamera.zoomInFilter(x)
    }


    setSmall() {
        const tween = new TWEEN.Tween(this._object.position) // Create a new tween that modifies 'coords'.
            .to({x: 42, y: -67, z: -80}, 1000) // Move to (300, 200) in 1 second.
            .easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.)
            .start();
        CameraManager.phoneCamera.zoomOutFilter();
    }

    setBlackScreenTexture() {
        this._object.traverse((child) => {
            child.layers.set(1);
            if (child.name === "ECRAN") {
                this.screen = child.children[0];
            }
        });

        let material2 = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            roughness: 0,
            metalness: 0.5,
        });
        this.screen.material = material2;
    }

    setCameraScreenTexture() {
        this._object.traverse((child) => {
            child.layers.set(1);
            if (child.name === "ECRAN") {
                this.screen = child.children[0];
            }
        });

        let material2 = new THREE.MeshBasicMaterial({color: 0xffffff, map: TextureManager.rtTexture.texture});
        this.screen.material = material2;
    }
}
