import Carousel from "./Carousel";
import Cursor from "./Cursor";
import HomeText from "./HomeText";
import Moral from "./Moral";

const UIManager = {
    init() {
        this.el = document.getElementById("game");
        console.log(this.el)

        this.carousel = null;
        this.currentStory = [];
        this.isDisplayingText = false;
        Cursor.init();
        HomeText.init();
        Moral.init();
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

    displayMoral() {
        Moral.displayMoral();
    },
    hideMoral() {
        Moral.hideMoral();
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

    hideNext() {
        document.getElementById("next").style.display = "none";
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

    displayEndText() {
        document.querySelector("#endText").style.display = "block";

    },
    toInvitSection() {
        document.querySelector("#invitSection").classList.add('visible');
        document.querySelector("#moralSection").classList.remove('visible');
    },

    toShareSection() {
        document.querySelector("#shareSection").classList.add('visible');
        document.querySelector("#invitSection").classList.remove('visible');
    },

    showAbout() {

        document.querySelector("footer").classList.add("up");
        document.querySelector("#about").classList.add("visible");
        document.querySelector("footer").querySelector(".bottom").classList.remove("visible");
    },
    hideAbout() {
        document.querySelector("footer").classList.remove("up");
        document.querySelector("#about").classList.remove("visible");
        document.querySelector("footer").querySelector(".bottom").classList.add("visible");

    }

};

export default UIManager;
