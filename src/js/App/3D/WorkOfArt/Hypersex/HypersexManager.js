import UIManager from "../../../UI/UIManager";
import CameraManager from "../../../Camera/CameraManager";
import RaycasterManager from "../../../Interaction/RaycasterManager";
import InteractionManager from "../../../Interaction/InteractionManager";

const HypersexManager = {
    hiddenObjects: [],
    phone: null,
    isFiltered: false,

    init(objects, phone) {
        this.hiddenObjects = objects;
        this.phone = phone;
    },
    hypersexModule() {
        if (!this.isFiltered) {
            this.startHypersex(this.phone)
        }
    },
    takePhoto() {
        CameraManager.mainCamera.flash();
        setTimeout(() => {
            this.showObjects();

        }, 2500);
        setTimeout(() => {
            this.endHypersex();
        }, 4000);
    },

    showObjects() {
        this.hiddenObjects.forEach((item) => {
            item.show();
        })
    },

    startStory() {
        UIManager.newCarousel();
    },

    startHypersex(phone) {
        this.isFiltered = true;
        phone.setFullscreen();
        phone.zoomPhone(40);
        InteractionManager.initHypersex();
        document.getElementById("hypersex").style.display = "block"
    },

    stopHypersexModule() {
        this.phone.setSmall();
        this.phone.setBlackScreenTexture();
        document.getElementById("hypersex").style.display = "none"
    },

    endHypersex() {
        this.startStory();
        this.stopHypersexModule();
    },

    clickedHypersex(name) {
        if (name === "toHypersex") {
            RaycasterManager.identifiers.splice("toHypersex");
            this.hypersexModule();
        }
    },

    clickOnHypersex() {
        this.phone.setCameraScreenTexture();
        RaycasterManager.isActive = true;
        RaycasterManager.identifiers.push("toHypersex");
        InteractionManager.clickListener = true;
    }
};


export default HypersexManager;
