import Loader from '../../../Helpers/Loader'
import PerfHelper from "../../../Helpers/Performance/PerfHelper";

export default class Pantheon {
    constructor(position) {
        this._position = position;
        this._path = './assets/3DModels/Pantheon/Pantheon_Opti.glb';
        this._object = null;
        this._isAnimated = false;
        this.hasPerf = true;
    }

    load() {
        return Loader.loadGLTF(this._path);
    }

    setup() {
        this._object.name = "Pantheon";

        this._object.position.set(this._position.x, this._position.y, this._position.z);
        const material = this._object.children[0].material;
    }

    perf() {
        PerfHelper.instrumentScene(this._object)
    }


}
