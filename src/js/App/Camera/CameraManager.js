import MainCamera from "./MainCamera/MainCamera";

export default class CameraManager {
    constructor() {
        this.mainCamera = new MainCamera();
        this.isLock = true;
        this.init()

    }

    init() {
        this._camera = this.mainCamera.camera
    }

    get camera() {
        return this._camera;
    }
}

