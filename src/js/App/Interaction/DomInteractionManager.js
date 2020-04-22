import appState from "../../Helpers/ExperienceStates"
import StatesManager from "../StatesManager"

const DomInteractionManager = {
    init() {
        this.el = document.getElementById("game");
        this.hallClick();
        this.galleryClick();
    },

    hallClick() {
        this.el.querySelector("#hallButton").addEventListener("click", () => {
            this.el.querySelector("#hall").style.display = "none";
            StatesManager.nextState(appState.HALLWALK);
        })
    },

    galleryClick() {
        this.el.querySelector("#galleryButton").addEventListener("click", () => {
            this.el.querySelector("#gallery").style.display = "none";
            StatesManager.nextState(appState.GALLERYWALK);
        })
    }
};
export default DomInteractionManager;
