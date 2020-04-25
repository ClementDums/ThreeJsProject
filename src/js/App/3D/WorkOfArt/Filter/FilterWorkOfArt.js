import Loader from '../../../../Helpers/Loader'

export default class FilterWorkOfArt {
    constructor(position, path) {
        this._position = position;
        this._path = './assets/3DModels/Filter/filter_' + path + '.gltf';
        this._object = null;
        this._isAnimated = false;
    }

    load() {
        return Loader.loadGLTF(this._path);
    }

    setup() {
        this._object.name = "Work of Art";
        this._object.children[0].name = "Filter";
        this._object.castShadow = true;
        this._object.rotation.y = Math.PI;
        this._object.position.set(this._position.x, this._position.y, this._position.z);

    }

    enableFilter() {
        this._object.position.set(0, 80, 80);
    }

    disableFilter() {
        this._object.position.set(0, -100, 80);

    }

}
