import Loader from '../../Helpers/Loader'

export default class ParticlesObject {
    constructor(position, path) {
        this._position = position;
        this._path = path;
        this._object = null;
        this._isAnimated = false;
        this._isParticle = true;
    }


    load() {
        return Loader.loadObj(this._path);
    }

    setup() {
        this._object.name = this._path;
        this._object.position.set(this._position.x, this._position.y, this._position.z);
    }

}
