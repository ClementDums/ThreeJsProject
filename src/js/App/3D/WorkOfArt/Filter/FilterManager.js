import UIManager from "../../../UI/UIManager";

const FilterManager = {
    objects: [],
    currentObject: null,
    i: 0,
    isFiltered: false,


    init(statue0, statue1, statue2, statue3) {
        this.objects.push(statue0, statue1, statue2, statue3);
        this.currentObject = statue0;
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
            if (this.i === this.objects.length-1){
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

    endFilter(){
        console.log("end")
    }


};


export default FilterManager;
