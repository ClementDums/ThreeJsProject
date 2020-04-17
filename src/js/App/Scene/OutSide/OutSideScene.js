import * as THREE from 'three'
import AirShip from '../../3D/Airship/Airship'
import WorkOfArt from '../../3D/WorkOfArt/FilterWorkOfArt'
import Skybox from "../../Environment/Skybox";
import Thunder from "../../Environment/Thunder";

export default class OutSideScene {
    constructor() {

        this._scene = new THREE.Scene();
        this._scene.name = "Outside";
        this.airShipInsta = new AirShip(
            new THREE.Vector3(0, 1000, 0),
            new THREE.Vector3(0.3, 0.3, 0.3));
        this.statue = new WorkOfArt(new THREE.Vector3(0, 1, 0));
        this.thunder = new Thunder();
        this.objects = [];
        this.meteo = [];

        this.skybox = new Skybox("outside");
    }

    init() {

        const flash = new THREE.PointLight(0xffffff, 30, 500, 1.7);
        flash.position.set(0, 200, 30);
        flash.power = 100
        this._scene.add(flash)

        const spotLight = new THREE.SpotLight(0xffffff, 1);
        spotLight.position.set(15, 40, 35);
        spotLight.angle = Math.PI / 4;
        spotLight.penumbra = 0.05;
        spotLight.decay = 2;
        spotLight.distance = 200;

        spotLight.castShadow = true;
        spotLight.shadow.mapSize.width = 1024;
        spotLight.shadow.mapSize.height = 1024;
        spotLight.shadow.camera.near = 10;
        spotLight.shadow.camera.far = 200;
        this._scene.add(spotLight);


        var material = new THREE.MeshPhongMaterial({color: 0x808080, dithering: true});
        var geometry = new THREE.PlaneBufferGeometry(2000, 2000);
        var mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(0, -1, 0);
        mesh.rotation.x = -Math.PI * 0.5;
        mesh.receiveShadow = true;
        this._scene.add(mesh);

        var material = new THREE.MeshPhongMaterial({color: 0x4080ff, dithering: true});

        var geometry = new THREE.BoxBufferGeometry(30, 10, 20);

        var mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(40, 2, 0);
        mesh.castShadow = true;
        this._scene.add(mesh);

        this._scene.add(this.skybox.skybox);

        var ambientLight = new THREE.AmbientLight(0x404040);
        this._scene.add(ambientLight);


        this.meteo.push(this.thunder);

        this.objects.push(this.statue);
    }

    get scene() {
        return this._scene
    }
}
