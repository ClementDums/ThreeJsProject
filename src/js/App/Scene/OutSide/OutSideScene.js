//Setup Camera position, rotation, attaché au personnage
import * as THREE from 'three'
import AirShip from '../../3D/Airship/Airship'
import WorkOfArt from '../../3D/WorkOfArt/WorkOfArt'

export default class OutSideScene {
    constructor() {
        this._scene = new THREE.Scene();
        this._scene.name = "Outside";
        this.airShipInsta = new AirShip(new THREE.Vector3(0,1000,0));
        this.statue = new WorkOfArt(new THREE.Vector3(0,10,0));
        this.objects = [];
    }

    init() {
        var geo = new THREE.PlaneBufferGeometry(2000, 2000, 8, 8);
        var mat = new THREE.MeshBasicMaterial({color: 0xFFFFFF, side: THREE.DoubleSide});
        var plane = new THREE.Mesh(geo, mat);
        plane.position.y = -10;
        plane.rotateX(-Math.PI / 2);


        var ambientLight = new THREE.AmbientLight(0x404040);
        this._scene.add(ambientLight);
        this._scene.add(plane);


        this.objects.push(this.airShipInsta);
        this.objects.push(this.statue);
    }

    get scene() {
        return this._scene
    }
}
