import RaycasterManager from "../Interaction/RaycasterManager";
import PostProcessingManager from "../PostProcessing/PostProcessingManager";

export default class Diversity {
    constructor() {
        this.phone = null;
        this.light = null;
        this.statue = null
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

    animate() {

    }

};

