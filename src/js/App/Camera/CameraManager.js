import MainCamera from "./MainCamera/MainCamera";

export default class CameraManager {
    constructor(cameraMoveManager) {
        this.mainCamera = new MainCamera();
        this.cameraMovementManager = cameraMoveManager;
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

