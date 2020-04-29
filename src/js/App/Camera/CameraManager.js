import MainCamera from "./MainCamera/MainCamera";
import PhoneCamera from "./PhoneCamera/PhoneCamera";
import CameraLock from "./CameraLock";
import CameraMovement from "./CameraMovement";
import StatesManager from "../StatesManager";
import appStates from '../../Helpers/ExperienceStates'


const CameraManager = {
        init() {
            this.mainCamera = new MainCamera();
            this._camera = this.mainCamera.camera;

            this._phoneCamera = new PhoneCamera();
            this.cameraMovementManager = new CameraMovement(this.mainCamera.camera, this);
            this.cameraLockManager = new CameraLock(this);
            this.isLock = true;
            this.isCameraMoving = false;
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

        /**
         *
         * @param state
         */
        startMove(state) {
            this.cameraMovementManager.moveSpline(state);
            this.isCameraMoving = true;
        },

        endMove(state) {
            StatesManager.nextState();
            switch (state) {
                case appStates.HALLWALK:
                    this.rotate("left");
                    break;
                case appStates.ENDWALK:
                    this.rotate("front");
                    break;
            }
        },

        /**
         *
         * @param side
         */
        rotate(side) {
            switch (side) {
                case "left" :
                    this.mainCamera.setLeft();
                    break;
                case "front" :
                    this.mainCamera.setFront();
                    break;
            }
        },

        toFilter() {
            this.cameraMovementManager.moveTo(-382, -3900)
        },
        toHypersex() {
            this.cameraMovementManager.moveTo(-350, -4500)
        },

        toDiversity() {
            this.cameraMovementManager.moveTo(-440, -5100)
        },

        hallWalk() {
            this.startMove(appStates.HALLWALK);
            //TODO : Add event end move listener
        },

        endWalk() {
            this.startMove(appStates.ENDWALK);
        },

        /**
         * Animate camera each frame
         */
        animateCamera() {
            if (this.isCameraMoving) {
                this.cameraMovementManager.animateMove();
            }
        }
        ,

        get camera() {
            return this._camera;
        }
        ,

        get phoneCamera() {
            return this._phoneCamera;
        }
    }
;

export default CameraManager;

