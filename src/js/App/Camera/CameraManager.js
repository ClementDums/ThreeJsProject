import MainCamera from "./MainCamera/MainCamera";
import PhoneCamera from "./PhoneCamera/PhoneCamera";
import CameraLock from "./CameraLock";
import CameraMovement from "./CameraMovement";
import StatesManager from "../StatesManager";
import appStates from '../../Helpers/ExperienceStates'
import AudioHelpers from '../../Helpers/Audio/AudioHelpers'
import UIManager from "../UI/UIManager";
import * as THREE from 'three'


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
            this.phoneTexture = false;

            this.setAudio()
        },

        lockCamera() {
            this.isLock = true;
            this.cameraLockManager.lock();
        },

        setAudio() {
            var listener = new THREE.AudioListener();
            this._camera.add(listener);
            AudioHelpers.setListener(listener);
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
            this.phoneTexture = false;
            this.cameraMovementManager.moveSpline(state);
            this.isCameraMoving = true;
            AudioHelpers.playSound("walk");
        },

        endMove(state) {
            AudioHelpers.pauseSound("walk");
            StatesManager.nextState();
            switch (state) {
                case appStates.HALLWALK:
                    this.rotate("left");
                    this.phoneTexture = true;
                    UIManager.hideHomeText();
                    break;
                case appStates.ENDINGWALK:
                    this.rotate("front");
                    StatesManager.nextState();
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
            this.cameraMovementManager.moveTo(-330, -5200)
        },

        hallWalk() {
            this.startMove(appStates.HALLWALK);
            //TODO : Add event end move listener
        },

        endingWalk() {
            this.cameraMovementManager.speed = 5;
            this.startMove(appStates.ENDINGWALK);
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

