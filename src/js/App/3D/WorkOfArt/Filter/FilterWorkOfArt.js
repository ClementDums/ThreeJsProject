import Loader from '../../../../Helpers/Loader'

export default class FilterWorkOfArt {
    constructor(position, path, name, visibility) {
        this._position = position;
        this._path = './assets/3DModels/Filter/filter_' + path + '.glb';
        this._object = null;
        this._isAnimated = false;
        this.name = name;
        this.visibility = visibility;
    }

    load() {
        return Loader.loadGLTF(this._path);
    }

    setup() {
        this._object.name = "Work of Art";
        this._object.castShadow = true;
        this._object.rotation.y = -Math.PI / 2;
        this._object.position.set(this._position.x, this._position.y, this._position.z);
        this._object.children[0].name = this.name;
        this._object.visible = this.visibility;
        if (!this.visibility) {
            this.hide()
        }
    }

    show() {
        this._object.visible = true;
        this.visibility = true;
        this._object.position.y += 300;

    }

    hide() {
        this._object.visible = false;
        this.visibility = false;
        this._object.position.y -= 300;
    }

}
