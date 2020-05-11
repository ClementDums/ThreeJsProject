import Carousel from "./Carousel";
import Cursor from "./Cursor";
import HomeText from "./HomeText";

const UIManager = {
    init() {
        this.el = document.getElementById("game");
        this.carousel = null;
        this.currentStory = [];
        this.isDisplayingText = false;
        Cursor.init();
        HomeText.init();
    },

    phoneIconOn() {
        document.querySelector(".phoneOn").style.display = "block";
        document.querySelector(".phoneOff").style.display = "none";
    },

    phoneIconOff() {
        document.querySelector(".phoneOn").style.display = "none";
        document.querySelector(".phoneOff").style.display = "block";
    },

    displayHomeText() {
        HomeText.displayHomeText();
    },

    hideHomeText() {
        HomeText.hideHomeText();
    },


    displayNextPrev() {
        const nextprev = document.querySelectorAll(".nextspan");
        nextprev.forEach((item) => {
            item.style.display = "block";
        });
    },

    hideNextPrev() {
        const nextprev = document.querySelectorAll(".nextspan");
        nextprev.forEach((item) => {
            item.style.display = "none";
        })
    },

    hideModules() {
        const modules = this.el.querySelectorAll(".module");
        modules.forEach((item) => {
            item.style.display = "none";
        })
    },


    hidePrev() {
        document.getElementById("prev").style.display = "none";
    },

    newCarousel(template) {
        this.carousel = new Carousel(template);
    },
    endCarousel() {
        this.deleteCarousel();
    },
    deleteCarousel() {
        if (this.carousel) {
            this.carousel.destroy();
        }
    },

};

export default UIManager;
