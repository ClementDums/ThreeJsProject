import StatesManager from "../StatesManager"
import SceneManager from "../Scene/SceneManager";

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


    updateClick(name) {
        this.currentObjectClicked = name;
        if (name === "toFilter") {
            SceneManager.currentScene.clickedFilter(name);
        }
    }


};
export default InteractionManager;
