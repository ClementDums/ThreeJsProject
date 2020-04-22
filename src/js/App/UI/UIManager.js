const UIManager = {
    init() {
        this.el = document.getElementById("game");

    },

    showGalleryScreen() {
        this.el.querySelector("#gallery").style.display = "flex";
    }
};

export default UIManager;
