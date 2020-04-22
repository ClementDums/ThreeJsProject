import * as THREE from 'three'
import FilterWorkOfArt from '../../3D/WorkOfArt/FilterWorkOfArt'
import Phone from '../../3D/Phone/Phone'


export default class FilterScene {
    constructor() {
        this._scene = new THREE.Scene();
        this._scene.name = "FilterScene";
        this.phone = new Phone(
            new THREE.Vector3(1, 1, 1));

        this.statue = new FilterWorkOfArt(new THREE.Vector3(0, 0, -2100));
        this.objects = [];
    }

    init() {
        this.addLights();
        this.addGround();
        var geometry = new THREE.BoxGeometry(1, 1, 1);
        var material = new THREE.MeshBasicMaterial({color: 0x00ff00});
        var cube = new THREE.Mesh(geometry, material);
        this._scene.add(cube);

        this.objects.push(this.statue);
        this.objects.push(this.phone);

    }


    addLights() {
        let flash = new THREE.PointLight(0xffffff, 30, 2000, 1.7);
        flash.position.set(0, 1000, 0);
        flash.power = 100;
        this._scene.add(flash);
        let flash2 = new THREE.PointLight(0xffffff, 30, 2000, 1.7);
        flash2.position.set(0, 1000, -1500);
        flash2.power = 100;
        this._scene.add(flash2);

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

    get scene() {
        return this._scene
    }
}
