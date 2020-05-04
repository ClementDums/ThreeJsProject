import appStates from '../Helpers/ExperienceStates';
import SceneManager from './Scene/SceneManager'
import CameraManager from "./Camera/CameraManager";
import FilterManager from "./3D/WorkOfArt/Filter/FilterManager";
import HypersexManager from "./3D/WorkOfArt/Hypersex/HypersexManager";
import UIManager from "./UI/UIManager";

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
                this.currentState = appStates.FILTER;
                FilterManager.startModule();
                break;

            case appStates.FILTER:
                this.currentState = appStates.HYPERSEX;
                FilterManager.endModule();
                HypersexManager.startModule();
                CameraManager.toHypersex();
                break;

            case appStates.HYPERSEX:
                HypersexManager.endModule();
                if (order === "next") {
                    this.currentState = appStates.DIVERSITY;
                    CameraManager.toDiversity();
                } else {
                    this.currentState = appStates.FILTER;
                    CameraManager.toFilter();
                    FilterManager.startModule();
                }
                break;

            case appStates.DIVERSITY:
                if (order === "next") {
                    this.currentState = appStates.ENDINGWALK;
                }
                else {
                    this.currentState = appStates.HYPERSEX;
                    CameraManager.toHypersex();
                    HypersexManager.startModule();
                }
                break;

            case appStates.ENDINGWALK:
                this.currentState = appStates.ENDSTATUE;
                CameraManager.endingWalk();
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


