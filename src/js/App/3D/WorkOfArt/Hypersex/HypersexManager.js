import UIManager from "../../../UI/UIManager";
import CameraManager from "../../../Camera/CameraManager";
import RaycasterManager from "../../../Interaction/RaycasterManager";
import InteractionManager from "../../../Interaction/InteractionManager";

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
        this.hiddenObjects.forEach((item) => {
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
    },


    clickedHypersex(name) {
        if (name === "toHypersex") {
            RaycasterManager.identifiers.splice("toHypersex");
            this.startHypersex(this.phone);
            this.takePhoto();
        }
    },

    clickOnHypersex() {
        RaycasterManager.isActive = true;
        RaycasterManager.identifiers.push("toHypersex");
        InteractionManager.clickListener = true;
    }
};


export default HypersexManager;
