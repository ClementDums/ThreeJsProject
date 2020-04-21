import InsideScene from "./Museum/InsideScene";
import InteractionManager from "../Interaction/InteractionManager";
import appStates from '../../Helpers/ExperienceStates';
import ScreenLoader from '../../Helpers/ScreenLoader';


export default class SceneManager {
    constructor(cameraManager) {
        this.currentScene = new InsideScene();
        this.interactionManager = new InteractionManager(this);
        this.cameraManager = cameraManager;
        this.isLoading = true;
        this.currentState = appStates.LANDING;

        this.init()
    }

    init() {
        this._threeScene = this.currentScene.scene;
        this._sceneObjects = this.currentScene.objects;
        this._threeScene.add(this.cameraManager.controls.getObject());
        this.currentScene.init();
        this.loadScene();
    }


    nextState(state) {
        this.currentState = state;

        switch (state) {
            case appStates.HALLWALK:
                this.cameraManager.startMove("hallWalk");
                break;
            default:
                console.log("State not found");
                break;
        }
    }


    loadSceneModels() {
        this.isLoading = true;
        this._sceneObjects.forEach((item, i) => {
            item.load().then((obj) => {
                item._object = obj;
                item.setup();
                if (!item._isHud) {
                    this._threeScene.add(obj);
                } else {
                    this.cameraManager.mainCamera.camera.add(obj)
                }
                if (i >= this._sceneObjects.length - 1) {
                    this.isLoading = false;
                    ScreenLoader.loadScreen(false);
                }
            })
        })
    }

    animate() {
        this.animateSceneModels();
        this.animateCamera();
    }

    animateSceneModels() {
        this._sceneObjects.forEach((item) => {
            if (item._isAnimated) {
                item.animate()
            }
        });
    }

    animateCamera() {
        this.cameraManager.animateCamera();
    }

    loadScene() {
        this.loadSceneModels();
        ScreenLoader.loadScreen(true);
    }


    get scene() {
        return this._threeScene;
    }
}
