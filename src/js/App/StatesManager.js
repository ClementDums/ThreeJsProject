import appStates from '../Helpers/ExperienceStates';
import SceneManager from './Scene/SceneManager'
import CameraManager from "./Camera/CameraManager";
import FilterManager from "./Modules/Filter";
import Hypersex from "./Modules/Hypersex";
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
                UIManager.displayHomeText(document.getElementById("hallWalk"));
                break;

            case appStates.HALLWALK:
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
                    UIManager.hideNextPrev();
                }
                else {
                    this.currentState = appStates.HYPERSEX;
                    CameraManager.toHypersex();
                    ModuleManager.changeModule(appStates.HYPERSEX)
                }
                break;

            case appStates.ENDINGWALK:
                this.currentState = appStates.ENDSTATUE;
                break;

            case appStates.ENDSTATUE:
                break;

            default:
                console.log("State not found");
                break;
        }
    },
};

export default StatesManager;


