import appState from "../../Helpers/ExperienceStates"
export default class InteractionManager {
    constructor(sceneManager){
        this.sceneManager = sceneManager;
        this.el = document.getElementById("game");
        this.hallClick();
        this.galleryClick();
    }
    hallClick(){
        this.el.querySelector("#hallButton").addEventListener("click",()=>{
            this.el.querySelector("#hall").style.display = "none";
            this.sceneManager.nextState(appState.HALLWALK)
        })
    }

     galleryClick(){
        this.el.querySelector("#galleryButton").addEventListener("click",()=>{
            this.el.querySelector("#gallery").style.display = "none";
            //this.sceneManager.startMove()
        })
    }
}
