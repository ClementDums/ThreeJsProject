import * as THREE from 'three'
import FilterWorkOfArt from '../../3D/WorkOfArt/Filter/FilterWorkOfArt'
import Phone from '../../3D/Phone/Phone'
import Pantheon from '../../3D/Decors/Pantheon'
import SplineManager from "../../3D/Splines/SplineManager";
import appState from "../../../Helpers/ExperienceStates"
import UIManager from '../../UI/UIManager'
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

        //Pantheon
        this.pantheon = new Pantheon(new THREE.Vector3(0, 291, -200));

        //Environement
        this.skybox = new Skybox("outside");

        this.phone = new Phone();

        //Filter
        this.statue0 = new FilterWorkOfArt(new THREE.Vector3(-520, 180, -3903), "0", 'toFilter', true);
        this.statue1 = new FilterWorkOfArt(new THREE.Vector3(-520, 180, -3903), "1", "1", false);
        this.statue2 = new FilterWorkOfArt(new THREE.Vector3(-520, 180, -3903), "2", "2", false);
        this.statue3 = new FilterWorkOfArt(new THREE.Vector3(-520, 180, -3903), "3", "3", false);
        this.socle = new Socle(new THREE.Vector3(-530, 0, -3900));

        //Hypersex
        this.hypersex = new HypersexWorkOfArt(new THREE.Vector3(-530, 0, -4500), "toHypersex");
        this.hand = new Hand(new THREE.Vector3(-680, 300, -4500), "hand");

        this.objects = [];
        this._background = null;
    }

    init() {
        this.addSplines();
        this.addLights();
        this.addSkybox();

        this._background.init();

        //Pantheon
        this.objects.push(this.phone);
        this.objects.push(this.statue0);
        this.objects.push(this.pantheon);

        //Environment
        this._scene.add(this.skybox.skybox);

        //Filter
        this.objects.push(this.statue1);
        this.objects.push(this.statue2);
        this.objects.push(this.statue3);
        this.objects.push(this.socle);
        FilterManager.init(this.phone, this.statue0, this.statue1, this.statue2, this.statue3);

        //Hypersex
        this.objects.push(this.hypersex);
        this.objects.push(this.hand);

        const hiddenObjects = [];
        hiddenObjects.push(this.hand);

        HypersexManager.init(hiddenObjects, this.phone);

        //Cube map
        const cubeMap = this._background.hdrCubeMap;
        this._scene.background = cubeMap;
    }

    addSplines() {
        SplineManager.newSpline(appState.HALLWALK);
        this._scene.add(SplineManager.currentSpline.parent);

        SplineManager.newSpline(appState.ENDINGWALK);
        this._scene.add(SplineManager.currentSpline.parent);
    }

    addLights() {
        // let flash = new THREE.PointLight(0xffffff, 30, 2000, 1.7);
        // flash.position.set(0, 1000, 0);
        // flash.power = 100;
        // this._scene.add(flash);

        let flash2 = new THREE.PointLight(0xff9b1c, 3, 2000);
        flash2.name = "Dome light";
        flash2.position.set(0, 2097, -200);
        this._scene.add(flash2);

        let statue = new THREE.PointLight(0xff9b1c, 3, 300);
        statue.name = "Dome light";
        statue.position.set(0, 400, -200);
        this._scene.add(statue);

        // let gallery = new THREE.PointLight(0xffffff, 1,1000);
        // gallery.name = "Dome light";
        // gallery.position.set(0, 5000, -4000);
        // this._scene.add(gallery);


        let flash4 = new THREE.SpotLight(0xff6800, 2, 600);
        flash4.name = "Filter light";
        flash4.castShadow = true;
        flash4.target.position.set(-520, 200, -3903);
        flash4.position.set(-450, 0, -3900);
        this._scene.add(flash4);
        this._scene.add(flash4.target);


        //Purple light
        let purpleLight = new THREE.PointLight(0x310177, 1);
        purpleLight.castShadow = true;
        purpleLight.name = "galleryTop";
        purpleLight.position.set(0, 1000, -4000);
        this._scene.add(purpleLight);

        //Purple light 2
        let purpleLight2 = new THREE.PointLight(0x310177, 1);
        purpleLight2.castShadow = true;
        purpleLight2.name = "galleryBottom";
        purpleLight2.position.set(0, 300, -4000);
        this._scene.add(purpleLight2);


        //Purple light
        let flash3 = new THREE.PointLight(0x310177, 2);
        flash3.castShadow = true;
        flash3.position.set(0, 2097, -200);
        this._scene.add(flash3);


        let ambientLight = new THREE.AmbientLight(0xffffff, 1);
        this._scene.add(ambientLight);

    }

    addSkybox() {
        this._background = new Background();
    }

    get scene() {
        return this._scene
    }
}
