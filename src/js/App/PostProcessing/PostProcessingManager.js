import * as THREE from "three";
import {ShaderPass} from 'three/examples/jsm/postprocessing/ShaderPass.js';

import {OutlinePass} from "three/examples/jsm/postprocessing/OutlinePass";
import ShaderManager from "../Shader/ShaderManager"

const PostProcessingManager = {
    init(scene, camera) {
        this.outlineObject = null;
        this.outlinePass = new OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), scene, camera);
        this.colorifyPass = new ShaderPass(ShaderManager.ColorifyShader);
        this.setupOutline();
        this.setupColorify();
    },

    setupColorify() {
        this.colorifyPass.uniforms["color"].value.setRGB(0, 0, 0);
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
