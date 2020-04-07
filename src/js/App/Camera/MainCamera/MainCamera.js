//Setup Camera position, rotation, attaché au personnage
import * as THREE from 'three'

export default class MainCamera {
    constructor() {
        this._camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
        this._camera.position.z = 2050;

    }
    get camera(){
        return this._camera
    }

}
