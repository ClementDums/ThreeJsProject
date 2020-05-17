import {CSS3DObject} from "three/examples/jsm/renderers/CSS3DRenderer";
import SceneManager from "../Scene/SceneManager";
import CameraManager from "../Camera/CameraManager";
import * as THREE from 'three'
import TWEEN from "@tweenjs/tween.js"

export default class ImageGallery {
//image gallery
    constructor() {
        this.init();
    }

    init() {
        this.objects = [];
        this.targets = {grid: [], hide: []};

        let linesCount = 10;

        for (let i = 0; i < 40; i++) {

            let element = document.createElement('div');
            element.className = 'image_gallery_element';
            element.style.backgroundImage = "url('./assets/Image/test1.jpg')";

            let object = new CSS3DObject(element);
            object.position.x = -10000;
            object.position.y = 190;
            object.position.z = 1000;

            SceneManager.cssScene.add(object);
            this.objects.push(object);

            //grid
            let gridObj = new THREE.Object3D();

            gridObj.position.x = ((i % linesCount) * (300 + 300)) - 2750;
            gridObj.position.y = ((Math.floor(i / linesCount) % linesCount) * -800) + 1500;
            gridObj.position.z = -10000;
            gridObj.lookAt(CameraManager.camera.position);
            this.targets.grid.push(gridObj);


            //hide
            let hideObj = new THREE.Object3D();

            hideObj.position.x = 10000;
            hideObj.position.y = 190;
            hideObj.position.z = 1000;

            this.targets.hide.push(hideObj);

        }

        this.showGallery();
    }

    hideGallery() {
        this.transform(this.targets.hide, 1000);
        setTimeout(function () {
            document.getElementById('image_gallery').style.display = "none";
            SceneManager.isCssRendering = false;
        }, 1000)
    }

    showGallery() {
        SceneManager.isCssRendering = true;
        document.getElementById('image_gallery').style.display = "block";
        this.transform(this.targets.grid, 1000)
    }

    transform(targets, duration) {
        TWEEN.removeAll();

        for (let i = 0; i < this.objects.length; i++) {

            let obj = this.objects[i];
            let target = targets[i];

            new TWEEN.Tween(obj.position)
                .to({
                    x: target.position.x,
                    y: target.position.y,
                    z: target.position.z
                }, Math.random() * duration + duration)
                .easing(TWEEN.Easing.Exponential.InOut)
                .start();

            new TWEEN.Tween(obj.rotation)
                .to({
                    x: target.rotation.x,
                    y: target.rotation.y,
                    z: target.rotation.z
                }, Math.random() * duration + duration)
                .easing(TWEEN.Easing.Exponential.InOut)
                .start();
        }
    }

}
