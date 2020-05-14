import Carousel from "./Carousel";
import Cursor from "./Cursor";
import HomeText from "./HomeText";
import Moral from "./Moral";
import ImageGallery from "./ImageGallery";
import StatesManager from "../StatesManager";

const UIManager = {
    init() {
        this.el = document.getElementById("game");
        this.carousel = null;
        this.currentStory = [];
        this.isDisplayingText = false;
        Cursor.init();
        HomeText.init();
        Moral.init();
        this.imageGallery = null;
    },

    setLoadInfos(itemPercent){
      document.getElementById("loadInfos").innerText = ""+itemPercent+"%";
      document.getElementById("myBar").style.width = ""+itemPercent+"%";
    },

    newImageGallery() {
        this.imageGallery = new ImageGallery();
    },

    hideImageGallery() {
        this.imageGallery.hideGallery();
    },

    phoneIconOn() {
        document.querySelector(".phoneOn").style.display = "block";
        document.getElementById("phoneIcon").querySelector(".outPhone").classList.add("phoneOn");
        document.querySelector(".phoneOff").style.display = "none";
    },

    phoneTextOut() {
        document.getElementById("phoneIcon").querySelector(".outPhone").classList.add("visible");
    },
    phoneTextIn() {
        document.getElementById("phoneIcon").querySelector(".inPhone").classList.add("visible");
    },
    hidePhoneText() {
        document.getElementById("phoneIcon").querySelector(".inPhone").classList.remove("visible");
        document.getElementById("phoneIcon").querySelector(".outPhone").classList.remove("visible");
    },

    phoneIconOff() {
        document.querySelector(".phoneOff").style.display = "block";
        document.getElementById("phoneIcon").querySelector(".outPhone").classList.remove("phoneOn");
        document.querySelector(".phoneOn").style.display = "none";

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

    /**
     * Show black text mask
     */

    showMask() {
        document.getElementById("maskText").classList.add("visible");
    },

    hideMask() {
        document.getElementById("maskText").classList.remove("visible");
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
        this.toInvitSection();

    },

    toInvitSection() {
        document.querySelector("#invitSection").classList.add('visible');
    },

    toShareSection() {
        StatesManager.nextState();
        document.querySelector("#invitSection").classList.remove('visible');
        setTimeout(() => {
            document.querySelector("#shareSection").classList.add('visible');
        }, 2000);
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
