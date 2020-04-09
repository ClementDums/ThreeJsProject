import * as THREE from 'three'

import SceneManager from './Scene/SceneManager'
import CameraManager from "./Camera/CameraManager";

import {PointerLockControls} from 'three/examples/jsm/controls/PointerLockControls.js';

export default class Experience {

    constructor(isDebug) {
        console.log("Experience constructor");
        this.windowHalf = new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2);
        this.mouse = new THREE.Vector2();
        this._isDebug = isDebug;
        this.cameraManager = new CameraManager();
        this.sceneManager = new SceneManager();

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

        this.camera = this.cameraManager.camera;
        console.log(this.camera);

        this.controls = new PointerLockControls(this.camera, document.body);
        const blocker = document.getElementById('blocker');
        const instructions = document.getElementById('instructions');

        instructions.addEventListener('click', () => {
            console.log("ok")
            this.controls.lock();
        }, false);
        this.controls.addEventListener('lock', function () {

            instructions.style.display = 'none';
            blocker.style.display = 'none';

        });



        this.controls.addEventListener('unlock', function () {

            blocker.style.display = 'block';
            instructions.style.display = '';

        });
        this.scene.add(this.controls.getObject());

        this.container.appendChild(this.renderer.domElement);
        document.addEventListener('mousemove', this.onDocumentMouseMove.bind(this), false);
        window.addEventListener('resize', this.onResize.bind(this));

    }

    _animate() {
        this.render();
        requestAnimationFrame(this._animate.bind(this));
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }

    onDocumentMouseMove() {
        this.mouse.x = (event.clientX - this.windowHalf.x);
        this.mouse.y = (event.clientY - this.windowHalf.x);
    }

    onResize() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        this.renderer.setSize(width, height);

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
    }


}
