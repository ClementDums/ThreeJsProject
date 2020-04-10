import OutSideScene from "./OutSide/OutSideScene";

export default class SceneManager {
    constructor() {
        this.currentScene = new OutSideScene();
        this.init()
    }

    init() {
        this._threeScene = this.currentScene.scene;
        this.currentScene.init();
        this.loadSceneModels()
    }

    loadSceneModels() {
        this.currentScene.objects.forEach((item) => {
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
