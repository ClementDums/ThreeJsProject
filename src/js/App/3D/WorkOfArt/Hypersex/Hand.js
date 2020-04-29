import Loader from '../../../../Helpers/Loader'

export default class Hand {
    constructor(position, name) {
        this._position = position;
        this._path = './assets/3DModels/Hypersex/Main.gltf';
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

    setup() {
        this._object.name = "Hand";
        this._object.castShadow = true;
        this._object.rotation.y = Math.PI/2;
        this._object.visible = false;
        this._object.position.set(this._position.x, this._position.y, this._position.z);
        this._object.children[0].name = this.name;
    }


}
