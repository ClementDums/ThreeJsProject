import MainCamera from "./MainCamera/MainCamera";
import PhoneCamera from "./PhoneCamera/PhoneCamera";
import CameraLock from "./CameraLock";
import CameraMovement from "./CameraMovement";
import StatesManager from "../StatesManager";

const CameraManager = {
    init() {
        this.mainCamera = new MainCamera();
        this._phoneCamera = new PhoneCamera();
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
        this.cameraMovementManager.moveSpline(state);
        this.isCameraMoving = true;
    },

    endMove() {
        StatesManager.nextState();
        this.mainCamera.setLeft()
    },
    toFilter() {
        this.cameraMovementManager.moveTo(-550, -3900)
    },
    toHypersex() {
        this.cameraMovementManager.moveTo(-400, -4500)
    },

    toDiversity() {
        this.cameraMovementManager.moveTo(-440, -5100)
    },

    animateCamera() {
        if (this.isCameraMoving) {
            this.cameraMovementManager.animateMove();
        }
    },

    get camera() {
        return this._camera;
    },
    get phoneCamera() {
        return this._phoneCamera;
    }
};

export default CameraManager;

