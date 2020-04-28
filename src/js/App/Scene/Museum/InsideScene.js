import * as THREE from 'three'
import FilterWorkOfArt from '../../3D/WorkOfArt/Filter/FilterWorkOfArt'
import Phone from '../../3D/Phone/Phone'
import Pantheon from '../../3D/Decors/Pantheon'
import SplineManager from "../../3D/Splines/SplineManager";
import appState from "../../../Helpers/ExperienceStates"
import CameraManager from "../../Camera/CameraManager"
import appStates from '../../../Helpers/ExperienceStates'
import UIManager from '../../UI/UIManager'
import RaycasterManager from "../../Interaction/RaycasterManager";
import InteractionManager from "../../Interaction/InteractionManager";
import Background from "../../Environment/Background";
import FilterManager from "../../3D/WorkOfArt/Filter/FilterManager";
import Skybox from "../../Environment/Skybox";
import HypersexWorkOfArt from "../../3D/WorkOfArt/Hypersex/HypersexWorkOfArt";
import Hand from "../../3D/WorkOfArt/Hypersex/Hand";
import HypersexManager from "../../3D/WorkOfArt/Hypersex/HypersexManager";
import Socle from "../../3D/WorkOfArt/Filter/Socle";


export default class InsideScene {
    constructor() {
        this._scene = new THREE.Scene();
        this._scene.name = "Inside";
        this.pantheon = new Pantheon(new THREE.Vector3(0, 291, -200));
        this.statue0 = new FilterWorkOfArt(new THREE.Vector3(-522, 147, -3900), "0", 'toFilter', true);
        this.statue1 = new FilterWorkOfArt(new THREE.Vector3(-530, 147, -3900), "1", "1", false);
        this.statue2 = new FilterWorkOfArt(new THREE.Vector3(-530, 147, -3900), "2", "2", false);
        this.statue3 = new FilterWorkOfArt(new THREE.Vector3(-530, 147, -3900), "3", "3", false);
        this.socle = new Socle(new THREE.Vector3(-530, 0, -3900));

        this.hypersex = new HypersexWorkOfArt(new THREE.Vector3(-530, 0, -4500), "toHypersex");
        this.hand = new Hand(new THREE.Vector3(-680, 0, -4500), "hand");
        this.skybox = new Skybox("outside");
        this.phone = new Phone();

        this.objects = [];
        this._background = null;

    }

    init() {
        this.addSplines();
        this.addLights();
        this.addSkybox();
        //this.addGround();

        this._background.init();
        this.objects.push(this.phone);
        this.objects.push(this.statue0);
        this.objects.push(this.pantheon);
        this._scene.add(this.skybox.skybox);

        this.objects.push(this.statue1);
        this.objects.push(this.statue2);
        this.objects.push(this.statue3);
        this.objects.push(this.socle);

        FilterManager.init(this.statue0, this.statue1, this.statue2, this.statue3);


        this.objects.push(this.hypersex);
        this.objects.push(this.hand);

        const hiddenObjects = [];
        hiddenObjects.push(this.hand);

        HypersexManager.init(hiddenObjects);


        const cubeMap = this._background.hdrCubeMap;
        this._scene.background = cubeMap;

        var geometry = new THREE.BoxGeometry(20, 20, 20);
        var material = new THREE.MeshBasicMaterial({color: 0x00ff00});
        var cube = new THREE.Mesh(geometry, material);
        cube.name = "prev";
        cube.position.set(80, 50, -2150);
        this._scene.add(cube);

        var geometry = new THREE.BoxGeometry(20, 20, 20);
        var material = new THREE.MeshBasicMaterial({color: 0x00ff00});
        var cube = new THREE.Mesh(geometry, material);
        cube.name = "next";
        cube.position.set(110, 50, -2150);
        this._scene.add(cube);

        var geometry = new THREE.BoxGeometry(20, 20, 20);
        var material = new THREE.MeshBasicMaterial({color: 0x00ff00});
        var cube = new THREE.Mesh(geometry, material);
        cube.name = "exit";
        cube.position.set(110, 80, -2150);
        this._scene.add(cube);

    }


    addSplines() {
        SplineManager.newSpline(appState.HALLWALK);
        this._scene.add(SplineManager.currentSpline.parent);

        SplineManager.newSpline(appState.ENDWALK);
        this._scene.add(SplineManager.currentSpline.parent);
    }

    addLights() {
        // let flash = new THREE.PointLight(0xffffff, 30, 2000, 1.7);
        // flash.position.set(0, 1000, 0);
        // flash.power = 100;
        // this._scene.add(flash);

        // let flash2 = new THREE.PointLight(0xffffff, 30, 2000, 1.7);
        // flash2.position.set(0, 1000, -1500);
        // flash2.power = 20;
        // this._scene.add(flash2);
        //
        let flash3 = new THREE.PointLight(0xffffff, 2);
        flash3.castShadow = true;
        flash3.position.set(0, 1000, -2500);
        this._scene.add(flash3);

        // let flash4 = new THREE.PointLight(0xffffff, 30, 1000, 1);
        // flash4.position.set(0, 1000, -5000);
        // flash4.power = 20;
        // this._scene.add(flash4);

        let ambientLight = new THREE.AmbientLight(0x404040);
        this._scene.add(ambientLight);

    }

    addGround() {
        var material = new THREE.MeshPhongMaterial({color: 0x808080, dithering: true});
        var geometry = new THREE.PlaneBufferGeometry(2000, 2000);
        var mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(0, -1, 0);
        mesh.rotation.x = -Math.PI * 0.5;
        mesh.receiveShadow = true;
        this._scene.add(mesh);
    }

    addSkybox() {
        this._background = new Background();
    }

    static hallWalk() {
        CameraManager.startMove(appStates.HALLWALK);
    }

    static endWalk() {
        CameraManager.startMove(appStates.ENDWALK);
    }


    static galleryScreen() {
        UIManager.showGalleryScreen();
    }

    clickOnFilter() {
        this.phone.setCameraScreenTexture();
        RaycasterManager.isActive = true;
        RaycasterManager.identifiers.push("toFilter");
        InteractionManager.clickListener = true;
    }

    clickOnHypersex() {
        RaycasterManager.isActive = true;
        RaycasterManager.identifiers.push("toHypersex");
        InteractionManager.clickListener = true;
    }

    clickedHypersex(name) {
        if (name === "toHypersex") {
            RaycasterManager.identifiers.splice("toHypersex");
            HypersexManager.startHypersex(this.phone);
            HypersexManager.takePhoto();
        }

    }

    clickedFilter(name) {
        if (name === "prev") {
            FilterManager.setPrev();
        }
        if (name === "next") {
            FilterManager.setNext();
        }
        if (name === "exit") {
            this.stopFilterModule();
        }
        if (name === "toFilter") {
            RaycasterManager.identifiers.splice("toFilter");
            this.filterModule();
        }
        if (name === "story") {
            FilterManager.startStory();
            this.stopFilterModule()
        }
    }

    stopFilterModule() {
        this.phone.setSmall();
        this.phone.setBlackScreenTexture();
    }

    filterModule() {
        FilterManager.startFilter(this.phone);
    }


    get scene() {
        return this._scene
    }
}
