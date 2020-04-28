import UIManager from "../../../UI/UIManager";
import RaycasterManager from "../../../Interaction/RaycasterManager";
import InteractionManager from "../../../Interaction/InteractionManager";


const FilterManager = {
    objects: [],
    currentObject: null,
    i: 0,
    isFiltered: false,
    phone: null,


    init(phone, statue0, statue1, statue2, statue3) {
        this.phone = phone;
        this.objects.push(statue0, statue1, statue2, statue3);
        this.currentObject = statue0;
    },

    stopFilterModule() {
        this.phone.setSmall();
        this.phone.setBlackScreenTexture();
    },

    filterModule() {
        this.startFilter(this.phone);
    },

    setCurrentActive() {
        this.currentObject.show();
    },

    setCurrentDisable() {
        this.currentObject.hide();
    },

    setNext() {
        if (this.objects[this.i + 1]) {
            this.setCurrentDisable();
            this.currentObject = this.objects[this.i + 1];
            this.setCurrentActive();
            this.i += 1;
            if (this.i === this.objects.length - 1) {
                this.endFilter()
            }
        }
    },

    setPrev() {
        if (this.objects[this.i - 1]) {
            this.setCurrentDisable();
            this.currentObject = this.objects[this.i - 1];
            this.setCurrentActive();
            this.i -= 1;
        }
    },

    startStory() {
        UIManager.startTextDisplay(document.getElementById("filterStory"));
    },

    startFilter(phone) {
        this.isFiltered = true;
        phone.setFullscreen();
        phone.zoomPhone(100);
    },
    clickedFilter(name) {
        if (name === "prev") {
            this.setPrev();
        }
        if (name === "next") {
            this.setNext();
        }
        if (name === "exit") {
            this.stopFilterModule();
        }
        if (name === "toFilter") {
            RaycasterManager.identifiers.splice("toFilter");
            this.filterModule();
        }
        if (name === "story") {
            this.startStory();
            this.stopFilterModule()
        }
    },
    clickOnFilter() {
        this.phone.setCameraScreenTexture();
        RaycasterManager.isActive = true;
        RaycasterManager.identifiers.push("toFilter");
        InteractionManager.clickListener = true;
    },

    endFilter() {
        console.log("end")
    }


};


export default FilterManager;
