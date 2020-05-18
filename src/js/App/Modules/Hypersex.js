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
        this.statue = null;
    }

    /**
     * Init hidden objects and interaction
     * @param objects
     * @param phone
     * @param statue
     */
    init(objects, phone, statue) {
        this.hiddenObjects = objects;
        this.phone = phone;
        this.statue = statue;
        AudioHelpers.addSound("photo", './assets/Audio/photo.mp3', false);
        AudioHelpers.addSound("flashbass", './assets/Audio/flash_bass_3.mp3', false);
        this.initInteraction();
    }

    /**
     * Init Module interactions
     */
    initInteraction() {
        this.hypersexUi = document.querySelector("#hypersex");
        this.tuto = document.querySelector(".tutoHypersex");
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
        PostProcessingManager.setOutlineObject(this.statue._object.children[0], 5);
    }

    /**
     * Handle click on module
     * @param name
     */
    clickedModule(name) {
        if (name === "toHypersex") {
            RaycasterManager.identifiers.splice("toHypersex");
            PostProcessingManager.setOutlineObject(null, 0);
            this.hypersexModule();
        }
    }

    showTuto() {
        this.tuto.classList.add('visible');
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
        setTimeout(() => {
            this.showTuto();
        }, 400);
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
        PostProcessingManager.colorifyPass.uniforms["color"].value.setRGB(this.flashColor, this.flashColor, this.flashColor);
    }

    takePhoto() {
        this.flashColor = 0.2;

        this.flashPhoto();
        setTimeout(() => {
            this.removeFlash = true;
            AudioHelpers.playSound("flashbass");
            AudioHelpers.playSound("photo");
            PostProcessingManager.setVignette(1.0);
            setTimeout(() => {
                this.flashColor = 0.5;
                this.flashPhoto();
                this.showObjects();
                setTimeout(() => {
                    this.hideObjects();
                    this.removeFlash = false;
                    PostProcessingManager.easeColorify();
                    PostProcessingManager.setVignette(0);
                }, 400)
            }, 400);
        }, 800);

        setTimeout(() => {

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
        this.tuto.classList.remove('visible');
    }
};
