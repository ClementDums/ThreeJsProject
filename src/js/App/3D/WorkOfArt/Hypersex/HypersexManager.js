import UIManager from "../../../UI/UIManager";
import CameraManager from "../../../Camera/CameraManager";

const HypersexManager = {
    hiddenObjects: [],


    init(objects) {
        this.hiddenObjects = objects
    },
    takePhoto() {
        CameraManager.mainCamera.flash();
        setTimeout(() => {
            this.showObjects();
        }, 1500);
    },

    showObjects() {
        this.hiddenObjects.forEach((item)=>{
            item.show();
        })
    },
    startStory() {
        UIManager.startTextDisplay(document.getElementById("filterStory"));
    },

    startHypersex(phone) {
        this.isFiltered = true;
        phone.setFullscreen();
        phone.zoomPhone(40);
    },

    endHypersex() {
    }


};


export default HypersexManager;
