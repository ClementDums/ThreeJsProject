import OutSideScene from "./OutSide/OutSideScene";
import InsideScene from "./Museum/InsideScene";
import CameraManager from "../Camera/CameraManager";



export default class SceneManager {
    constructor(cameraManager) {
        this.currentScene = new InsideScene();
        this.cameraManager = cameraManager;
        this.init()
    }

    init() {
        this._threeScene = this.currentScene.scene;
        this._sceneObjects = this.currentScene.objects;
        this._huds = this.currentScene.huds;
        this._meteos = this.currentScene.meteo;

        this.currentScene.init();

        this.loadSceneModels();
    }

    loadSceneModels() {

        this._sceneObjects.forEach((item) => {
            item.load().then((obj) => {
                item._object = obj;
                item.setup();
                if (!item._isHud) {
                    this._threeScene.add(obj);
                } else {
                    this.cameraManager.mainCamera.camera.add(obj)
                }
            })
        })
    }


    animateSceneModels() {
        this._sceneObjects.forEach((item) => {
            if (item._isAnimated) {
                item.animate()
            }
        });

        this._huds.forEach((item) => {
        })
    }


    get scene() {
        return this._threeScene;
    }
}
