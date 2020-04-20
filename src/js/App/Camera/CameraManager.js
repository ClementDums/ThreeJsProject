import MainCamera from "./MainCamera/MainCamera";
import CameraLockManager from "./CameraLockManager";

export default class CameraManager {
    constructor(cameraMoveManager) {
        this.mainCamera = new MainCamera();
        this.cameraMovementManager = cameraMoveManager;
        this.cameraLockManager = new CameraLockManager(this);
        this.isLock = true;
        this.init()

    }

    init() {
        this._camera = this.mainCamera.camera;
        this.cameraLockManager.init();
        this.controls = this.cameraLockManager.controls;

    }

    lockCamera(){
        this.isLock = true;
        this.cameraLockManager.lock();
    }

    unlockCamera(){
        this.isLock = false;
        this.cameraLockManager.unlock();
    }


    get camera() {
        return this._camera;
    }
}

