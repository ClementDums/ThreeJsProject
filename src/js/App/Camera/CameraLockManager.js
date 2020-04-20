import {PointerLockControls} from 'three/examples/jsm/controls/PointerLockControls.js';

export default class CameraLockManager {
    constructor(cameraManager) {
        this.cameraManager = cameraManager;
    }

    init() {
        this.controls = new PointerLockControls(this.cameraManager.camera
            , document.body);

        this.controls.addEventListener('lock', function () {

        });

        this.controls.addEventListener('unlock', function () {

        });
    }

    lock(){
        this.controls.lock();
    }
    unlock(){
        this.controls.unlock();
    }

}
