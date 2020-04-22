import {PointerLockControls} from 'three/examples/jsm/controls/PointerLockControls.js';

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

        });
    }

    lock(){
        this.controls.lock();
    }
    unlock(){
        this.controls.unlock();
    }

}
