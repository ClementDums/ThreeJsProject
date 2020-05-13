import UIManager from "../UI/UIManager";
import RaycasterManager from "../Interaction/RaycasterManager";
import PostProcessingManager from "../PostProcessing/PostProcessingManager";
import AudioHelpers from "../../Helpers/Audio/AudioHelpers";

export default class Hypersex {
    constructor() {
        this.hiddenObjects = [];
        this.phone = null;
        this.isActive = false;
        this.flashSpeed = 0.1;
        this.flashColor = 0;
        this.removeFlash = false;
        this.light = null;
        this.isCompleted = false;
    }

    /**
     * Init hidden objects and interaction
     * @param objects
     * @param phone
     */
    init(objects, phone) {
        this.hiddenObjects = objects;
        this.phone = phone;
        AudioHelpers.addSound("photo", './assets/Audio/photo.mp3', false);
        AudioHelpers.addSound("flashbass", './assets/Audio/flash_bass_3.mp3', false);
        this.initInteraction();
    }

    /**
     * Init Module interactions
     */
    initInteraction() {
        this.hypersexUi = document.querySelector("#hypersex");
        this.photoClick();
    }

    setLight(purpleLight) {
        this.light = purpleLight;
    }

    /**
     * Prepare click
     */
    enableModuleClick() {
        RaycasterManager.isActive = true;
        RaycasterManager.identifiers.push("toHypersex");
    }

    /**
     * Handle click on module
     * @param name
     */
    clickedModule(name) {
        if (name === "toHypersex") {
            RaycasterManager.identifiers.splice("toHypersex");
            this.hypersexModule();
        }
    }

    hypersexModule() {
        if (!this.isActive) {
            this.startHypersex(this.phone)
        }
    }

    startHypersex(phone) {
        this.isActive = true;
        phone.setFullscreen();
        phone.zoomPhone(40);
        document.getElementById("hypersex").style.display = "block"
    }


    animate() {
        if (this.flashColor > 0 && this.removeFlash) {
            this.flashColor -= this.flashSpeed;
            PostProcessingManager.colorifyPass.uniforms["color"].value.setRGB(this.flashColor, this.flashColor, this.flashColor);
            if (this.flashColor < 0) {
                this.flashColor = 0;
            }
        }
    }

    photoClick() {
        this.hypersexUi.querySelector("#photo").addEventListener("click", () => {
            this.takePhoto();
            UIManager.phoneIconOn();
            UIManager.phoneTextIn();
        })
    }

    /**
     * Flash effect with colorify shader.0
     */
    flashPhoto() {
        this.flashColor = 0.5;
        PostProcessingManager.colorifyPass.uniforms["color"].value.setRGB(this.flashColor, this.flashColor, this.flashColor);
    }

    takePhoto() {
        this.flashPhoto();
        setTimeout(() => {
            this.removeFlash = true;
            this.showObjects();
            AudioHelpers.playSound("flashbass");
            PostProcessingManager.setVignette(1.3);
            setTimeout(() => {
                this.flashPhoto();
                AudioHelpers.playSound("photo");
                this.hideObjects()
            }, 600);
        }, 600);

        setTimeout(() => {
            this.removeFlash = false;
            PostProcessingManager.easeColorify();
        }, 3000);
    }

    /**
     * Show hidden objects
     */
    showObjects() {
        this.hiddenObjects.forEach((item) => {
            item.show();
        })
    }

    /**
     * Hide hidden objects
     */
    hideObjects() {
        this.hiddenObjects.forEach((item) => {
            item.hide();
        })
    }

    /**
     * Start carousel story
     */
    startStory() {
        UIManager.newCarousel(document.getElementById("hypersexStory"));
    }

    stopPhone() {
        this.isCompleted = true;
        PostProcessingManager.setVignette(0);
        this.phone.hide();
        document.getElementById("hypersex").style.display = "none";
        this.startStory()
    }

    resetModule() {
        // this.stopPhone();
        this.removeFlash = false;
        this.light.visible = false;
        RaycasterManager.identifiers.splice("toHypersex");
    }
};
