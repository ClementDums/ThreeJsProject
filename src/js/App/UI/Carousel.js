import UIManager from "./UIManager";
import ParticlesManager from "../Particles/ParticlesManager";
import CameraManager from "../Camera/CameraManager";
import SceneManager from "../Scene/SceneManager";

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

        this.particlesData = {
            'filterStory': {
                1: 'mirror',
                2: 'syringe',
                3: 'pills',
            },
            'hypersexStory': {
                1: 'heel',
                2: 'bear',
                3: 'lollipop',
            },
            'diversityStory': {
                1: 'male',
                2: 'like',
                3: 'diamond',
            }
        }
    }

    init() {
        this.container.style.display = "block";
        this.createTextArray();
        UIManager.showMask();
        this.createDom();
        this.addListItems();
        this.addSections();
        this.scrollToContinue();
        this.displayIntro();
        window.addEventListener("wheel", this.scrolled.bind(this));
    }

    /**
     * Create text array from div in template
     */
    createTextArray() {
        this.textArray = this.textTemplate.querySelectorAll(".section");
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
     * Display intro
     */
    displayIntro() {

        //back off camera
        CameraManager.cameraMovementManager.moveTo(-150 , CameraManager.mainCamera.camera.position.z);

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
        }, 2000)
    }

    getActiveParticlesSystem() {
        if(this.textTemplate.id === 'filterStory') {
            return SceneManager.currentScene.particlesExperience1;
        }
        else if(this.textTemplate.id === 'hypersexStory') {
            return SceneManager.currentScene.particlesExperience2;
        }
        else if(this.textTemplate.id === 'diversityStory') {
            return SceneManager.currentScene.particlesExperience3;
        }
        else {
            return SceneManager.currentScene.particlesExperience1;
        }
    }
    /**
     * Show current carousel section
     * @param i
     */
    showSection(i) {

        //get active particles system
        let particlesSystem = this.getActiveParticlesSystem();

        //particles animation
        if (this.particlesData[this.textTemplate.id][i]) {
            if(particlesSystem.parent.visible === false) {
                particlesSystem.showParticles();
            }

            if (this.activeSection === 1) {
                particlesSystem.showObject(this.particlesData[this.textTemplate.id][i], false);
            }
            else {
                particlesSystem.showObject(this.particlesData[this.textTemplate.id][i], true);
            }
        }

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
            item.classList.remove("active");
            if (i == attr) {
                item.classList.add("active");
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
        let footer = document.getElementsByTagName('footer')[0];
        footer.insertBefore(scrollP, footer.firstChild);
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
                li.classList.add('active');
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
            if(pContent[0]) {
                if(pContent[0].className === "half") {
                    console.log('half')
                    if(this.textTemplate.id === "filterStory") {
                        section.classList.add("half", "left");
                    }
                    if(this.textTemplate.id === "hypersexStory") {
                        section.classList.add("half", "right");
                    }
                    if(this.textTemplate.id === "diversityStory") {
                        section.classList.add("half", "left");
                    }
                }
            }

            pContent.forEach((paragraph) => {
                const paragraphCopy = paragraph.cloneNode(true);
                section.appendChild(paragraphCopy);
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

        //remove particles
        this.getActiveParticlesSystem().hideParticles();

        if (this.container) {
            this.container.style.display = "none";
            this.container.innerHTML = "";
            this.container = null;
            UIManager.hideMask();
        }
    }

}
