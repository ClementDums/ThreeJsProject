//Setup Camera position, rotation, attaché au personnage
import * as THREE from 'three'
import Loader from '../../../Helpers/Loader'

export default class OutSideScene {
    constructor() {
        this._scene = new THREE.Scene();
        this._scene.name = "Outside";

        this.init()
    }

    init() {

        var geo = new THREE.PlaneBufferGeometry(2000, 2000, 8, 8);
        var mat = new THREE.MeshBasicMaterial({color: 0xFFFFFF, side: THREE.DoubleSide});
        var plane = new THREE.Mesh(geo, mat);
        console.log(plane.position)
        plane.rotateX(-Math.PI / 2);


        var ambientLight = new THREE.AmbientLight(0xcccccc, 0.4);
        this._scene.add(ambientLight);
        this._scene.add(plane);
        const objPromise = Loader.loadFbx('./assets/3DModels/Zeppelin.fbx');


        objPromise.then(obj => {
            obj.position.y = 1000;
            this._scene.add(obj);
        });
    }

    get scene() {
        return this._scene
    }

}
