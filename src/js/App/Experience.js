import * as THREE from 'three'

import SceneManager from './Scene/SceneManager'
import CameraManager from "./Camera/CameraManager";
import RaycasterManager from "./Interaction/RaycasterManager"
import InteractionManager from "./Interaction/InteractionManager"
import StatesManager from "./StatesManager"
import UIManager from "./UI/UIManager"

export default class Experience {

    constructor(isDebug) {
        console.log("Experience constructor");
        this.windowHalf = new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2);
        this._mouse = new THREE.Vector2();
        this._isDebug = isDebug;
        this.currentObjectClicked = null;

        CameraManager.init();
        SceneManager.init();
        InteractionManager.init();
        StatesManager.init();
        UIManager.init();

        //Experience states Manager

        this.init();
        this._animate();
    }

    init() {
        this.container = document.getElementById('game');

        this.scene = SceneManager.scene;
        console.log(this.scene);
        this.scene.background = new THREE.Color(0xff00f0);

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        this.camera = CameraManager.camera;
        this.scene.add(CameraManager.camera);
        this.container.appendChild(this.renderer.domElement);
        window.addEventListener('resize', this.onResize.bind(this));
        window.addEventListener('mousemove', this.onDocumentMouseMove.bind(this), false);
        window.addEventListener('click', this.onDocumentMouseClick.bind(this), false);

    }

    _animate() {
        this.render();
        requestAnimationFrame(this._animate.bind(this));
    }

    render() {
        //Animate Scene
        SceneManager.animate();

        this.currentObjectClicked = RaycasterManager.getTouchedElement(this._mouse, CameraManager.camera, this.scene);
        //Render
        this.renderer.render(SceneManager.scene, CameraManager.camera);
    }


    onResize() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        this.renderer.setSize(width, height);

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
    }

    onDocumentMouseMove(event) {
        this._mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this._mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }

    onDocumentMouseClick() {
       const currentObjectClicked =  RaycasterManager.getClickedOnTouchedElement();
       InteractionManager.updateClick(currentObjectClicked);
    }

}
