import UIManager from "../../../UI/UIManager";

const FilterManager = {
    objects: [],
    currentObject: null,
    i: 0,


    init(statue0, statue1, statue2, statue3) {
        this.objects.push(statue0, statue1, statue2, statue3);
        this.currentObject = statue0;
    },
    setCurrentActive() {
        this.currentObject.enableFilter();
    },

    setCurrentDisable() {
        this.currentObject.disableFilter();
    },

    setNext() {
        if (this.objects[this.i + 1]) {
            this.setCurrentDisable();
            this.currentObject = this.objects[this.i + 1];
            this.setCurrentActive();
            this.i += 1;
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
    }


};


export default FilterManager;
