import Loader from '../../../../Helpers/Loader'

export default class FilterWorkOfArt {
    constructor(position, path, name) {
        this._position = position;
        this._path = './assets/3DModels/Filter/filter_' + path + '.gltf';
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
        this._object.rotation.y = -Math.PI/2;
        this._object.position.set(this._position.x, this._position.y, this._position.z);
        this._object.children[0].name = this.name;
    }

    enableFilter() {
        this._object.position.set(-700, 50, -3900);
    }

    disableFilter() {
        this._object.position.set(-700, -200, -3900);
    }

}
