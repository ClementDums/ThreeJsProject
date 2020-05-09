import Loader from '../../../../Helpers/Loader'

export default class HeartAnimation {

    constructor(position) {
        this._position = position;
        this._path = './assets/Animation/FilterHeart.fbx';
        this._object = null;
        this._isAnimated = true;
    }

    load() {
        return Loader.loadFbx(this._path);
    }


    show() {
        this._object.visible = true;
    }

    hide() {
        this._object.visible = false;
    }

    setup() {
        this._object.name = "HeartAnimation";
        this._object.position.set(this._position.x, this._position.y, this._position.z);
        this._object.visible = false;
    }

}
