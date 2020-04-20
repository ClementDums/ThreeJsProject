export default class Interaction {
    constructor(sceneManager){
        this.sceneManager = sceneManager;
        this.el = document.getElementById("game");
        this.hallClick();
    }
    hallClick(){
        this.el.querySelector("#hallButton").addEventListener("click",()=>{
            this.el.querySelector("#hall").style.display = "none";
            this.sceneManager.startMove()
        })
    }
}
