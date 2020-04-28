import appStates from '../Helpers/ExperienceStates';
import SceneManager from './Scene/SceneManager'
import CameraManager from "./Camera/CameraManager";
import FilterManager from "./3D/WorkOfArt/Filter/FilterManager";
import HypersexManager from "./3D/WorkOfArt/Hypersex/HypersexManager";

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
                break;

            case appStates.HALLWALK:
                this.currentState = appStates.FILTER;
                FilterManager.clickOnFilter();
                break;

            case appStates.FILTER:
                this.currentState = appStates.HYPERSEX;
                HypersexManager.clickOnHypersex();
                CameraManager.toHypersex();
                break;

            case appStates.HYPERSEX:
                if (order === "next") {
                    this.currentState = appStates.DIVERSITY;
                    CameraManager.toDiversity();
                } else {
                    this.currentState = appStates.FILTER;
                    CameraManager.toFilter();
                }
                break;

            case appStates.DIVERSITY:
                if (order === "next") {
                    this.currentState = appStates.ENDWALK;
                }
                else {
                    this.currentState = appStates.HYPERSEX;
                    CameraManager.toHypersex();
                }
                break;

            case appStates.ENDWALK:
                CameraManager.endWalk();
                break;

            default:
                console.log("State not found");
                break;
        }
    },
};

export default StatesManager;


