import Loader from '../../../Helpers/Loader'

export default class Airship {
    constructor(position) {
        this._position = position;
        this._path = './assets/3DModels/Zeppelin.glb';
        this._object = null
    }


    load() {
        return Loader.loadGLTF(this._path);
    }

    setup() {
        this._object.name = "Airship"
        this._object.position.set(this._position.x, this._position.y, this._position.z);
    }

}
