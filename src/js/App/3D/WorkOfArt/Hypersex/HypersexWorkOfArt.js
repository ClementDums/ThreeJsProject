import Loader from '../../../../Helpers/Loader'

export default class HypersexWorkOfArt {
    constructor(position, name) {
        this._position = position;
        this._path = './assets/3DModels/Hypersex/Hypersex.gltf';
        this._object = null;
        this._isAnimated = false;
        this.name = name;
    }

    load() {
        return Loader.loadGLTF(this._path);
    }

    setup() {
        this._object.name = "Work of Art";
        this._object.castShadow = true;
        this._object.position.set(this._position.x, this._position.y, this._position.z);
        this._object.children[0].name = this.name;
    }


}