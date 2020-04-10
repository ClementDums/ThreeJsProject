import OutSideScene from "./OutSide/OutSideScene";

export default class SceneManager {
    constructor() {
        this.currentScene = new OutSideScene();
        this.init()
    }

    init() {
        this._threeScene = this.currentScene.scene;
        this._sceneObjects = this.currentScene.objects;
        this.currentScene.init();
        this.loadSceneModels()
    }

    loadSceneModels() {
        this._sceneObjects.forEach((item) => {
            item.load().then((obj) => {
                item._object = obj;
                item.setup();
                this._threeScene.add(obj)
            })
        })
    }

    setupLights() {

    }

    get scene() {
        return this._threeScene;
    }
}
