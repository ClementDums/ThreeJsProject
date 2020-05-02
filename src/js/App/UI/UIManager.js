import Carousel from "./Carousel";

const UIManager = {
    init() {
        this.el = document.getElementById("game");
        this.textContainer = this.el.querySelector("#fullscreenText");
        this.carousel = null;
        this.currentStory = [];
        this.isDisplayingText = false;
    },


    displayHomeText(storyContainer) {
        this.textContainer.style.display = "flex";
        if (!this.isDisplayingText) {
            this.isDisplayingText = true;
            const texts = storyContainer.querySelectorAll("p");
            texts.forEach((it) => {
                this.currentStory.push(it.innerText);
            });
            this.displayText();
        }
    },
    displayNextPrev() {
        const nextprev = document.querySelectorAll(".nextprev");
        nextprev.forEach((item) => {
            item.style.display = "block";
        });
        this.endCarousel();

    },

    hideModules() {
        const modules = this.el.querySelectorAll(".module");
        modules.forEach((item) => {
            item.style.display = "none";
        })
    },

    hideNextPrev() {
        const nextprev = document.querySelectorAll(".nextprev");
        nextprev.forEach((item) => {
            item.style.display = "none";
        })
    },

    newCarousel() {
        this.carousel = new Carousel();
    },
    endCarousel() {
        this.deleteCarousel();
    },
    deleteCarousel() {
        if (this.carousel) {
            this.carousel.destroy();

        }
    },

    displayText() {
        this.currentStory.forEach((it, i) => {
            const textContainer = this.textContainer;
            setTimeout(() => {
                textContainer.innerHTML = "";
                let para = document.createElement("p");
                para.innerText = it;
                textContainer.appendChild(para)
            }, 2000 * (i + 1))
        });
    }
};

export default UIManager;
