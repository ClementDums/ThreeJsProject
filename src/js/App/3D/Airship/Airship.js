import Loader from '../../../Helpers/Loader'

export default class Airship {
    constructor(position, scale) {
        this._position = position;
        this._scale = scale;
        this._path = './assets/3DModels/Zeppelin.glb';
        this._object = null;
        this._isAnimated = true;
        this.theta = 0;
        this.radius = 1000;
        this.period = 120;
        this.spotLight = null;
    }


    load() {
        return Loader.loadGLTF(this._path);
    }

    setup() {
        this._object.name = "Airship";
        this._object.scale.set(this._scale.x, this._scale.y, this._scale.z);
        this._object.position.set(this._position.x, this._position.y, this._position.z);


    }

    setLight(spotLight) {
        this.spotLight = spotLight
    }

    animate() {
        if (this._object) {
            this._movement()
        }
    }

    _movement() {
        const dTheta = 2 * Math.PI / (60 * this.period);
        this.theta += dTheta;
        this._object.position.x = this.radius * Math.cos(this.theta);
        this._object.position.z = this.radius * Math.sin(this.theta);
        if (this.spotLight) {
            this.spotLight.position.set(this._object.position.x, this._object.position.y-500, this._object.position.z);
            console.log(this.spotLight.position)
        }
    }

}
