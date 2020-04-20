import OutSideScene from "./OutSide/OutSideScene";
import InsideScene from "./Museum/InsideScene";
import InteractionManager from "../Interaction/Interaction";

export default class SceneManager {
    constructor(cameraManager, cameraMove) {
        this.currentScene = new InsideScene();
        this.interactionManager = new InteractionManager(this);
        this.cameraMove = cameraMove;
        this.cameraManager = cameraManager;
        this.isLoading = true;
        this.isCameraMoving = false;
        this.init()
    }

    init() {
        this._threeScene = this.currentScene.scene;
        this._sceneObjects = this.currentScene.objects;
        this._huds = this.currentScene.huds;

        this._threeScene.add(this.cameraManager.controls.getObject());

        this.currentScene.init();

        this.loadScene();
    }


    startMove() {
        //
        this.cameraMove.init();
        this._threeScene.add(this.cameraMove.splineParent);
        this.isCameraMoving = true;
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
                    this.loader();
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
        if (this.isCameraMoving) {
            this.cameraMove.animateMove();
        }
    }

    loadScene() {
        this.loadSceneModels();
        this.loader()
    }

    loader() {
        const loader = document.getElementById('loader');
        if (!this.isLoading) {
            loader.style.display = 'none';
            return
        }
        loader.style.display = 'block';
    }

    get scene() {
        return this._threeScene;
    }
}
