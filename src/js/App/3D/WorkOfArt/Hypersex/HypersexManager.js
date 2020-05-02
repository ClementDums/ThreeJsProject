import UIManager from "../../../UI/UIManager";
import CameraManager from "../../../Camera/CameraManager";
import RaycasterManager from "../../../Interaction/RaycasterManager";
import InteractionManager from "../../../Interaction/InteractionManager";

const HypersexManager = {
    hiddenObjects: [],
    phone: null,
    isFiltered: false,
    isSmall: true,

    //Init module
    init(objects, phone) {
        this.hiddenObjects = objects;
        this.phone = phone;
    },

    //Start module
    startModule() {
        this.clickOnHypersex();
    },

    //Prepare module onClick
    clickOnHypersex() {
        this.phone.setCameraScreenTexture();
        RaycasterManager.isActive = true;
        RaycasterManager.identifiers.push("toHypersex");
        InteractionManager.clickListener = true;
    },

    //Handle filter clicks
    clickedHypersex(name) {
        if (name === "toHypersex") {
            RaycasterManager.identifiers.splice("toHypersex");
            this.hypersexModule();
        }
    },

    //Start phone hypersex
    hypersexModule() {
        if (!this.isFiltered) {
            this.startHypersex(this.phone)
        }
    },
    //Start hypersex with phone
    startHypersex(phone) {
        this.isFiltered = true;
        this.isSmall = false;
        phone.setFullscreen();
        phone.zoomPhone(40);
        InteractionManager.initHypersex();
        document.getElementById("hypersex").style.display = "block"
    },

    //Take photo
    takePhoto() {
        CameraManager.mainCamera.flash();
        setTimeout(() => {
            this.showObjects();

        }, 2500);
        setTimeout(() => {
            this.stopPhoneHypersex();
        }, 4000);
    },

    //Show hidden scene objects
    showObjects() {
        this.hiddenObjects.forEach((item) => {
            item.show();
        })
    },

    //Start carousel story
    startStory() {
        UIManager.newCarousel();
    },

    //Stop hypersex with phone
    stopPhoneHypersex() {
        if (!this.isSmall) {
            this.phone.setSmall();
            this.isSmall = true;
        }
        document.getElementById("hypersex").style.display = "none";
        this.startStory();
    },

    endModule() {
        this.isFiltered = false;
        this.resetModule();
    },

    resetModule() {
        this.stopPhoneHypersex();
        UIManager.deleteCarousel();
    },


};


export default HypersexManager;
