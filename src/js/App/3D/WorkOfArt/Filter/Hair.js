import Loader from '../../../../Helpers/Loader'

export default class Hair {
    constructor(position) {
        this._position = position;
        this._path = './assets/3DModels/Filter/Cheveux.gltf';
        this._object = null;
        this._isAnimated = false;
    }

    load() {
        return Loader.loadGLTF(this._path);
    }

    setup() {
        this._object.name = "Hair";
        this._object.castShadow = true;
        this._object.position.set(this._position.x, this._position.y, this._position.z);
        this._object.rotation.y = Math.PI;
    }

}
