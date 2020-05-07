import UIManager from "../../../UI/UIManager";
import RaycasterManager from "../../../Interaction/RaycasterManager";
import InteractionManager from "../../../Interaction/InteractionManager";
import PostProcessingManager from "../../../PostProcessing/PostProcessingManager";
import AudioHelpers from "../../../../Helpers/Audio/AudioHelpers";

const HypersexManager = {
    hiddenObjects: [],
    phone: null,
    isFiltered: false,
    isSmall: true,
    flashSpeed: 0.1,
    flashColor: 0,
    removeFlash: false,
    purpleLight: null,

    //Init module
    init(objects, phone) {
        this.hiddenObjects = objects;
        this.phone = phone;
        AudioHelpers.addSound("photo", './assets/Audio/photo.mp3', false);
    },

    setLight(purpleLight) {
        this.pupleLight = purpleLight;
    },

    //Start module
    startModule() {
        this.clickOnHypersex();
        this.pupleLight.visible = true;
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
            console.log(this.flashColor)
        }
    },

    //Flash effect with colorify shader
    flashPhoto() {
        this.flashColor = 0.5;
        PostProcessingManager.colorifyPass.uniforms["color"].value.setRGB(this.flashColor, this.flashColor, this.flashColor);
    },

    //Take photo
    takePhoto() {
        this.flashPhoto();
        setTimeout(() => {
            this.removeFlash = true;
            setTimeout(() => {
                this.flashPhoto();
                AudioHelpers.playSound("photo");
                this.showObjects();
                PostProcessingManager.setVignette(1.3);
            }, 600);
        }, 800);

        setTimeout(() => {
            this.stopPhoneHypersex();
            this.removeFlash = false;

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
        PostProcessingManager.setVignette(0);
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
        this.pupleLight.visible = false;
    },


};


export default HypersexManager;
