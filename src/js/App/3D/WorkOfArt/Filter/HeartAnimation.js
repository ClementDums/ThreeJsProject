import Loader from '../../../../Helpers/Loader'

export default class HeartAnimation {

    constructor(position, path) {
        this._position = position;
        this._path = path;
        this._object = null;
        this._isAnimated = true;
        this.mixer = null;
    }

    animate() {
        this.mixer.clipAction(this._object.animations[0]).play();
    }

    load() {
        return Loader.loadFbx(this._path);
    }


    show() {
        this._object.visible = true;
    }

    hide() {
        this._object.visible = false;
        this.mixer.stopAllAction();

    }

    setup() {
        this._object.name = "HeartAnimation";
        this._object.position.set(this._position.x, this._position.y, this._position.z);
        this._object.visible = false;
    }

}
