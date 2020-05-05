import UIManager from "../../../UI/UIManager";
import RaycasterManager from "../../../Interaction/RaycasterManager";
import InteractionManager from "../../../Interaction/InteractionManager";
import PostProcessingManager from "../../../PostProcessing/PostProcessingManager";

const HypersexManager = {
    hiddenObjects: [],
    phone: null,
    isFiltered: false,
    isSmall: true,
    flashSpeed: 0.1,
    flashColor: 0,
    removeFlash: false,

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
        document.getElementById("hypersex").style.display = "block"
    },

    animate() {
        if (this.flashColor > 0 && this.removeFlash) {
            this.flashColor -= this.flashSpeed;
            PostProcessingManager.colorifyPass.uniforms["color"].value.setRGB(this.flashColor, this.flashColor, this.flashColor);

            if (this.flashColor < 0) {
                this.flashColor = 0;
            }
        }
    },

    //Flash effet with colorify shader
    flashPhoto() {
        this.flashColor = 1;
        PostProcessingManager.colorifyPass.uniforms["color"].value.setRGB(this.flashColor, this.flashColor, this.flashColor);
    },

    //Take photo
    takePhoto() {
        this.flashPhoto();
        setTimeout(() => {
            this.removeFlash = true;
            setTimeout(() => {
                this.flashPhoto();
                this.showObjects();
                this.removeFlash = false;
            }, 600);
        }, 800);

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
        this.removeFlash = false;
    },


};


export default HypersexManager;
