import appStates from '../Helpers/ExperienceStates';
import SceneManager from './Scene/SceneManager'
import InsideScene from "./Scene/Museum/InsideScene";
import CameraManager from "./Camera/CameraManager";

const StatesManager = {

    init() {
        this.currentState = appStates.LANDING;
        this.scene = SceneManager.currentScene;
    },

    nextState() {
        this.newAction();
    },

    newAction() {
        switch (this.currentState) {
            case appStates.LANDING:
                this.currentState = appStates.HALLWALK;
                InsideScene.hallWalk();
                break;

            case appStates.HALLWALK:
                this.currentState = appStates.FILTER;
                SceneManager.currentScene.clickOnFilter();
                break;

            case appStates.FILTER:
                this.currentState = appStates.HYPERSEX;
                CameraManager.toHypersex();
                break;

            case appStates.HYPERSEX:
                this.currentState = appStates.DIVERSITY;
                CameraManager.toDiversity();
                break;

            default:
                console.log("State not found");
                break;
        }
    },


};

export default StatesManager;


