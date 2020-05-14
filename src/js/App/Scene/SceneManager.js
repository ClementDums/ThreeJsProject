import InsideScene from "./Museum/InsideScene";
import CameraManager from "../Camera/CameraManager";
import Loader from "../../Helpers/Loader";
import * as THREE from 'three'
import ModuleManager from "../Modules/ModuleManager";

const SceneManager = {
    init() {
        this.currentScene = new InsideScene();
        this.setupScene();
    },

    setupScene() {

        this._threeScene = this.currentScene.scene;
        this._sceneObjects = this.currentScene.objects;
        this.mixers = [];
        this.clock = new THREE.Clock();
        this._threeScene.add(CameraManager.controls.getObject());
        this.currentScene.init();
        this.loadScene();
        this.isAnimated = false;
        this._threeScene.add(CameraManager.camera);
        this.cssScene = new THREE.Scene();

    },

    loadSceneModels() {
        Loader.init();
        this._sceneObjects.forEach((item, i) => {
            item.load().then((obj) => {
                item._object = obj;
                item.setup();
                if (!item._isHud) {
                    this._threeScene.add(obj);
                    if (item._isAnimated) {
                        let mixer = new THREE.AnimationMixer(obj);
                        item.mixer = mixer;
                        this.mixers.push(mixer)
                    }
                } else {
                    CameraManager.mainCamera.camera.add(obj)
                }
            })
        })
    },

    loadScene() {
        this.loadSceneModels();
    },

    /**
     * Called after scene complete loading
     */
    afterLoad() {
        this.currentScene.playSounds()
    },

    /**
     * Animate scene for each frame
     */
    animate() {
        this.animateSceneModels();
        this.animateCamera();
        ModuleManager.animateModule();
    },

    animateSceneModels() {
        if (this.isAnimated) {
            let delta = this.clock.getDelta();
            for (let i = 0; i < this.mixers.length; ++i) {
                this.mixers[i].update(delta);
            }
        }
    },

    animateCamera() {
        CameraManager.animateCamera();
    },

    get scene() {
        return this._threeScene;
    }
};
export default SceneManager
