import StatesManager from "../StatesManager"
import FilterManager from "../3D/WorkOfArt/Filter/FilterManager";
import HypersexManager from "../3D/WorkOfArt/Hypersex/HypersexManager";

const InteractionManager = {

    init() {
        this.el = document.getElementById("game");
        this.header = this.el.querySelector("header");
        this.clickListener = false;
        this.currentObjectClicked = null;
        this.landingClick();
        this.nextModule();
        this.prevModule();
    },

    initFilter() {
        this.filter = this.el.querySelector("#filter");
        this.prevFilter();
        this.nextFilter();
    },

    initHypersex() {
        this.hypersex = this.el.querySelector("#hypersex");
        this.takePhoto();
    },

    landingClick() {
        this.el.querySelector("#startButton").addEventListener("click", () => {
            this.el.querySelector("#buttonContainer").style.display = "none";
            StatesManager.nextState();
        })
    },

    prevModule() {
        this.header.querySelector("#prev").addEventListener("click", () => {
            StatesManager.prevState();
        })
    },

    nextModule() {
        this.header.querySelector("#next").addEventListener("click", () => {
            StatesManager.nextState();
        })
    },

    /***FILTER***/

    prevFilter() {
        this.filter.querySelector(".prev").addEventListener("click", () => {
            FilterManager.setPrev();
        })
    },
    nextFilter() {
        this.filter.querySelector(".next").addEventListener("click", () => {
            FilterManager.setNext();
        })
    },

    /****HYPERSEX***/
    takePhoto() {
        this.hypersex.querySelector("#photo").addEventListener("click", () => {
            HypersexManager.takePhoto();
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
