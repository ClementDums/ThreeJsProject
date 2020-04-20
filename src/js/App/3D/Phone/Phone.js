import Loader from '../../../Helpers/Loader'
import * as THREE from 'three'

export default class Phone {
    constructor(scale) {
        this._cameraPosition = new THREE.Vector3(0, 0, 0);
        this._cameraRotation = new THREE.Vector3(0, 0, 0);
        this._scale = scale;
        this._path = './assets/3DModels/IPHONE.gltf';
        this._object = null;
        this._isHud = true;
    }


    load() {
        return Loader.loadGLTF(this._path);
    }


    setup() {
        this._object.name = "Phone";
        this._object.scale.set(this._scale.x, this._scale.y, this._scale.z);
        this._object.position.z = -8;
        this._object.position.x = 4.5;
        this._object.position.y = -3;
    }


}
