const HomeText = {

    init() {
        this.el = document.getElementById("game");
        this.textContainer = this.el.querySelector("#introText");
        this.invisibleDelay = 6000;
        this.visibleDelay = 4000;
        this.introDelay = 2000;
    },
    displayHomeText() {
        this.textContainer.style.display = "flex";
        if (!this.isDisplayingText) {
            this.isDisplayingText = true;
            this.displayText(this.textContainer);
        }
    },
    hideHomeText() {
        this.textContainer.style.display = "none";
    },

    displayText(textContainer) {
        this.texts = textContainer.querySelectorAll("p");
        this.introDisplay();
    },

    introDisplay() {
        setTimeout(() => {
            this.texts[0].classList.add("visible");
            setTimeout(() => {
                this.texts[0].classList.remove("visible");
                this.firstText();
            }, 6000);
        }, 2000);
    },

    firstText() {
        setTimeout(() => {
            this.texts[1].classList.add("visible");
            setTimeout(() => {
                this.texts[1].classList.remove("visible");
                this.secondText();
            }, 7000);
        }, 4000);
    },

    secondText() {
        setTimeout(() => {
            this.texts[2].classList.add("visible");
            setTimeout(() => {
                this.texts[2].classList.remove("visible");
                this.thirdText();
            }, 7000);
        }, 4000);
    },

    thirdText() {
        setTimeout(() => {
            this.texts[3].classList.add("visible");
            setTimeout(() => {
                this.texts[3].classList.remove("visible");
                this.fourthText();

            }, 10000);
        }, 4000);
    },

    fourthText() {
        setTimeout(() => {
            this.texts[4].classList.add("visible");
            setTimeout(() => {
                this.texts[4].classList.remove("visible");
            }, 10000);
        }, 4000);
    }

};
export default HomeText;
