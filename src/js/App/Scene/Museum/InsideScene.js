import * as THREE from 'three'
import FilterWorkOfArt from '../../3D/WorkOfArt/FilterWorkOfArt'
import Phone from '../../3D/Phone/Phone'
import Pantheon from '../../3D/Decors/Pantheon'
import CameraManager from "../../Camera/CameraManager";


export default class InsideScene {
    constructor() {
        this.cameraManager = new CameraManager();
        this._scene = new THREE.Scene();
        this._scene.name = "Inside";
        this.pantheon = new Pantheon(new THREE.Vector3(0, 239, -200));
        this.phone = new Phone(
            new THREE.Vector3(1, 1, 1));

        this.statue = new FilterWorkOfArt(new THREE.Vector3(-170, 1, -200));
        this.huds = [];
        this.objects = [];
        this.meteo = [];
    }

    init() {

        const flash = new THREE.PointLight(0xffffff, 30, 2000, 1.7);
        flash.position.set(0, 1000, 0);
        flash.power = 100;
        this._scene.add(flash);


        // var material = new THREE.MeshPhongMaterial({color: 0x808080, dithering: true});
        // var geometry = new THREE.PlaneBufferGeometry(2000, 2000);
        // var mesh = new THREE.Mesh(geometry, material);
        // mesh.position.set(0, -1, 0);
        // mesh.rotation.x = -Math.PI * 0.5;
        // mesh.receiveShadow = true;
        // this._scene.add(mesh);

        var material = new THREE.MeshPhongMaterial({color: 0x4080ff, dithering: true});
        var geometry = new THREE.BoxBufferGeometry(30, 10, 20);
        var ambientLight = new THREE.AmbientLight(0x404040);
        this._scene.add(ambientLight);

        this.objects.push(this.statue);
        this.objects.push(this.phone);
        this.objects.push(this.pantheon);

        this.huds.push(this.phone);

        this.createTrajectoy();
    }


    createTrajectoy() {
        const positions = [new THREE.Vector3(289.76843686945404, 225.85575373493543, 56.10018915737797),
            new THREE.Vector3(-53.56300074753207, 171.49711742836848, -14.495472686253045),
            new THREE.Vector3(-185.9429248423075, 155.2260311615549, 53.40777670562185),
            new THREE.Vector3(-383.785318791128, 134.63055497842896, 476.9599228856782)];

        const spline = new THREE.CatmullRomCurve3( positions )
    }

    get scene() {
        return this._scene
    }
}
