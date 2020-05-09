import Loader from '../../../../Helpers/Loader'

export default class Socle {

    constructor(position) {
        this._position = position;
        this._path = './assets/3DModels/Filter/socle.glb';
        this._object = null;
        this._isAnimated = false;
    }

    load() {
        return Loader.loadGLTF(this._path);
    }

    setup() {
        this._object.name = "Socle";
        this._object.position.set(this._position.x, this._position.y, this._position.z);
    }

}
