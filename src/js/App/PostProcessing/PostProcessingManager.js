import * as THREE from "three";
import {ShaderPass} from 'three/examples/jsm/postprocessing/ShaderPass.js';

import {OutlinePass} from "three/examples/jsm/postprocessing/OutlinePass";
import ShaderManager from "../Shader/ShaderManager"
import {VignetteShader} from 'three/examples/jsm/shaders/VignetteShader.js';
import TWEEN from "@tweenjs/tween.js"

const PostProcessingManager = {
    init(scene, camera) {
        this.outlineObject = null;
        this.outlinePass = new OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), scene, camera);
        this.colorifyPass = new ShaderPass(ShaderManager.ColorifyShader);
        const shaderVignette = VignetteShader;
        this.effectVignette = new ShaderPass(shaderVignette);
        this.setupOutline();
        this.setupColorify();
        this.setupVignette();
    },

    setupVignette() {
        // larger values = darker closer to center
        // darkness < 1  => lighter edges
        this.effectVignette.uniforms["offset"].value = 0;
        this.effectVignette.uniforms["darkness"].value = 1.3;
        this.effectVignette.renderToScreen = true;
    },
    setVignette(offset) {
        const tweenCam = new TWEEN.Tween(this.effectVignette.uniforms["offset"]) // Create a new tween that modifies 'coords'.
            .to({value: offset}, 1000) // Move to (300, 200) in 1 second.
            .easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.)
            .start();

    },

    setupColorify() {
        this.colorifyPass.uniforms["color"].value.setRGB(0, 0, 0);
    },
    easeColorify() {
        const tweenCam = new TWEEN.Tween(this.colorifyPass.uniforms["color"].value) // Create a new tween that modifies 'coords'.
            .to({r: 0,g:0,b:0}, 1000) // Move to (300, 200) in 1 second.
            .easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.)
            .start();
    },

    setupOutline() {
        this.outlinePass.edgeStrength = 10;
        this.outlinePass.edgeGlow = 1;
        this.outlinePass.edgeThickness = 2;
        this.outlinePass.pulsePeriod = 3;
    },

    setOutlineObject(item) {
        this.outlineObject = item;
        if (this.outlineObject) {
            this.outlinePass.selectedObjects = [this.outlineObject];
        } else {
            this.outlinePass.selectedObjects = [];
        }
    }
};

export default PostProcessingManager
