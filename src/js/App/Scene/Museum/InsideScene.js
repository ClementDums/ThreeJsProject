import * as THREE from 'three'
import FilterWorkOfArt from '../../3D/WorkOfArt/Filter/FilterWorkOfArt'
import Phone from '../../3D/Phone/Phone'
import Pantheon from '../../3D/Decors/Pantheon'
import SplineManager from "../../3D/Splines/SplineManager";
import appState from "../../../Helpers/ExperienceStates"
import Background from "../../Environment/Background";
import Skybox from "../../Environment/Skybox";
import HypersexWorkOfArt from "../../3D/WorkOfArt/Hypersex/HypersexWorkOfArt";
import HandLeft from "../../3D/WorkOfArt/Hypersex/HandLeft";
import Socle from "../../3D/WorkOfArt/Filter/Socle";
import AudioHelpers from "../../../Helpers/Audio/AudioHelpers";
import HeartAnimation from "../../3D/WorkOfArt/Filter/HeartAnimation";
import ModuleManager from "../../Modules/ModuleManager";
import HandRight from "../../3D/WorkOfArt/Hypersex/HandRight";
import VolumetricLight from "../../Light/VolumetricLight";
import ParticlesObject from "../../3D/ParticlesObject";
import ParticlesManager from "../../Particles/ParticlesManager";


export default class InsideScene {
    constructor() {
        this._scene = new THREE.Scene();
        this._scene.name = "Inside";
        this.particleGroup = null;
        //Pantheon
        this.pantheon = new Pantheon(new THREE.Vector3(0, 291, -200));

        //Environement
        this.skybox = new Skybox("outside");
        this.fog = new THREE.Fog(0x000000, 1, 4300);
        this.phone = new Phone();

        //Filter
        this.heartAnim1 = new HeartAnimation(new THREE.Vector3(-450, -50, -3900),
            './assets/Animation/Animation_coeurs_minimum.fbx');

        this.heartAnim2 = new HeartAnimation(new THREE.Vector3(-450, -50, -3900),
            './assets/Animation/Animation_coeurs_intermediaire.fbx');

        this.heartAnim3 = new HeartAnimation(new THREE.Vector3(-450, -50, -3900),
            './assets/Animation/Animation_coeurs_max.fbx');


        this.statue0 = new FilterWorkOfArt(new THREE.Vector3(-520, 180, -3900), "0", 'toFilter', true);
        this.statue1 = new FilterWorkOfArt(new THREE.Vector3(-520, 180, -3900), "1", "1", false, this.heartAnim1);
        this.statue2 = new FilterWorkOfArt(new THREE.Vector3(-520, 180, -3900), "2", "2", false, this.heartAnim2);
        this.statue3 = new FilterWorkOfArt(new THREE.Vector3(-520, 180, -3900), "3", "3", false, this.heartAnim3);
        this.socle = new Socle(new THREE.Vector3(-530, 0, -3900));

        //Hypersex
        this.hypersex = new HypersexWorkOfArt(new THREE.Vector3(-530, 0, -4500), "toHypersex");

        //Particles
        this.bear = new ParticlesObject(new THREE.Vector3(0, 190, 2000), './assets/3DModels/Particles/bear.obj')
        this.heel = new ParticlesObject(new THREE.Vector3(0, 190, 2000), './assets/3DModels/Particles/heel.obj')
        this.lollipop = new ParticlesObject(new THREE.Vector3(0, 190, 2000), './assets/3DModels/Particles/lollipop.obj')
        this.mirror = new ParticlesObject(new THREE.Vector3(0, 190, 2000), './assets/3DModels/Particles/mirror.obj')
        this.pills = new ParticlesObject(new THREE.Vector3(0, 190, 2000), './assets/3DModels/Particles/pills.obj')
        this.syringe = new ParticlesObject(new THREE.Vector3(0, 190, 2000), './assets/3DModels/Particles/syringe.obj')

        //Particles system
        this.particlesExperience1 = new ParticlesManager();
        this.particlesExperience2 = new ParticlesManager();

        this.handLeft = new HandLeft(new THREE.Vector3(-650, 138, -4400), "handLeft");
        this.handRight = new HandRight(new THREE.Vector3(-650, 275, -4620), "handRight");

        this.objects = [];
        this._background = null;
    }

    init() {
        this.addSplines();
        this.addLights();
        this.addSounds();

        this._scene.fog = this.fog;

        //Particles
        this.objects.push(this.bear);
        this.objects.push(this.heel);
        this.objects.push(this.lollipop);
        this.objects.push(this.mirror);
        this.objects.push(this.pills);
        this.objects.push(this.syringe);


        //Pantheon
        this.objects.push(this.pantheon);
        this.objects.push(this.phone);
        this.objects.push(this.statue0);

        ModuleManager.phone = this.phone;
        //Filter
        this.objects.push(this.heartAnim1);
        this.objects.push(this.heartAnim2);
        this.objects.push(this.heartAnim3);

        this.objects.push(this.statue1);
        this.objects.push(this.statue2);
        this.objects.push(this.statue3);
        this.objects.push(this.socle);

        ModuleManager.initFilter(this.phone, this.statue0, this.statue1, this.statue2, this.statue3);
        //Hypersex
        this.objects.push(this.hypersex);
        this.objects.push(this.handLeft);
        this.objects.push(this.handRight);

        const hiddenObjects = [];
        hiddenObjects.push(this.handLeft);
        hiddenObjects.push(this.handRight);
        ModuleManager.initHypersex(hiddenObjects, this.phone, this.hypersex);

        //Cube map
    }

    addParticlesObject() {
        let particlesDataExperience1 = {
            scale: 5,
            size: 2,
            position: {x: -500, y: 200, z: -4080},
            objects: [
                {
                    object: this.mirror._object,
                    name: 'mirror_particle_object',
                    points: null
                },
                {
                    object: this.pills._object,
                    name: 'pills_particle_object',
                    points: null
                },
                {
                    object: this.syringe._object,
                    name: 'syringe_particle_object',
                    points: null
                }
            ]
        };
        this.particlesExperience1.init(particlesDataExperience1)

        let particlesDataExperience2 = {
            scale: 5,
            size: 2,
            position: {x: -500, y: 200, z: -4320},
            objects: [
                {
                    object: this.bear._object,
                        name: 'bear_particle_object',
                    points: null
                },
                {
                    object: this.heel._object,
                        name: 'heel_particle_object',
                    points: null
                },
                {
                    object: this.lollipop._object,
                        name: 'lollipop_particle_object',
                    points: null
                },
            ]
        };
        this.particlesExperience2.init(particlesDataExperience2)
    }

    addSounds() {
        AudioHelpers.addSound("ambiance", './assets/Audio/ambiance.mp3', true);
        AudioHelpers.addSound("music", './assets/Audio/music.mp3', true);
        AudioHelpers.setSoundVolume("music", 0.1);
        AudioHelpers.addSound("walk", './assets/Audio/walk.mp3', true);
    };

    playSounds() {
        AudioHelpers.playSound("ambiance");
        AudioHelpers.playSound("music");
    }

    addSplines() {
        SplineManager.newSpline(appState.HALLWALK);
        this._scene.add(SplineManager.currentSpline.parent);
        SplineManager.currentSpline.parent.visible = false;
        SplineManager.newSpline(appState.ENDINGWALK);
        this._scene.add(SplineManager.currentSpline.parent);
        SplineManager.currentSpline.parent.visible = false;
    }

    removeVolumetric(){
        this.scene.remove(this.volumetric.volumetric);
        this.scene.remove(this.volumetric.spot);
        this.scene.remove(this.volumetric.spotTarget);
    }

    addLights() {

        //Volumetric light
        const volumetricLight = new VolumetricLight().getMainSpotLight();
        this.volumetric = volumetricLight;
        this.scene.add(volumetricLight.spot);
        this.scene.add(volumetricLight.volumetric);
        this.scene.add(volumetricLight.spotTarget);

        let statue = new THREE.PointLight(0xff9b1c, 10, 500);
        statue.name = "Dome light";
        statue.position.set(0, 400, -200);
        this._scene.add(statue);


        let flash4 = new THREE.SpotLight(0x310177, 2, 600);
        flash4.name = "Filter light";
        flash4.target.position.set(-520, 200, -3900);
        flash4.position.set(-450, 0, -3900);
        this._scene.add(flash4);
        this._scene.add(flash4.target);
        ModuleManager.setFilterLight(flash4);
        flash4.visible = false;

        let hypersex = new THREE.SpotLight(0x310177, 2, 600);
        hypersex.name = "Hypersex light";
        hypersex.target.position.set(-530, 200, -4500);
        hypersex.position.set(-450, 0, -4500);

        hypersex.visible = false;
        this._scene.add(hypersex);
        this._scene.add(hypersex.target);
        ModuleManager.setHypersexLight(hypersex);


        // //Purple light
        let purpleLight = new THREE.PointLight(0x310177, 1.2);
        purpleLight.name = "galleryTop";
        purpleLight.position.set(0, 1000, -4000);
        this._scene.add(purpleLight);


        // Purple light
        let flash3 = new THREE.PointLight(0x310177, 1);
        flash3.position.set(0, 2097, -200);
        this._scene.add(flash3);

        var light = new THREE.HemisphereLight(0xffffff, 0xffffff, 1);
        this._scene.add(light);

        // let purpleLight2 = new THREE.PointLight(0x310177, 0.5);
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
