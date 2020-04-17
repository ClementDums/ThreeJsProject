import Loader from '../../../Helpers/Loader'

export default class FilterWorkOfArt {
    constructor(position) {
        this._position = position;
        this._path = './assets/3DModels/Buste/scene.glb';
        this._object = null;
        this._isAnimated = false;
    }

    load() {
        return Loader.loadGLTF(this._path);
    }

    setup(){
        this._object.name = "Work of Art";
        this._object.castShadow = true;
        this._object.rotation.y = Math.PI/2;
        this._object.position.set(this._position.x,this._position.y,this._position.z);
    }


}
