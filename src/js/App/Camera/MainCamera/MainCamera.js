//Setup Camera position, rotation, attaché au personnage
import * as THREE from 'three'

export default class MainCamera {
    constructor() {
        this._camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 6000);
        this._camera.position.x = 0;
        this._camera.position.z = 800;
        this._camera.position.y = 100;

    }
    init(){

    }

    get camera(){
        return this._camera
    }

}
