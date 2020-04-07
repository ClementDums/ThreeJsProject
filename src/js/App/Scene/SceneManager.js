import OutSideScene from "./OutSide/OutSideScene";

export default class SceneManager {
    constructor() {
        this.outSide = new OutSideScene();
        this.init()
    }

    init() {
        this._scene = this.outSide.scene;
        this.setupLights()
    }

    setupLights(){

    }

    get scene() {
        return this._scene;
    }
}
