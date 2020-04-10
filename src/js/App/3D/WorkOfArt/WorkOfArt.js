import Loader from '../../../Helpers/Loader'

export default class WorkOfArt {
    constructor(position) {
        this._position = position;
        this._path = './assets/3DModels/Statue.glb';
        this._object = null

    }

    load() {
        return Loader.loadGLTF(this._path);
    }

    setup(){
        this._object.position.set(this._position.x,this._position.y,this._position.z);
    }


}
