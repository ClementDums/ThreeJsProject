import Texts from "../../Helpers/Texts/Texts"

export default class Carousel {
    constructor() {
        this.container = document.getElementById("verticalCaroussel");
        this.list = null;
        this.sectionContainer = null;
        //Array of text
        this.textArray = Texts.filterStory;
        this.isScrolling = false;
        this.activeSection = 0;
        this.init();
    }

    init() {
        this.container.style.display = "block";
        this.createDom();
        this.addListItems();
        this.addSections();
        this.scrollToContinue();

        window.addEventListener("wheel", this.scrolled.bind(this));
    }

    scrolled(e) {
        const direction = e.deltaY;
        if (direction < 0) {
            this.scrollTop();
        } else {
            this.scrollBottom();
        }
    }

    timeOut() {
        this.timeout = setTimeout(() => this.isScrolling = false, 800)
    }

    scrollBottom() {
        if (this.activeSection < this.textArray.length - 1 && !this.isScrolling) {
            this.isScrolling = true;
            this.timeOut();
            this.activeSection += 1;
            this.showSection(this.activeSection);
            this.showActiveLi(this.activeSection);
            this.removeScroll(this.activeSection)
        }
    }

    scrollTop() {
        if (this.activeSection > 0 && !this.isScrolling) {
            this.isScrolling = true;
            this.timeOut();
            this.activeSection -= 1;
            this.showSection(this.activeSection);
            this.showActiveLi(this.activeSection);
            this.removeScroll(this.activeSection);
        }
    }

    showSection(i) {
        let sections = this.sectionContainer.querySelectorAll("section");
        sections.forEach((item) => {
            item.style.display = "none";
            const attr = item.getAttribute('data-section');
            if (i == attr) {
                item.style.display = "flex";
            }
        });
    }

    showActiveLi(i) {
        let lis = this.list.querySelectorAll("li");
        lis.forEach((item) => {
            const attr = item.getAttribute('data-section');
            item.style.background = "#432F54";
            if (i == attr) {
                item.style.background = "#FFF"
            }
        });
    }

    scrollToContinue() {
        let scrollP = document.createElement("p");
        scrollP.innerHTML = "Scroller pour continuer";
        scrollP.classList.add("scroll-continue");
        this.scroll = scrollP;
        this.container.appendChild(scrollP)
    }

    removeScroll(i) {
        document.querySelector(".scroll-continue").style.display = "block";
        if (i === this.textArray.length - 1) {
            document.querySelector(".scroll-continue").style.display = "none";
        }
    }

    addListItems() {
        for (let i = 0; i < this.textArray.length; i++) {
            let li = document.createElement("li");
            li.setAttribute("data-section", "" + i + "");
            if (i === 0) {
                li.style.background = "#fff";
            }
            this.list.appendChild(li);
        }
    }

    addSections() {
        for (let i = 0; i < this.textArray.length; i++) {
            let section = document.createElement("section");
            section.setAttribute("data-section", "" + i + "");
            let pPrimary = document.createElement("p");
            pPrimary.classList.add("title");
            let pSecondary = document.createElement("p");
            pSecondary.classList.add("secondary");

            pPrimary.innerHTML = this.textArray[i].primary;
            pSecondary.innerHTML = this.textArray[i].secondary;
            section.appendChild(pPrimary);
            section.appendChild(pSecondary);
            this.sectionContainer.appendChild(section);
        }
    }

    createDom() {
        const mask = document.createElement("div");
        const nav = document.createElement("NAV");
        let container = document.createElement("div");
        container.classList.add("container");
        const ul = document.createElement("ul");
        mask.classList.add("mask");
        this.container.appendChild(mask);
        mask.appendChild(nav);
        mask.appendChild(container);
        nav.appendChild(ul);

        this.sectionContainer = container;
        this.list = ul;
    }

    destroy() {
        this.container.style.display = "none";
        this.container.innerHTML = "";
    }

}
