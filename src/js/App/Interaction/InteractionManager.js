import StatesManager from "../StatesManager"
import FilterManager from "../3D/WorkOfArt/Filter/FilterManager";
import HypersexManager from "../3D/WorkOfArt/Hypersex/HypersexManager";

const InteractionManager = {

    init() {
        this.el = document.getElementById("game");
        this.clickListener = false;
        this.currentObjectClicked = null;
        this.landingClick();
        this.nextModule();
        this.prevModule();
    },

    landingClick() {
        this.el.querySelector("#hallButton").addEventListener("click", () => {
            this.el.querySelector("#hall").style.display = "none";
            StatesManager.nextState();
        })
    },

    prevModule() {
        this.el.querySelector("#prev").addEventListener("click", () => {
            StatesManager.prevState();
        })
    },

    nextModule() {
        this.el.querySelector("#next").addEventListener("click", () => {
            StatesManager.nextState();
        })
    },

    /**
     *
     * @param name
     */
    updateClick(name) {
        this.currentObjectClicked = name;
        if (name === "toFilter") {
            FilterManager.clickedFilter(name);
        }
        if (name === "toHypersex") {
            HypersexManager.clickedHypersex(name);
        }
    }

};
export default InteractionManager;
