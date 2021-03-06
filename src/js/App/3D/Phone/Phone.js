import Loader from '../../../Helpers/Loader'
import TextureManager from '../../Texture/TextureManager'
import * as THREE from 'three'
import TWEEN from "@tweenjs/tween.js"
import CameraManager from "../../Camera/CameraManager";

export default class Phone {
    constructor() {
        this._cameraPosition = new THREE.Vector3(0, 0, 0);
        this._cameraRotation = new THREE.Vector3(0, 0, 0);
        this._path = './assets/3DModels/Phone/Iphone.glb';
        this._object = null;
        this._isHud = true;
        this.screen = null;
        this.isZoomed = false;
        this.texture = null;

    }

    load() {
        return Loader.loadGLTF(this._path);
    }

    /**
     * Setup name, position, screen and texture
     */
    setup() {
        this._object.name = "Phone";
        this._object.position.x = 42;
        this._object.position.y = -100;
        this._object.position.z = -80;
        this.setBlackScreenTexture();
        this._object.layers.set(1);
        this._object.visible = false;
        this.texture = new THREE.TextureLoader().load('./assets/Image/404error.jpg');
        console.log(this.texture);
    }

    /**
     * Show phone
     */
    show() {
        this._object.visible = true;
        new TWEEN.Tween(this._object.position)
            .to({y: -67}, 1000)
            .easing(TWEEN.Easing.Quadratic.Out)
            .start();
    }

    /**
     * Hide phone
     */
    hide() {
        const tween = new TWEEN.Tween(this._object.position)
            .to({x: 42, y: -100, z: -80}, 1000)
            .easing(TWEEN.Easing.Quadratic.Out)
            .start();
        if (this.isZoomed) {
            CameraManager.phoneCamera.zoomOutFilter(100);
        }
        this.isZoomed = false;
    }

    /**
     * Show phone fullScreen
     */
    setFullscreen() {
        //Fullscreen position
        const tween = new TWEEN.Tween(this._object.position)
            .to({x: -2, y: -30, z: -65}, 1000)
            .easing(TWEEN.Easing.Quadratic.Out)
            .start();
    }

    /**
     * Show phone small
     */
    setSmall() {
        const tween = new TWEEN.Tween(this._object.position)
            .to({x: 42, y: -67, z: -80}, 1000)
            .easing(TWEEN.Easing.Quadratic.Out)
            .start();
        CameraManager.phoneCamera.zoomOutFilter(100);
    }

    /**
     * Zoom x in phone Camera
     * @param x
     */
    zoomPhone(x) {
        this.isZoomed = true;
        CameraManager.phoneCamera.zoomInFilter(x)
    }

    /**
     * Set render to texture on screen
     */
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

    /**
     * Set screen black
     */
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

    /**
     * Set 404 screen
     */
    set404Texture() {
        this._object.traverse((child) => {
            child.layers.set(1);
            if (child.name === "ECRAN") {
                this.screen = child.children[0];
            }
        });

        let material = new THREE.MeshBasicMaterial( { map: this.texture } );

        this.screen.material = material;
    }
}
