const Moral = {

    init() {
        this.el = document.getElementById("game");
        this.textContainer = this.el.querySelector("#moral");
        this.invisibleDelay = 6000;
        this.visibleDelay = 4000;
        this.introDelay = 2000;
    },
    displayMoral() {
        this.textContainer.style.display = "flex";
        if (!this.isDisplayingText) {
            this.isDisplayingText = true;
            this.displayText(this.textContainer);
        }
    }, hideMoral() {
        this.textContainer.style.display = "none"
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
            }, 6000);
        }, 2000);
    },

};
export default Moral;
