import InsideScene from "./Museum/InsideScene";
import ScreenLoader from '../../Helpers/ScreenLoader';
import CameraManager from "../Camera/CameraManager";
import FilterScene from "./Museum/FilterScene";


const SceneManager = {


    init() {
        // this.currentScene = new InsideScene();
        this.currentScene = new FilterScene();
        this.setupScene();
    },

    setupScene() {
        this._threeScene = this.currentScene.scene;
        this._sceneObjects = this.currentScene.objects;
        this.isLoading = true;
        this._threeScene.add(CameraManager.controls.getObject());
        this.currentScene.init();
        this.loadScene();

    },

    loadSceneModels() {
        this.isLoading = true;
        this._sceneObjects.forEach((item, i) => {
            item.load().then((obj) => {
                item._object = obj;
                item.setup();
                if (!item._isHud) {
                    this._threeScene.add(obj);
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

    phoneScreenCamera(){

    },

    changeScene(scene) {
        switch (scene) {
            case "filter":
                this.currentScene = new FilterScene();
        }
        this.setupScene();
    },

    animate() {
        this.animateSceneModels();
        this.animateCamera();
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

    loadScene() {
        this.loadSceneModels();
        ScreenLoader.loadScreen(true);
    },


    get scene() {
        return this._threeScene;
    }
};
export default SceneManager
