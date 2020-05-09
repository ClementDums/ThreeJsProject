import * as THREE from 'three'
import {HDRCubeTextureLoader} from 'three/examples/jsm/loaders/HDRCubeTextureLoader.js';

export default class Background {
    constructor() {
        this.name = "background";
        this._path = './assets/Image/background/background.hdr';
        this.init()
    }

    init() {
        this.hdrCubeMap = new HDRCubeTextureLoader()
            .setPath('./textures/cube/pisaHDR/')
            .setDataType(THREE.UnsignedByteType)
            .load(this._path,  () =>{

                this.hdrCubeMap.magFilter = THREE.LinearFilter;
                this.hdrCubeMap.needsUpdate = true;
            });
    }

    load() {

    }

}
