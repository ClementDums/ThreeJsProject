import UIManager from "../../../UI/UIManager";
import RaycasterManager from "../../../Interaction/RaycasterManager";
import InteractionManager from "../../../Interaction/InteractionManager";


const FilterManager = {
    objects: [],
    currentObject: null,
    i: 0,
    isFiltered: false,
    phone: null,
    isSmall: true,

    //Init module
    init(phone, statue0, statue1, statue2, statue3) {
        this.phone = phone;
        this.objects.push(statue0, statue1, statue2, statue3);
        this.currentObject = statue0;
    },

    //Start module
    startModule() {
        this.clickOnFilter();
    },

    //Prepare module onClick
    clickOnFilter() {
        this.phone.setCameraScreenTexture();
        RaycasterManager.isActive = true;
        RaycasterManager.identifiers.push("toFilter");
        InteractionManager.clickListener = true;
    },

    //Handle filter clicks
    clickedFilter(name) {
        if (name === "prev") {
            this.setPrev();
        }
        if (name === "next") {
            this.setNext();
        }
        if (name === "exit") {
            this.stopPhoneFilter();
        }
        if (name === "toFilter") {
            RaycasterManager.identifiers.splice("toFilter");
            this.filterModule();
        }
    },

    //Start Phone filter
    filterModule() {
        if (!this.isFiltered) {
            this.startPhoneFilter(this.phone);
        }
    },

    //Start filter with phone
    startPhoneFilter(phone) {
        this.isFiltered = true;
        this.isSmall = false;
        phone.setFullscreen();
        phone.zoomPhone(100);
        InteractionManager.initFilter();
        document.getElementById("filter").style.display = "block"
    },

    //Stop filter with phone
    stopPhoneFilter() {
        if (!this.isSmall) {
            this.phone.setSmall();
            this.isSmall = true;
        }
        document.getElementById("filter").style.display = "none";
        this.startStory();
    },

    //Start carousel story
    startStory() {
        UIManager.newCarousel();
    },

    //Go to previous filter
    setPrev() {
        if (this.objects[this.i - 1]) {
            this.setCurrentDisable();
            this.currentObject = this.objects[this.i - 1];
            this.setCurrentActive();
            this.i -= 1;
        }
    },

    //Go to next filter
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
    },


    //Show current object
    setCurrentActive() {
        this.currentObject.show();
    },

    //Disable current object
    setCurrentDisable() {
        this.currentObject.hide();
    },

    endModule() {
        this.isFiltered = false;
        this.resetModule();
    },

    resetModule() {
        this.stopPhoneFilter();
        UIManager.deleteCarousel();
        this.resetFilter();
    },

    //Reset filter
    resetFilter() {
        this.setCurrentDisable();
        this.i = 0;
        this.currentObject = this.objects[0];
        this.setCurrentActive()
    },

};


export default FilterManager;
