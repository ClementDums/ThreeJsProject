import appStates from '../Helpers/ExperienceStates';
import UIManager from './UI/UIManager'
import RaycasterManager from './Interaction/RaycasterManager'
import CameraManager from './Camera/CameraManager'
import SceneManager from './Scene/SceneManager'
import InsideScene from "./Scene/Museum/InsideScene";

const StatesManager = {

    init() {
        this.currentState = appStates.LANDING;
        this.scene = SceneManager.currentScene;
    },

    nextState(state) {
        this.currentState = state;
        this.newAction();
    },

    clicked(name) {
        if (name === "11") {
            if (this.currentState === appStates.FILTER) {
                this.nextState(appStates.EXPERIENCE1SCENE);
            }
        }
    },

    newAction() {
        switch (this.currentState) {
            case appStates.HALLWALK:
                InsideScene.hallWalk();
                break;

            case appStates.GALLERYSCREEN:
                InsideScene.galleryScreen();
                break;

            case appStates.GALLERYWALK:
                InsideScene.galleryWalk();
                break;

            case appStates.FILTER:
                InsideScene.clickOnFilter();
                break;

            case appStates.EXPERIENCE1SCENE:
                SceneManager.changeScene("filter");
                break;

            default:
                console.log("State not found");
                break;
        }
    },

    endAction() {
        if (this.currentState === appStates.HALLWALK) {
            this.nextState(appStates.GALLERYSCREEN)
        }
        if (this.currentState === appStates.GALLERYWALK) {
            this.nextState(appStates.FILTER)
        }
    }
};

export default StatesManager;


