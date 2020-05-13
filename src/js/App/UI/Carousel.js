export default class Carousel {
    constructor(template) {
        this.container = document.getElementById("verticalCaroussel");
        this.textTemplate = template;
        this.list = null;
        this.sectionContainer = null;
        //Array of text
        this.textArray = null;
        this.isScrolling = false;
        this.activeSection = 0;
        this.init();
    }

    init() {
        this.container.style.display = "block";
        this.createTextArray();
        this.showMask();
        this.createDom();
        this.addListItems();
        this.addSections();
        this.scrollToContinue();
        this.displayIntro();
        window.addEventListener("wheel", this.scrolled.bind(this));
    }

    /**
     * Show black text mask
     */

    showMask() {
        document.getElementById("maskText").classList.add("visible");
    }

    /**
     * Create text array from div in template
     */
    createTextArray() {
        this.textArray = this.textTemplate.querySelectorAll(".section");
    }

    /**
     * Display intro
     */
    displayIntro() {
        let introSec = this.container.querySelector(".introSection");
        let introP = introSec.querySelectorAll("p");
        introP.forEach((p, i) => {
            setTimeout(() => {
                p.classList.add('visible')
            }, 1800 * (i + 1))

        });
        setTimeout(() => {
            this.scroll.classList.add("visible")
            this.list.classList.add("visible")
        }, 6000)
    }

    scrolled(e) {
        if (this.container) {
            const direction = e.deltaY;
            if (direction < 0) {
                this.scrollTop();
            } else {
                this.scrollBottom();
            }
        }
    }

    timeOut() {
        this.timeout = setTimeout(() => this.isScrolling = false, 800)
    }


    scrollBottom() {
        if (this.activeSection < this.textArray.length - 1 && !this.isScrolling) {
            this.isScrolling = true;
            this.timeOut();
            this.hideSection();
            this.activeSection += 1;
            this.showSection(this.activeSection);
            this.showActiveLi(this.activeSection);
            this.displayScrollToContinue(this.activeSection)
        }
    }

    scrollTop() {
        if (this.activeSection > 0 && !this.isScrolling) {
            this.isScrolling = true;
            this.timeOut();
            this.hideSection();
            this.activeSection -= 1;
            this.showSection(this.activeSection);
            this.showActiveLi(this.activeSection);
            this.displayScrollToContinue(this.activeSection);
        }
    }

    /**
     * Show current carousel section
     * @param i
     */
    hideSection(i) {
        let sections = this.sectionContainer.querySelectorAll("section");
        sections.forEach((item) => {
            item.style.visibility = "hidden";
            let p = item.querySelectorAll("p");
            p.forEach((i) => {
                i.classList.remove("visible");
            })
        });
    }

    /**
     * Show current carousel section
     * @param i
     */
    showSection(i) {
        let sections = this.sectionContainer.querySelectorAll("section");
        sections.forEach((item) => {
            item.style.visibility = "hidden";
            const attr = item.getAttribute('data-section');
            if (i == attr) {
                item.style.visibility = "visible";
                let p = item.querySelectorAll("p");
                p.forEach((i) => {
                    i.classList.add("visible");
                })
            }
        });
    }

    /**
     * Show active list item
     * @param i
     */
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

    /**
     * Create scroll to continue text
     */
    scrollToContinue() {
        let scrollP = document.createElement("p");
        scrollP.innerHTML = "Scroller pour continuer";
        scrollP.classList.add("scrollContinue");
        this.scroll = scrollP;
        this.container.appendChild(scrollP);
    }


    /**
     * Handle scroll to continue text display
     * @param i
     */
    displayScrollToContinue(i) {
        document.querySelector(".scrollContinue").style.display = "block";
        if (i === this.textArray.length - 1) {
            document.querySelector(".scrollContinue").style.display = "none";
        }
    }

    /**
     * Add carousel list items
     */
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

    /**
     * Add carousel sections
     */
    addSections() {
        for (let i = 0; i < this.textArray.length; i++) {
            let section = document.createElement("section");
            section.setAttribute("data-section", "" + i + "");
            if (i === 0) {
                section.classList.add("introSection");
            }

            let pContent = this.textArray[i].querySelectorAll("p");
            pContent.forEach((paragraph) => {
                // if (paragraph.classList.contains("primary")) {
                //     let pPrimary = document.createElement("p");
                //     pPrimary.classList.add("title");
                //     pPrimary.innerHTML = paragraph.innerHTML;
                //     section.appendChild(pPrimary);
                // }
                //
                // if (paragraph.classList.contains("intro")) {
                //     let pIntro = document.createElement("p");
                //     pIntro.classList.add("intro");
                //     pIntro.innerHTML = paragraph.innerHTML;
                //     section.appendChild(pIntro);
                // }
                // if (paragraph.classList.contains("secondary")) {
                //     let pSecondary = document.createElement("p");
                //     pSecondary.classList.add("secondary");
                //     pSecondary.innerHTML = paragraph.innerHTML;
                //     section.appendChild(pSecondary);
                // }

                section.appendChild(paragraph);

            });

            this.sectionContainer.appendChild(section);
        }
    }

    /**
     * Create carousel DOM
     */
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

    /**
     * Destroy carousel
     */
    destroy() {
        this.container.style.display = "none";
        this.container.innerHTML = "";
        this.container = null;
        document.getElementById("maskText").classList.remove("visible");
    }

}
