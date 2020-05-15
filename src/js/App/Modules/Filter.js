import UIManager from "../UI/UIManager";
import RaycasterManager from "../Interaction/RaycasterManager";
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
        this.filterUi = null;
        this.isCompleted = false;
    }

    /**
     * Init module
     */
    init(phone, statue0, statue1, statue2, statue3) {
        this.phone = phone;
        this.objects.push(statue0, statue1, statue2, statue3);
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
        RaycasterManager.isActive = true;
        RaycasterManager.identifiers.push("toFilter");
        PostProcessingManager.setOutlineObject(this.objects[0]._object.children[0], 5);
    }

    /**
     * Handle filter click
     * @param namer
     */
    clickedModule(name) {
        if (name === "toFilter") {
            RaycasterManager.identifiers.splice("toFilter");
            PostProcessingManager.setOutlineObject(null, 0);
            this.filterModule();
        }
        if (name === "prev") {
            this.setPrev();
        }
        if (name === "next") {
            this.setNext();
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
        phone.zoomPhone(70);
        //Animate
        SceneManager.isAnimated = true;
        document.getElementById("filter").style.display = "block"
        this.showNext();
        this.hidePrev();
        this.hideMiddle();
    }

    animate() {

    }

    stopPhone() {
        this.isCompleted = true;
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
        this.showNext();
        if (this.objects[this.i - 1]) {
            this.showMiddle();
            this.showPrev();
            this.setCurrentDisable();
            this.currentObject = this.objects[this.i - 1];
            this.setCurrentActive();
            this.i -= 1;
            this.heartAnim();
            this.setVignette();
            if (this.i === 0) {
                this.hidePrev();
                this.hideMiddle();
            }
        }
    }

    /**
     * Go to next filter
     */
    setNext() {
        this.showPrev();
        if (this.objects[this.i + 1]) {
            this.showMiddle();
            this.showNext();
            this.setCurrentDisable();
            this.currentObject = this.objects[this.i + 1];
            this.setCurrentActive();
            this.i += 1;
            this.heartAnim();
            this.setVignette();
            if (this.i === this.objects.length - 1) {
                this.hideNext();
                UIManager.phoneIconOn();
                UIManager.phoneTextIn();
            }
        }
    }

    hidePrev() {
        this.filterUi.querySelector(".prev").style.display = "none";
    }

    showPrev() {
        this.filterUi.querySelector(".prev").style.display = "block";
    }

    hideMiddle() {
        this.filterUi.querySelector(".middle").style.display = "none";
    }

    showMiddle() {
        this.filterUi.querySelector(".middle").style.display = "block";
    }

    hideNext() {
        this.filterUi.querySelector(".next").style.display = "none";
    }

    showNext() {
        this.filterUi.querySelector(".next").style.display = "block";
    }

    heartAnim() {
        if (this.i !== 0) {
            this.currentObject.heartAnim.show();
            this.currentObject.heartAnim.animate();
        }
    }

    /**
     * Show current object
     */
    setCurrentActive() {
        this.currentObject.show();
    }

    setVignette() {
        //Post proccessing effect
        switch (this.i) {
            case 0:
                PostProcessingManager.setVignette(0);
                break;
            case 1:
                PostProcessingManager.setVignette(0.5);
                break;
            case 2:
                PostProcessingManager.setVignette(0.8);
                break;
            case 3:
                PostProcessingManager.setVignette(1.0);
                break;
            default:
                break
        }

    }

    /**
     * Disable current object
     */
    setCurrentDisable() {
        this.currentObject.hide();
        if (this.i !== 0) {
            this.currentObject.heartAnim.hide();
        }
    }


    /**
     * End Filter module
     */
    resetModule() {
        // this.stopPhone();
        this.resetFilter();
        this.light.visible = false;
        RaycasterManager.identifiers.splice("toFilter");
        SceneManager.isAnimated = false;
    }


    /**
     * Reset Filter
     */
    resetFilter() {
        this.setCurrentDisable();
        this.i = 0;
        this.currentObject = this.objects[0];
        this.setCurrentActive();
        this.setVignette();
    }
};

