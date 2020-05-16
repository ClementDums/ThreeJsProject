import UIManager from "../UI/UIManager";
import RaycasterManager from "../Interaction/RaycasterManager";
import PostProcessingManager from "../PostProcessing/PostProcessingManager";
import SceneManager from "../Scene/SceneManager";


export default class Filter {
    constructor() {
        this.carousel = null;
        this.carouselPos = 25;
        this.objects = [];
        this.currentObject = null;
        this.i = 0;
        this.previousI = 0;
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
    }

    /**
     * Init Module interactions
     */
    initInteraction() {
        this.filterUi = document.querySelector("#filter");
        this.carousel = this.filterUi.querySelector(".carousel");
        this.filterBtn = this.filterUi.querySelectorAll(".filterBtn");
        this.filterBtn.forEach((btn) => {
            btn.addEventListener('click', this.handleBtnClick.bind(this));
        })
    }

    handleBtnClick(e) {
        this.filterBtn.forEach(btn => {
            btn.classList.remove('active');
        });
        const btn = e.target;
        btn.classList.add("active");
        this.getIndexAttribute(btn)
    }

    getIndexAttribute(btn) {
        const ind = btn.getAttribute("data-ind");
        this.previousI= parseInt(this.i);
        this.i = parseInt(ind);
        this.scroll();
    }

    scroll() {
        if (this.previousI == this.i) {
            return
        }
        if (this.previousI < this.i) {
            this.scrollNext();

        } else {
            this.scrollPrev();
        }
    }

    scrollPrev() {
        this.carouselPos += 25;
        this.carousel.style.transform = "translateX(" + this.carouselPos + "%)";
        this.setPrev();
    }

    scrollNext() {
        this.carouselPos -= 25;
        this.carousel.style.transform = "translateX(" + this.carouselPos + "%)";
        this.setPrev();
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
        this.setCurrentDisable();
        this.currentObject = this.objects[this.i];
        this.setCurrentActive();
        this.heartAnim();
        this.setVignette();
        if (this.i === this.objects.length - 1) {
            UIManager.phoneIconOn();
            UIManager.phoneTextIn();
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
            this.heartAnim();
            this.setVignette();

        }
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
        if (this.previousI !== 0) {
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
        this.resetCarousel();
    }

    resetCarousel(){
        this.carouselPos = 25;
        this.carousel.style.transform = "translateX(" + this.carouselPos + "%)";
    }
};

