import * as THREE from 'three'

import SceneManager from './Scene/SceneManager'
import CameraManager from "./Camera/CameraManager";


export default class Experience {

    constructor(isDebug) {
        console.log("Experience constructor");
        this.windowHalf = new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2);
        this.mouse = new THREE.Vector2();
        this._isDebug = isDebug;
        this.cameraManager = new CameraManager();
        this.sceneManager = new SceneManager(this.cameraManager);

        this.init();
        this._animate();
    }

    init() {
        this.container = document.getElementById('game');

        this.scene = this.sceneManager.scene;
        console.log(this.scene);
        this.scene.background = new THREE.Color(0xff00f0);

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        this.camera = this.cameraManager.camera;
        console.log(this.camera);
        this.scene.add(this.cameraManager.camera)
        this.container.appendChild(this.renderer.domElement);
        window.addEventListener('resize', this.onResize.bind(this));
    }

    _animate() {
        this.render();
        requestAnimationFrame(this._animate.bind(this));
    }

    render() {
        //Animate Scene
        this.sceneManager.animate();
        //Render
        this.renderer.render(this.scene, this.cameraManager.camera);
    }


    onResize() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        this.renderer.setSize(width, height);

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
    }

}
