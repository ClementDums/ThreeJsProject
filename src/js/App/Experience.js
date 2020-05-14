import * as THREE from 'three'
import SceneManager from './Scene/SceneManager'
import CameraManager from "./Camera/CameraManager";
import RaycasterManager from "./Interaction/RaycasterManager"
import InteractionManager from "./Interaction/InteractionManager"
import StatesManager from "./StatesManager"
import UIManager from "./UI/UIManager"
import TextureManager from "./Texture/TextureManager"
import TWEEN from "@tweenjs/tween.js"
import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer.js';
import PostProcessingManager from './PostProcessing/PostProcessingManager'
import {RenderPass} from 'three/examples/jsm/postprocessing/RenderPass.js';
import {ShaderPass} from 'three/examples/jsm/postprocessing/ShaderPass.js';
import {FXAAShader} from 'three/examples/jsm/shaders/FXAAShader.js';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {GUI} from 'three/examples/jsm/libs/dat.gui.module.js';
import {GammaCorrectionShader} from "three/examples/jsm/shaders/GammaCorrectionShader";
import ModuleManager from "./Modules/ModuleManager";
import {CSS3DRenderer} from "three/examples/jsm/renderers/CSS3DRenderer";

export default class Experience {
    constructor(isDebug) {
        console.log("Experience constructor");
        this.windowHalf = new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2);
        this._mouse = new THREE.Vector2();
        this._isDebug = isDebug;
        this.currentObjectClicked = null;
        this.composer = null;

        //Init managers
        CameraManager.init();
        ModuleManager.init();
        SceneManager.init();
        UIManager.init();

        InteractionManager.init();
        StatesManager.init();
        TextureManager.init();

        //Experience states Manager
        this.init();
        this._animate();
    }

    init() {
        this.container = document.getElementById('game');

        this.scene = SceneManager.scene;
        console.log(this.scene);
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        this.camera = CameraManager.camera;
        this.scene.add(this.camera);
        this.container.appendChild(this.renderer.domElement);
        //------------------------------------TEST

        this.cssRenderer = new CSS3DRenderer();
        this.cssRenderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById('image_gallery').appendChild(this.cssRenderer.domElement);

        //------------------------------------TEST


        this.gui = new GUI();
        this.guiParams = {freeCamera: false};
        //hide / show free camera
        this.gui.add(this.guiParams, 'freeCamera').listen().onChange((value) => {
            this.controls = new OrbitControls(this.camera, this.renderer.domElement);

            this.controls.enabled = value;
            document.getElementById('ui').style.display = (value) ? 'none' : 'block';
        });

        this.postProcessing();

        //Event listeners
        window.addEventListener('resize', this.onResize.bind(this));
        window.addEventListener('mousemove', this.onDocumentMouseMove.bind(this), false);
        document.addEventListener('click', this.onDocumentMouseClick.bind(this))
    }



    postProcessing() {
        PostProcessingManager.init(SceneManager.scene, this.camera);
        this.composer = new EffectComposer(this.renderer);
        const renderPass = new RenderPass(SceneManager.scene, this.camera);
        this.composer.addPass(renderPass);
        this.composer.addPass(PostProcessingManager.outlinePass);

        this.composer.addPass(PostProcessingManager.colorifyPass);
        this.composer.addPass(PostProcessingManager.effectVignette);
        const gamma = new ShaderPass(GammaCorrectionShader);
        this.composer.addPass(gamma);

        const effectFXAA = new ShaderPass(FXAAShader);
        effectFXAA.uniforms['resolution'].value.set(1 / window.innerWidth, 1 / window.innerHeight);
        this.composer.addPass(effectFXAA);

    }

    _animate() {
        this.render();
        requestAnimationFrame(this._animate.bind(this));
        TWEEN.update()
    }

    render() {
        //Animate Scene
        SceneManager.animate();
        this.currentObjectClicked = RaycasterManager.getTouchedElement(this._mouse, CameraManager.camera, this.scene);
        //Render
        //Phone camera render
        if (CameraManager.phoneTexture) {
            this.renderer.setRenderTarget(TextureManager.rtTexture);
            this.renderer.clear();
            this.renderer.render(SceneManager.scene, CameraManager.phoneCamera.camera);
        }
        // Debug camera render
        // this.renderer.setRenderTarget(null);
        // this.renderer.clear();
        // this.renderer.render(SceneManager.scene, this.camera);

        this.cssRenderer.render(SceneManager.cssScene, this.camera);

        // //Main camera render
        this.renderer.setRenderTarget(null);
        this.renderer.clear();
        this.composer.render();
    }


    onResize() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        this.renderer.setSize(width, height);
        this.cssRenderer.setSize(width, height);
        this.composer.setSize(width, height);

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
    }

    onDocumentMouseMove(event) {
        this._mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this._mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }

    onDocumentMouseClick() {
        const currentObjectClicked = RaycasterManager.getClickedOnTouchedElement();
        InteractionManager.updateClick(currentObjectClicked);
    }

    onGuiDebugChange(value) {
        console.log(value)
    }
}
