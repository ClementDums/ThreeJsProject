import Carousel from "./Carousel";

const UIManager = {
    init() {
        this.el = document.getElementById("game");
        this.textContainer = this.el.querySelector("#introText");
        this.carousel = null;
        this.currentStory = [];
        this.isDisplayingText = false;
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
        this.textContainer.style.display = "flex";
        if (!this.isDisplayingText) {
            this.isDisplayingText = true;
            let homeText = document.getElementById("introText");
            this.displayText(homeText);
        }
    },

    displayText(textContainer) {
        let texts = textContainer.querySelectorAll("p");
        for (let i = 0; i < texts.length; i++) {
            if (i == 0) {
                texts[i].classList.add("visible")
            } else {
                setTimeout(() => {
                    texts[i - 1].classList.remove("visible");
                    texts[i].classList.add("visible")
                }, 2000 * (i + 1))
            }

        }

    },

    hideHomeText() {
        this.textContainer.style.display = "none";
    },


    displayNextPrev() {
        const nextprev = document.querySelectorAll(".nextspan");
        nextprev.forEach((item) => {
            item.style.display = "block";
        });
        this.endCarousel();

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
