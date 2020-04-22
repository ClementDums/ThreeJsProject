import MainCamera from "./MainCamera/MainCamera";
import CameraLock from "./CameraLock";
import CameraMovement from "./CameraMovement";
import StatesManager from "../StatesManager";

const CameraManager = {
    init() {
        this.mainCamera = new MainCamera();
        this.cameraMovementManager = new CameraMovement(this.mainCamera.camera, this);
        this.cameraLockManager = new CameraLock(this);
        this.isLock = true;
        this.isCameraMoving = false;
        this._camera = this.mainCamera.camera;
        this.cameraLockManager.init();
        this.controls = this.cameraLockManager.controls;
    },

    lockCamera() {
        this.isLock = true;
        this.cameraLockManager.lock();
    },

    unlockCamera() {
        this.isLock = false;
        this.cameraLockManager.unlock();
    },

    startMove(state) {
        this.cameraMovementManager.move(state);
        this.isCameraMoving = true;
    },

    endMove() {
        StatesManager.endAction();
    },

    animateCamera() {
        if (this.isCameraMoving) {
            this.cameraMovementManager.animateMove();
        }
    },

    get camera() {
        return this._camera;
    }
};

export default CameraManager;

