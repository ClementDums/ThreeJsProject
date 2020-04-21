import MainCamera from "./MainCamera/MainCamera";
import CameraLockManager from "./CameraLockManager";
import CameraMovementManager from "./CameraMovementManager";

export default class CameraManager {
    constructor() {
        this.mainCamera = new MainCamera();
        this.cameraMovementManager = new CameraMovementManager(this.mainCamera.camera,this);
        this.cameraLockManager = new CameraLockManager(this);
        this.isLock = true;
        this.isCameraMoving = false;
        this.init()

    }

    init() {
        this._camera = this.mainCamera.camera;
        this.cameraLockManager.init();
        this.controls = this.cameraLockManager.controls;

    }

    lockCamera() {
        this.isLock = true;
        this.cameraLockManager.lock();
    }

    unlockCamera() {
        this.isLock = false;
        this.cameraLockManager.unlock();
    }

    startMove() {
        this.cameraMovementManager.move();
        this.isCameraMoving = true;
    }

    animateCamera() {
        if (this.isCameraMoving) {
            this.cameraMovementManager.animateMove();
        }
    }

    get camera() {
        return this._camera;
    }
}

