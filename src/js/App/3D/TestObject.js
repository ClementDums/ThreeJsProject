import Loader from '../../Helpers/Loader'

export default class TestObject {
    constructor(position, path) {
        this._position = position;
        this._path = path;
        this._object = null;
        this._isAnimated = false;
    }


    load() {
        return Loader.loadGLTF(this._path);
    }

    setup() {
        this._object.name = "TestObject-";
        this._object.position.set(this._position.x, this._position.y, this._position.z);
    }


}
