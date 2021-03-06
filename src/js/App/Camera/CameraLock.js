import {PointerLockControls} from 'three/examples/jsm/controls/PointerLockControls.js';
import CameraManager from "./CameraManager";
import UIManager from "../UI/UIManager";

export default class CameraLock {
    constructor(cameraManager) {
        this.cameraManager = cameraManager;
    }

    init() {
        this.controls = new PointerLockControls(this.cameraManager.camera
            , document.body);

        this.controls.addEventListener('lock', function () {
            console.log("locked")
        });

        this.controls.addEventListener('unlock', function () {
            CameraManager.isLock = false;
            if (CameraManager.isCameraMoving) {
                UIManager.showCursorLock();
            }
        });
    }

    checkLock() {
        if (CameraManager.isCameraMoving && !CameraManager.isLock) {
            CameraManager.lockCamera()
        }
    }

    lock() {
        this.controls.lock();
        UIManager.hideCursorLock();
    }

    unlock() {
        this.isLock = false;
        this.controls.unlock();
    }

}
