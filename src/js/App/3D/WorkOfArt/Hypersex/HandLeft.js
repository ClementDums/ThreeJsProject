import Loader from '../../../../Helpers/Loader'

export default class HandLeft {
    constructor(position, name) {
        this._position = position;
        this._path = './assets/3DModels/Hypersex/main_gauche.glb';
        this._object = null;
        this._isAnimated = false;
        this.name = name;
    }

    load() {
        return Loader.loadGLTF(this._path);
    }

    show(){
        this._object.visible = true;
    }

    hide(){
        this._object.visible = false;
    }

    setup() {
        this._object.name = "Hand Left";
        this.hide();
        this._object.position.set(this._position.x, this._position.y, this._position.z);
        this._object.children[0].name = this.name;
    }


}
