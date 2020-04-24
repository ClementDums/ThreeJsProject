import appState from "../../Helpers/ExperienceStates"
import StatesManager from "../StatesManager"

const InteractionManager = {

    init() {
        this.el = document.getElementById("game");
        this.clickListener = false;
        this.currentObjectClicked = null;
        this.hallClick();
        this.galleryClick();
    },

    hallClick() {
        this.el.querySelector("#hallButton").addEventListener("click", () => {
            this.el.querySelector("#hall").style.display = "none";
            //StatesManager.nextState(appState.HALLWALK);
        })
    },

    galleryClick() {
        this.el.querySelector("#galleryButton").addEventListener("click", () => {
            this.el.querySelector("#gallery").style.display = "none";
            StatesManager.nextState(appState.GALLERYWALK);
        })
    },

    updateClick(name){
        this.currentObjectClicked = name;
        StatesManager.clicked(name);
    }




};
export default InteractionManager;
