import UIManager from "../UI/UIManager";
import RaycasterManager from "../Interaction/RaycasterManager";
import InteractionManager from "../Interaction/InteractionManager";
import PostProcessingManager from "../PostProcessing/PostProcessingManager";
import SceneManager from "../Scene/SceneManager";


export default class Filter {
    constructor() {
        this.objects = [];
        this.currentObject = null;
        this.i = 0;
        this.isActive = false;
        this.phone = null;
        this.light = null;
        this.heart = null;
        this.filterUi = null;
        this.isClickable = false;
    }

    /**
     * Init module
     */
    init(phone, heart, statue0, statue1, statue2, statue3) {
        this.phone = phone;
        this.objects.push(statue0, statue1, statue2, statue3);
        this.heart = heart;
        this.currentObject = statue0;
        this.initInteraction();
    }

    setLight(purpleLight) {
        this.light = purpleLight;
    }

    /**
     * Prepare module onClick
     */
    enableModuleClick() {
        RaycasterManager.identifiers.push("toFilter");
    }

    /**
     * Handle filter click
     * @param name
     */
    clickedModule(name) {
        if (this.isClickable) {
            if (name === "toFilter") {
                RaycasterManager.identifiers.splice("toFilter");
                this.filterModule();
            }
            if (name === "prev") {
                this.setPrev();
            }
            if (name === "next") {
                this.setNext();
            }
            if (name === "exit") {
                this.stopPhoneFilter();
            }
        }
    }

    /**
     * Init Module interactions
     */
    initInteraction() {
        this.filterUi = document.querySelector("#filter");
        this.prevFilter();
        this.nextFilter();
    }

    prevFilter() {
        this.filterUi.querySelector(".prev").addEventListener("click", () => {
            this.setPrev();
        })
    }

    nextFilter() {
        this.filterUi.querySelector(".next").addEventListener("click", () => {
            this.setNext();
        })
    }

    filterModule() {
        if (!this.isActive) {
            this.startPhoneFilter(this.phone);
        }
    }

    /**
     * Start phone filter
     * @param phone
     */
    startPhoneFilter(phone) {
        this.isActive = true;
        //Fullscreen phone
        phone.setFullscreen();
        phone.zoomPhone(100);
        //Post proccessing effect
        PostProcessingManager.setVignette(1.1);
        //Animate
        this.heart.show();
        SceneManager.isAnimated = true;
        document.getElementById("filter").style.display = "block"
    }

    animate() {

    }

    stopPhoneFilter() {
        PostProcessingManager.setVignette(0);
        this.phone.hide();
        document.getElementById("filter").style.display = "none";
        this.startStory();
    }

    /**
     * Start story
     */
    startStory() {
        UIManager.newCarousel(document.getElementById("filterStory"));
    }

    /**
     * Go to previous filter
     */
    setPrev() {
        if (this.objects[this.i - 1]) {
            this.setCurrentDisable();
            this.currentObject = this.objects[this.i - 1];
            this.setCurrentActive();
            this.i -= 1;
        }
    }

    /**
     * Go to next filter
     */
    setNext() {
        if (this.objects[this.i + 1]) {
            this.setCurrentDisable();
            this.currentObject = this.objects[this.i + 1];
            this.setCurrentActive();
            this.i += 1;
            if (this.i === this.objects.length - 1) {
                this.stopPhoneFilter()
            }
        }
    }

    /**
     * Show current object
     */
    setCurrentActive() {
        this.currentObject.show();
    }

    /**
     * Disable current object
     */
    setCurrentDisable() {
        this.currentObject.hide();
    }

    /**
     * End Filter module
     */
    resetModule() {
        this.stopPhoneFilter();
        this.resetFilter();
        this.light.visible = false;
        this.heart.hide();
        RaycasterManager.identifiers.splice("toFilter");
        InteractionManager.clickListener = false;
        SceneManager.isAnimated = false;
    }


    /**
     * Reset Filter
     */
    resetFilter() {
        this.setCurrentDisable();
        this.i = 0;
        this.currentObject = this.objects[0];
        this.setCurrentActive()
    }
};

