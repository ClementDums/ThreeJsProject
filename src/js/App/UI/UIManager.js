const UIManager = {
    init() {
        this.el = document.getElementById("game");
        this.textContainer = this.el.querySelector("#uiText");
        this.currentStory = [];
        this.isDisplayingText = false;
    },

    showGalleryScreen() {
        this.el.querySelector("#gallery").style.display = "flex";
    },

    startTextDisplay(storyContainer) {
        if (!this.isDisplayingText) {
            this.isDisplayingText= true;
            const texts = storyContainer.querySelectorAll("p");
            texts.forEach((it) => {
                this.currentStory.push(it.innerText);
            });
            this.displayText();
        }
    },

    displayText() {
        this.currentStory.forEach((it, i) => {
            const textContainer = this.textContainer;
            setTimeout(function () {
                textContainer.innerHTML = "";
                let para = document.createElement("p");
                para.innerText = it;
                console.log(textContainer);
                textContainer.appendChild(para)
            }, 2000 * (i + 1))
        });
    }
};

export default UIManager;
