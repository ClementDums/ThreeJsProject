import StatesManager from "../StatesManager"
import AudioHelpers from "../../Helpers/Audio/AudioHelpers";
import ModuleManager from "../Modules/ModuleManager";
import UIManager from "../UI/UIManager";
import CameraManager from "../Camera/CameraManager";

const InteractionManager = {

    init() {
        this.el = document.getElementById("game");
        this.header = this.el.querySelector("header");
        this.carousel = this.el.querySelector("#verticalCaroussel");
        this.landingClick();
        this.prevNextModule();
        //Init Modules on click
        this.phoneIconClick();
        //Init sound control on click
        this.initSound();
        this.initEndButtons();
        this.initAbout();
        this.initFullScreen();
        this.initLock();
        this.started = false;
    },

    initLock() {
        document.addEventListener("click", CameraManager.cameraLockManager.checkLock)
    },

    /**
     * Landing page clicks
     */
    landingClick() {
        this.el.querySelector("#startButton").addEventListener("click", () => {
            if (!this.started) {
                this.started =true;
                this.el.querySelector("#buttonContainer").classList.remove("visible");
                StatesManager.nextState();
            }

        })
    },

    /**
     * Click on next and previous module
     */
    prevNextModule() {
        this.header.querySelector("#prev").addEventListener("click", () => {
            StatesManager.prevState();
        });
        this.header.querySelector("#next").addEventListener("click", () => {
            StatesManager.nextState();
        })
    },


    phoneIconClick() {
        this.el.querySelector(".phoneOn").addEventListener("click", () => {
            ModuleManager.clickedPhoneIcon()
        })
    },

    /**
     * Sound control
     */
    initSound() {
        this.el.querySelector("#soundOn").addEventListener("click", () => {
            AudioHelpers.muteMaster();
            this.el.querySelector("#soundOff").classList.add("visible");
            this.el.querySelector("#soundOn").classList.remove("visible");
        });

        this.el.querySelector("#soundOff").addEventListener("click", () => {
            AudioHelpers.unmuteMaster();
            this.el.querySelector("#soundOff").classList.remove("visible");
            this.el.querySelector("#soundOn").classList.add("visible");
        });
    },
    /**
     * Fullscreen control
     */
    initFullScreen() {
        this.el.querySelector("#fullscreenOn").addEventListener("click", () => {
            UIManager.openFullscreen();
            this.el.querySelector("#fullscreenOff").classList.add("visible");
            this.el.querySelector("#fullscreenOn").classList.remove("visible");
        });

        this.el.querySelector("#fullscreenOff").addEventListener("click", () => {
            UIManager.closeFullscreen();
            this.el.querySelector("#fullscreenOff").classList.remove("visible");
            this.el.querySelector("#fullscreenOn").classList.add("visible");
        });
        document.addEventListener('fullscreenchange', e => {
            if (!document.fullscreenElement) {
                this.el.querySelector("#fullscreenOff").classList.remove("visible");
                this.el.querySelector("#fullscreenOn").classList.add("visible");
            }
        });


    },


    initEndButtons() {
        this.el.querySelector("#toGallerySection").addEventListener("click", UIManager.toGallerySection);
        this.el.querySelector("#toShareSection").addEventListener("click", UIManager.toShareSection);
    },
    initAbout() {
        this.el.querySelector("#aboutBtn").addEventListener("click", UIManager.showAbout);
        this.el.querySelector("#quitAboutBtn").addEventListener("click", UIManager.hideAbout);
    },
    /**
     *  Handle Raycaster click
     * @param name
     */
    updateClick(name) {
        if (name) {
            if (name === "toFilter") {
                ModuleManager.moduleClick(name);
            }
            if (name === "toHypersex") {
                ModuleManager.moduleClick(name);
            }
            if (name === "toDiversity") {
                ModuleManager.moduleClick(name);
            }
        }
    }

};
export default InteractionManager;
