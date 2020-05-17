import RaycasterManager from "../Interaction/RaycasterManager";
import PostProcessingManager from "../PostProcessing/PostProcessingManager";
import UIManager from "../UI/UIManager";
import DiversityWorkOfArt from "../3D/WorkOfArt/Diversity/DiversityWorkOfArt";
import * as THREE from "three";
import SceneManager from "../Scene/SceneManager";
import {CSS3DObject} from "three/examples/jsm/renderers/CSS3DRenderer";

export default class Diversity {
    constructor() {
        this.phone = null;
        this.light = null;
        this.statue = null;
        this.isActive = false;
        this.isCompleted = false;
        this.copies = [];
        this.clickCounter = 0;
    }

    /**
     * Init interaction, statue
     * @param phone
     * @param statue
     * @param hiddenStatues
     */
    init(phone, statue, hiddenStatues) {
        this.phone = phone;
        this.statue = statue;
        this.hiddenStatues = hiddenStatues;
        this.likeBubbles = [];
        this.initInteraction();
        this.createLikeText()
    }

    /**
     * Init Module interactions
     */
    initInteraction() {
        this.diversityUi = document.querySelector("#diversity");
        this.diversityUi.querySelector("#like").addEventListener("click", () => {
            this.like();
        })
    }

    addBubbleContent() {
        this.likeBubbles.forEach(item => {
            let img = document.createElement("i");
            img.classList.add("fa");
            img.classList.add("fa-heart");
            item.appendChild(img);
            let p = document.createElement("p");
            item.appendChild(p);
        });
    }

    createLikeText() {

        //FIRST BUBBLE
        let element1 = document.createElement('div');
        this.likeBubbles.push(element1);
        this.likeTextAttributes(element1);


        let firstBubble = new CSS3DObject(element1);
        firstBubble.position.x = -10000;
        firstBubble.position.y = 3000;
        firstBubble.position.z = -4550;
        firstBubble.rotation.y = Math.PI / 2;
        SceneManager.cssScene.add(firstBubble);

        //SECOND BUBBLE
        let element2 = document.createElement('div');
        this.likeTextAttributes(element2);
        this.likeBubbles.push(element2);

        let secondBubble = new CSS3DObject(element2);
        secondBubble.position.x = -530;
        secondBubble.position.y = 245;
        secondBubble.position.z = -5165;
        secondBubble.rotation.y = Math.PI / 2;
        SceneManager.cssScene.add(secondBubble);

        //THIRD BUBBLE
        let element3 = document.createElement('div');
        this.likeTextAttributes(element3);
        this.likeBubbles.push(element3);


        let thirdBubble = new CSS3DObject(element3);
        thirdBubble.position.x = -530;
        thirdBubble.position.y = 245;
        thirdBubble.position.z = -5218;
        thirdBubble.rotation.y = Math.PI / 2;
        SceneManager.cssScene.add(thirdBubble);

        //FOURTH BUBBLE
        let element4 = document.createElement('div');
        this.likeTextAttributes(element4);
        this.likeBubbles.push(element4);


        SceneManager.cssScene.add(firstBubble);
        let fourthBubble = new CSS3DObject(element4);
        fourthBubble.position.x = -530;
        fourthBubble.position.y = 263;
        fourthBubble.position.z = -5171;
        fourthBubble.rotation.y = Math.PI / 2;
        SceneManager.cssScene.add(fourthBubble);

        //FIFTH BUBBLE
        let element5 = document.createElement('div');
        this.likeTextAttributes(element5);
        this.likeBubbles.push(element5);

        SceneManager.cssScene.add(firstBubble);
        let fifthBubble = new CSS3DObject(element5);
        fifthBubble.position.x = -530;
        fifthBubble.position.y = 263;
        fifthBubble.position.z = -5236;
        fifthBubble.rotation.y = Math.PI / 2;
        SceneManager.cssScene.add(fifthBubble);
        this.addBubbleContent();
    }


    likeTextAttributes(element) {
        element.classList.add('likeBubble');
    }


    setLight(purpleLight) {
        this.light = purpleLight;
    }

    /**
     * Prepare click
     */
    enableModuleClick() {
        RaycasterManager.isActive = true;
        RaycasterManager.identifiers.push("toDiversity");
        PostProcessingManager.setOutlineObject(this.statue._object.children[0], 5);
        SceneManager.isCssRendering = true;
    }

    /**
     * Handle click on module
     * @param name
     */
    clickedModule(name) {
        if (name === "toDiversity") {
            RaycasterManager.identifiers.splice("toDiversity");
            PostProcessingManager.setOutlineObject(null, 0);
            this.diversityModule();
        }
    }

    diversityModule() {
        if (!this.isActive) {
            this.startDiversity(this.phone)
        }
    }

    startDiversity(phone) {
        this.isActive = true;
        phone.setFullscreen();
        phone.zoomPhone(40);
        document.getElementById("diversity").style.display = "block";
        this.diversityUi.querySelector("#like").style.display = "flex";
    }

    like() {
        this.clickCounter++;
        this.diversityUi.querySelector("#like").classList.add("active");
        setTimeout(() => {
            this.diversityUi.querySelector("#like").classList.remove("active");
        }, 500);


        if (this.clickCounter === 1) {
            this.likeBubbles[0].querySelector('p').innerText = "1";
            this.likeBubbles[0].classList.add("visible");
        }
        if (this.clickCounter === 2) {
            this.showFirstRow();
            this.likeBubbles[1].classList.add("visible");
            this.likeBubbles[2].classList.add("visible");
            this.likeBubbles[0].querySelector('p').innerText = "53";
            this.likeBubbles[1].querySelector('p').innerText = "74";
            this.likeBubbles[2].querySelector('p').innerText = "93";


        }
        if (this.clickCounter === 3) {
            this.likeBubbles[0].querySelector('p').innerText = "458";
            this.likeBubbles[1].querySelector('p').innerText = "804";
            this.likeBubbles[2].querySelector('p').innerText = "675";

        }
        if (this.clickCounter === 4) {
            this.showSecondRow();
            this.likeBubbles[3].classList.add("visible");
            this.likeBubbles[4].classList.add("visible");
            this.likeBubbles[3].querySelector('p').innerText = "7805";
            this.likeBubbles[4].querySelector('p').innerText = "3645";


            this.likeBubbles[0].querySelector('p').innerText = "95000";
            this.likeBubbles[1].querySelector('p').innerText = "33564";
            this.likeBubbles[2].querySelector('p').innerText = "64575";
        }
        if (this.clickCounter === 5) {
            this.showSecondRow();

            this.likeBubbles[0].querySelector('p').innerText = "154704";
            this.likeBubbles[1].querySelector('p').innerText = "4924980";
            this.likeBubbles[2].querySelector('p').innerText = "91789";
            this.likeBubbles[3].querySelector('p').innerText = "201357";
            this.likeBubbles[4].querySelector('p').innerText = "891944";
        }
        if (this.clickCounter === 6) {
            this.error404();
        }
    }

    showFirstRow() {
        this.hiddenStatues[0].show();
        this.hiddenStatues[1].show();
    }

    showSecondRow() {
        this.hiddenStatues[2].show();
        this.hiddenStatues[3].show();
        this.hiddenStatues[4].show();
    }

    error404() {
        this.phone.set404Texture();
        SceneManager.isCssRendering = false;
        this.diversityUi.querySelector("#like").style.display = "none";
        UIManager.phoneIconOn();
        UIManager.phoneTextIn();
        this.likeBubbles.forEach((obj) => {
            obj.classList.remove("visible");
        });
        SceneManager.isCssRendering = false;
    }

    /**
     * Start carousel story
     */
    startStory() {
        UIManager.newCarousel(document.getElementById("diversityStory"));
    }

    stopPhone() {
        this.isCompleted = true;
        this.phone.hide();
        document.getElementById("diversity").style.display = "none";
        this.startStory()
    }

    resetModule() {
        this.light.visible = false;
        RaycasterManager.identifiers.splice("toDiversity");
        this.hiddenStatues.forEach((obj) => {
            obj.hide();
        });
        this.clickCounter = 0;
    }

    animate() {

    }

};

