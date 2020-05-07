import * as THREE from 'three'
import FilterWorkOfArt from '../../3D/WorkOfArt/Filter/FilterWorkOfArt'
import Phone from '../../3D/Phone/Phone'
import Pantheon from '../../3D/Decors/Pantheon'
import SplineManager from "../../3D/Splines/SplineManager";
import appState from "../../../Helpers/ExperienceStates"
import Background from "../../Environment/Background";
import FilterManager from "../../3D/WorkOfArt/Filter/FilterManager";
import Skybox from "../../Environment/Skybox";
import HypersexWorkOfArt from "../../3D/WorkOfArt/Hypersex/HypersexWorkOfArt";
import Hand from "../../3D/WorkOfArt/Hypersex/Hand";
import HypersexManager from "../../3D/WorkOfArt/Hypersex/HypersexManager";
import Socle from "../../3D/WorkOfArt/Filter/Socle";
import TestObject from "../../3D/TestObject";
import PerfHelper from '../../../Helpers/Performance/PerfHelper'


export default class InsideScene {
    constructor() {
        this._scene = new THREE.Scene();
        this._scene.name = "Inside";
        this.particleGroup = null;
        //Pantheon
        this.pantheon = new Pantheon(new THREE.Vector3(0, 291, -200));

        //Environement
        this.skybox = new Skybox("outside");

        this.phone = new Phone();

        //Filter
        this.statue0 = new FilterWorkOfArt(new THREE.Vector3(-520, 180, -3900), "0", 'toFilter', true);
        this.statue1 = new FilterWorkOfArt(new THREE.Vector3(-520, 180, -3900), "1", "1", false);
        this.statue2 = new FilterWorkOfArt(new THREE.Vector3(-520, 180, -3900), "2", "2", false);
        this.statue3 = new FilterWorkOfArt(new THREE.Vector3(-520, 180, -3900), "3", "3", false);
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

        //Pantheon
        this.objects.push(this.phone);
        this.objects.push(this.statue0);
        this.objects.push(this.pantheon);

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

        this.particleGroup = new THREE.Object3D();

        this.particleGroup.position.set(-500, 180, -3900);
        this.particleGroup.name = "Heart";
        // this._scene.add(this.particleGroup);
        var loader = new THREE.TextureLoader();
        // loader.load(
        //     // resource URL
        //     './assets/heart.png',
        //
        //     // onLoad callback
        //     function (texture) {
        //         // in this example we create the material when the texture is loaded
        //         let particleAttributes = {startSize: [], startPosition: [], randomness: []};
        //         var totalParticles = 10;
        //         var radiusRange = 50;
        //         for (var i = 0; i < totalParticles; i++) {
        //             var spriteMaterial = new THREE.SpriteMaterial({
        //                 map: texture,
        //                 useScreenCoordinates: false,
        //                 color: 0xffffff
        //             });
        //             var sprite = new THREE.Sprite(spriteMaterial);
        //             sprite.scale.set(5, 5, 1.0); // imageWidth, imageHeight
        //             sprite.position.set((Math.random() - 0.5) * 2, (Math.random()), (Math.random() - 0.5) * 1.5);
        //             // for a cube:
        //             sprite.position.multiplyScalar(radiusRange);
        //             sprite.material.color.setHSL(1, 1, 1);
        //             sprite.opacity = Math.random(); // translucent particles
        //             //sprite.material.blending = THREE.AdditiveBlending; // "glowing" particles
        //             this.particleGroup.add(sprite);
        //             // add variable qualities to arrays, if they need to be accessed later
        //             particleAttributes.startPosition.push(sprite.position.clone());
        //             particleAttributes.randomness.push(Math.random());
        //         }
        //     },
        //
        //     // onProgress callback currently not supported
        //     undefined,
        //
        //     // onError callback
        //     function (err) {
        //         console.error('An error happened.');
        //     }
        // );
    }

    animate() {
        // if (this.particleGroup) {
        //     this.particleGroup.children.forEach((i) => {
        //         console.log(i)
        //     })
        // }

    }

    addSplines() {
        SplineManager.newSpline(appState.HALLWALK);
        this._scene.add(SplineManager.currentSpline.parent);

        SplineManager.newSpline(appState.ENDINGWALK);
        this._scene.add(SplineManager.currentSpline.parent);
    }

    addLights() {

        // let flash2 = new THREE.PointLight(0xff9b1c, 3, 2000);
        // flash2.name = "Dome light";
        // flash2.position.set(0, 2097, -200);
        // this._scene.add(flash2);
        //
        // let statue = new THREE.PointLight(0xff9b1c, 3, 300);
        // statue.name = "Dome light";
        // statue.position.set(0, 400, -200);
        // this._scene.add(statue);


        let flash4 = new THREE.SpotLight(0xff6800, 2, 600);
        flash4.name = "Filter light";
        flash4.target.position.set(-520, 200, -3900);
        flash4.position.set(-450, 0, -3900);
        this._scene.add(flash4);
        this._scene.add(flash4.target);
        FilterManager.setLight(flash4);
        flash4.visible = false;

        let hypersex = new THREE.SpotLight(0xff6800, 2, 600);
        hypersex.name = "Hypersex light";
        hypersex.target.position.set(-530, 200, -4500);
        hypersex.position.set(-450, 0, -4500);

        hypersex.visible = false;
        this._scene.add(hypersex);
        this._scene.add(hypersex.target);
        HypersexManager.setLight(hypersex);


        // //Purple light
        // let purpleLight = new THREE.PointLight(0x310177, 1.2);
        // purpleLight.name = "galleryTop";
        // purpleLight.position.set(0, 1000, -4000);
        // this._scene.add(purpleLight);
        //
        //
        //
        // //Purple light
        // let flash3 = new THREE.PointLight(0x310177, 1);
        // flash3.castShadow = true;
        // flash3.position.set(0, 2097, -200);
        // this._scene.add(flash3);
        //
        // var light = new THREE.HemisphereLight(0x310177, 0xffffff, 1);
        // this._scene.add(light)
        //
        // let purpleLight2 = new THREE.PointLight(0x310177, 1);
        // purpleLight2.name = "galleryBottom";
        // purpleLight2.position.set(0, 300, -4000);
        // this._scene.add(purpleLight2);
    }

    addSkybox() {
        this._background = new Background();
    }

    get scene() {
        return this._scene
    }
}
