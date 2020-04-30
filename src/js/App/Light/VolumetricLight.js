import * as THREE from 'three'
import VolumetricLight from '../../Lib/threex.volumetricspotlightmaterial';

export default class VolumetricLight {

    constructor() {
        this._flashPhoto = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 7, 20), new THREE.MeshPhongMaterial({color: 0x000000}));
        this._flashPhoto.rotateX(Math.PI / 2);
        this.spotLight = new THREE.SpotLight(0xffffff, 0.5, 150);
        this.spotLight2 = new THREE.SpotLight(0xCCCCCC, 0.5, 150);

        this.init();
    }

}