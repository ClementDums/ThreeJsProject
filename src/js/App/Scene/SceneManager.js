import InsideScene from "./Museum/InsideScene";
import ScreenLoader from '../../Helpers/ScreenLoader';
import CameraManager from "../Camera/CameraManager";
import HypersexManager from "../3D/WorkOfArt/Hypersex/HypersexManager"


const SceneManager = {
    init() {
        this.currentScene = new InsideScene();
        this.setupScene();
    },

    setupScene() {
        this._threeScene = this.currentScene.scene;
        this._sceneObjects = this.currentScene.objects;
        this.isLoading = true;
        this._threeScene.add(CameraManager.controls.getObject());
        this.currentScene.init();
        this.loadScene();
        this._threeScene.add(CameraManager.camera)
    },

    loadSceneModels() {
        this.isLoading = true;
        this._sceneObjects.forEach((item, i) => {
            item.load().then((obj) => {
                item._object = obj;
                item.setup();
                if (!item._isHud) {
                    this._threeScene.add(obj);
                    if (item.hasPerf) {
                        item.perf();
                    }

                } else {
                    CameraManager.mainCamera.camera.add(obj)
                }
                if (i >= this._sceneObjects.length - 1) {
                    this.isLoading = false;
                    ScreenLoader.loadScreen(false);
                }
            })
        })
    },

    loadScene() {
        this.loadSceneModels();
        ScreenLoader.loadScreen(true);
    },

    /**
     * Animate scene for each frame
     */
    animate() {
        this.animateSceneModels();
        this.animateCamera();
        HypersexManager.animate();
        this.currentScene.animate();
    },

    animateSceneModels() {
        this._sceneObjects.forEach((item) => {
            if (item._isAnimated) {
                item.animate()
            }
        });
    },

    animateCamera() {
        CameraManager.animateCamera();
    },

    get scene() {
        return this._threeScene;
    }
};
export default SceneManager
