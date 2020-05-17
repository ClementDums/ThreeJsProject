import Loader from '../../../../Helpers/Loader'

export default class DiversityWorkOfArt {
    constructor(position, name, visibility, layer) {
        this._position = position;
        this._path = './assets/3DModels/Diversity/diversity.glb';
        this._object = null;
        this._isAnimated = false;
        this.name = name;
        this.hasPerf = false;
        this.visibility = visibility;
        this.layer = layer;
    }

    load() {
        return Loader.loadGLTF(this._path);
    }

    animate() {
    }

    setup() {
        this._object.name = "Diversity";
        this._object.position.set(this._position.x, this._position.y, this._position.z);
        this._object.children[0].name = this.name;
        if (!this.visibility) {
            this.hide()
        }
        this._object.layers.set(this.layer);
        this._object.traverse((child) => {
            child.layers.set(this.layer);
        });
    }

    show() {
        this._object.visible = true;
        this.visibility = true;

    }

    hide() {
        this._object.visible = false;
        this.visibility = false;
    }

}
