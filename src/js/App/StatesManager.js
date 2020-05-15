import appStates from '../Helpers/ExperienceStates';
import SceneManager from './Scene/SceneManager'
import CameraManager from "./Camera/CameraManager";
import UIManager from "./UI/UIManager";
import ModuleManager from "./Modules/ModuleManager";

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
        switch (this.currentState) {
            case appStates.LANDING:
                this.currentState = appStates.HALLWALK;
                CameraManager.hallWalk();
                UIManager.displayHomeText();
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
                this.currentState = appStates.IMAGEGALLERY;
                break;

            case appStates.IMAGEGALLERY:
                this.currentState = appStates.SHARESECTION;
                UIManager.showMask();
                UIManager.hideMoral();
                UIManager.displayEndText();
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


