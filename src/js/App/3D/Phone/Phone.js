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
        console.log(this._cameraPosition)
    }


    load() {
        return Loader.loadGLTF(this._path);
    }

    setCamera(cameraPosition, cameraRotation) {
        this._cameraPosition = cameraPosition;
        this._cameraRotation = cameraRotation;
        if (this._object) {
            this._object.position.set(this._cameraPosition.x - Math.sin(this._cameraRotation.y) * 0.6, this._cameraPosition.y, this._cameraPosition.z - 7);
        }

    }


    setup() {
        console.log(this._object)
        this._object.name = "Phone";
        this._object.scale.set(this._scale.x, this._scale.y, this._scale.z);
        this._object.position.z = -8;
        this._object.position.x = 4.5;
        this._object.position.y = -3;
    }

    animate() {
        if (this._object) {
            this._object.rotation.set(this._cameraRotation.x, this._cameraRotation.y, this._cameraRotation.z);
        }
    }

}
