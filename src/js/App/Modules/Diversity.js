import RaycasterManager from "../Interaction/RaycasterManager";
import PostProcessingManager from "../PostProcessing/PostProcessingManager";

export default class Diversity {
    constructor() {
        this.phone = null;
        this.light = null;
        this.statue = null;
        this.isActive = false;

    }

    /**
     * Init interaction, statue
     * @param phone
     * @param statue
     */
    init(phone, statue) {
        this.phone = phone;
        this.statue = statue;
        this.initInteraction();
    }

    /**
     * Init Module interactions
     */
    initInteraction() {
        this.hypersexUi = document.querySelector("#diversity");
    }

    setLight(purpleLight) {
        this.light = purpleLight;
    }

    /**
     * Prepare click
     */
    enableModuleClick() {
        RaycasterManager.isActive = true;
        RaycasterManager.identifiers.push("toDiversity");
        PostProcessingManager.setOutlineObject(this.statue._object.children[0], 5);
    }

    /**
     * Handle click on module
     * @param name
     */
    clickedModule(name) {
        if (name === "toDiversity") {
            RaycasterManager.identifiers.splice("toDiversity");
            PostProcessingManager.setOutlineObject(null, 0);
            this.diversityModule();
        }
    }

    diversityModule() {
        if (!this.isActive) {
            this.startDiversity(this.phone)
        }
    }

    startDiversity(phone) {
        this.isActive = true;
        phone.setFullscreen();
        phone.zoomPhone(40);
        document.getElementById("diversity").style.display = "block"
    }

    animate() {

    }

};

