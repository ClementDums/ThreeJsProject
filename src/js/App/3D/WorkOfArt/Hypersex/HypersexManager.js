import UIManager from "../../../UI/UIManager";
import CameraManager from "../../../Camera/CameraManager";

const HypersexManager = {
    hiddenObjects: [],


    init(statue0, statue1, statue2, statue3) {
        this.hiddenObjects.push(statue0, statue1, statue2, statue3);
        this.currentObject = statue0;
    },
    setCurrentActive() {
        this.currentObject.enableFilter();
    },

    setCurrentDisable() {
        this.currentObject.disableFilter();
    },

    takePhoto(){
        CameraManager.mainCamera.flash();
    },

    startStory() {
        UIManager.startTextDisplay(document.getElementById("filterStory"));
    },

    startHypersex(phone) {
        this.isFiltered = true;
        phone.setFullscreen();
        phone.zoomPhone(40);
    },

    endFilter(){
        console.log("end")
    }


};


export default HypersexManager;
