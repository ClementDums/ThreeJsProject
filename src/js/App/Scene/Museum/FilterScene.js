import * as THREE from 'three'
import FilterWorkOfArt from '../../3D/WorkOfArt/Filter/FilterWorkOfArt'
import Phone from '../../3D/Phone/Phone'
import RaycasterManager from "../../Interaction/RaycasterManager";
import InteractionManager from "../../Interaction/InteractionManager";
import FilterManager from "../../3D/WorkOfArt/Filter/FilterManager";
import CameraManager from "../../Camera/CameraManager";


export default class FilterScene {
    constructor() {
        this._scene = new THREE.Scene();
        this._scene.name = "FilterScene";
        this.phone = new Phone(
            new THREE.Vector3(1, 1, 1));
        this.statue0 = new FilterWorkOfArt(new THREE.Vector3(0, 80, 80), "0","0");
        this.statue1 = new FilterWorkOfArt(new THREE.Vector3(0, -80, 80), "1","1");
        this.statue2 = new FilterWorkOfArt(new THREE.Vector3(0, -80, 80), "2","2");
        this.statue3 = new FilterWorkOfArt(new THREE.Vector3(0, -80, 80), "3","3");
        this.objects = [];
    }

    init() {
        this.addLights();
        this.addGround();
        var geometry = new THREE.BoxGeometry(50, 50, 50);
        var material = new THREE.MeshBasicMaterial({color: 0x00ff00});
        var cube = new THREE.Mesh(geometry, material);
        cube.name = "story";
        cube.position.set(-80, 50, -10);
        this._scene.add(cube);


        var geometry = new THREE.BoxGeometry(20, 20, 20);
        var material = new THREE.MeshBasicMaterial({color: 0x00ff00});
        var cube = new THREE.Mesh(geometry, material);
        cube.name = "prev";
        cube.position.set(80, 50, -10);
        this._scene.add(cube);

        var geometry = new THREE.BoxGeometry(20, 20, 20);
        var material = new THREE.MeshBasicMaterial({color: 0x00ff00});
        var cube = new THREE.Mesh(geometry, material);
        cube.name = "next";
        cube.position.set(110, 50, -10);
        this._scene.add(cube);


        this.objects.push(this.statue0);
        this.objects.push(this.statue1);
        this.objects.push(this.statue2);
        this.objects.push(this.statue3);
        this.objects.push(this.phone);

        FilterManager.init(this.statue0, this.statue1, this.statue2, this.statue3);

        this.clickPrepare();
    }

    clickPrepare() {
        RaycasterManager.isActive = true;
        RaycasterManager.identifiers.push("Filter");
        RaycasterManager.identifiers.push("story");
        InteractionManager.clickListener = true;
    }

    clicked(name) {
        if (name === "prev") {
          this.prevFilter()
        }
        if (name === "next") {
          this.nextFilter()
        }
        if (name === "story") {
            this.startStory();
            this.stopFilterModule()
        }
        if (name === "Filter") {
            RaycasterManager.identifiers.splice("Filter");
            this.filterModule();
        }
        if (name === "story") {
            this.startStory();
            this.stopFilterModule()
        }
    }

    startStory() {
        FilterManager.startStory();
    }

    stopFilterModule() {
        this.phone.setSmall();
    }


    filterModule() {
        FilterManager.startFilter(this.phone);
    }

    nextFilter() {
        FilterManager.setNext();
    }

    prevFilter() {
        FilterManager.setPrev();
    }


    addLights() {
        let flash = new THREE.PointLight(0xffffff, 30, 1000, 1.7);
        flash.position.set(0, 300, 200);
        flash.power = 30;
        this._scene.add(flash);
        let flash2 = new THREE.PointLight(0xffffff, 30, 2000, 1.7);
        flash2.position.set(0, 1000, -1500);
        flash2.power = 100;
        this._scene.add(flash2);

        let ambientLight = new THREE.AmbientLight(0x404040);
        this._scene.add(ambientLight);

    }

    addGround() {
        var material = new THREE.MeshPhongMaterial({color: 0x0000ff, dithering: true});
        var geometry = new THREE.PlaneBufferGeometry(2000, 2000);
        var mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(0, -1, 0);
        mesh.rotation.x = -Math.PI * 0.5;
        mesh.receiveShadow = true;
        this._scene.add(mesh);
    }


    get scene() {
        return this._scene
    }
}
