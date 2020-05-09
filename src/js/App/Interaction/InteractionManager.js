import StatesManager from "../StatesManager"
import AudioHelpers from "../../Helpers/Audio/AudioHelpers";
import ModuleManager from "../Modules/ModuleManager";

const InteractionManager = {

    init() {
        this.el = document.getElementById("game");
        this.header = this.el.querySelector("header");
        this.carousel = this.el.querySelector("#verticalCaroussel");
        this.clickListener = false;
        this.currentObjectClicked = null;
        this.landingClick();
        this.prevNextModule();
        //Init Modules on click
        this.phoneIconClick();
        //Init sound control on click
        this.initSound();
    },

    /**
     * Landing page clicks
     */
    landingClick() {
        this.el.querySelector("#startButton").addEventListener("click", () => {
            this.el.querySelector("#buttonContainer").style.display = "none";
            StatesManager.nextState();
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
            ModuleManager.clickedPhoneIcon();
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
     *  Handle Raycaster click
     * @param name
     */
    updateClick(name) {
        this.currentObjectClicked = name;
        if (name === "toFilter") {
            ModuleManager.moduleClick(name);
        }
        if (name === "toHypersex") {
            ModuleManager.moduleClick(name);
        }
    }

};
export default InteractionManager;
