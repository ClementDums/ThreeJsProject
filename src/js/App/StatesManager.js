import appStates from '../Helpers/ExperienceStates';
import UIManager from './UI/UIManager'
import RaycasterManager from './Interaction/RaycasterManager'
import CameraManager from './Camera/CameraManager'

const StatesManager = {

    init() {
        this.currentState = appStates.LANDING;
    },

    nextState(state) {
        this.currentState = state;
        this.newAction();
    },

    newAction() {
        switch (this.currentState) {
            case appStates.HALLWALK:
                CameraManager.startMove(appStates.HALLWALK);
                break;

            case appStates.GALLERYSCREEN:
                UIManager.showGalleryScreen();
                break;

            case appStates.GALLERYWALK:
                CameraManager.startMove(appStates.GALLERYWALK);
                break;

            case appStates.EXPERIENCE1:
                RaycasterManager.isActive = true;
                RaycasterManager.identifier = "11";
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
            this.nextState(appStates.EXPERIENCE1)
        }
    }
};

export default StatesManager;


