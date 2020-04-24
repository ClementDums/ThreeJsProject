import * as THREE from "three";
import {OutlinePass} from "three/examples/jsm/postprocessing/OutlinePass";

const PostProcessingManager = {
    init(scene, camera) {
        this.outlineObject = null;
        this.outlinePass = new OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), scene, camera);
        this.setupOutline();
    },

    setupOutline() {
        this.outlinePass.edgeStrength = 3.4;
        this.outlinePass.edgeGlow = 1;
        this.outlinePass.edgeThickness = 3.3;
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
