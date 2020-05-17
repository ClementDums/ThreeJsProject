import appStates from '../Helpers/ExperienceStates';
import SceneManager from './Scene/SceneManager'
import CameraManager from "./Camera/CameraManager";
import UIManager from "./UI/UIManager";
import ModuleManager from "./Modules/ModuleManager";
import PostProcessingManager from "./PostProcessing/PostProcessingManager";

const StatesManager = {

    init() {
        this.currentState = appStates.LANDING;
        this.scene = SceneManager.currentScene;
    },

    nextState() {
        this.newAction("next");
    },
    prevState() {
        this.newAction("prev");
    },

    newAction(order) {
        //TODO: Clean this function
        switch (this.currentState) {
            case appStates.LANDING:
                this.currentState = appStates.HALLWALK;
                setTimeout(() => {
                    UIManager.setBlackFade();
                    setTimeout(() => {
                        CameraManager.mainCamera.isRotating = false;
                        CameraManager.mainCamera.setupHallPosition();
                        setTimeout(() => {
                            CameraManager.camera.rotation.set(0, 0, 0);
                            UIManager.removeBlackFade();
                            CameraManager.hallWalk();
                            UIManager.displayHomeText();
                        }, 1500)

                    }, 1000);
                }, 1500);
                break;

            case appStates.HALLWALK:
                CameraManager.toFilter();
                UIManager.displayNextPrev();
                this.currentState = appStates.FILTER;
                ModuleManager.changeModule(appStates.FILTER);

                break;

            case appStates.FILTER:
                this.currentState = appStates.HYPERSEX;
                ModuleManager.changeModule(appStates.HYPERSEX);
                CameraManager.toHypersex();
                break;

            case appStates.HYPERSEX:
                if (order === "next") {
                    this.currentState = appStates.DIVERSITY;
                    ModuleManager.changeModule(appStates.DIVERSITY);
                    CameraManager.toDiversity();
                } else {
                    this.currentState = appStates.FILTER;
                    CameraManager.toFilter();
                    ModuleManager.changeModule(appStates.FILTER);
                }
                break;

            case appStates.DIVERSITY:
                if (order === "next") {
                    this.currentState = appStates.ENDINGWALK;
                    ModuleManager.endModule();
                    CameraManager.endingWalk();
                    SceneManager.currentScene.removeVolumetric();
                    UIManager.hideNextPrev();
                    UIManager.displayMoral();
                    UIManager.hidePhoneText();
                    UIManager.phoneIconOff();
                }
                else {
                    this.currentState = appStates.HYPERSEX;
                    CameraManager.toHypersex();
                    ModuleManager.changeModule(appStates.HYPERSEX)
                }
                break;

            case appStates.ENDINGWALK:
                this.currentState = appStates.INVITESECTION;
                break;

            case appStates.INVITESECTION:
                this.currentState = appStates.IMAGEGALLERY;
                UIManager.hideMoral();
                UIManager.displayEndText();
                break;

            case appStates.IMAGEGALLERY:
                this.currentState = appStates.SHARESECTION;
                setTimeout(() => {
                    UIManager.newImageGallery();
                }, 500);
                break;

            case appStates.SHARESECTION:
                UIManager.hideImageGallery();
                break;


            default:
                console.log("State not found");
                break;
        }
    },
};

export default StatesManager;


