import * as THREE from 'three'

export default class Skybox {
    constructor(name) {
        this.name = name;
        this.init()
    }

    init() {
        let materialArray = [];
        let texture_ft = new THREE.TextureLoader().load('./assets/Image/skybox/' + this.name + '_ft.jpg');
        let texture_bk = new THREE.TextureLoader().load('./assets/Image/skybox/' + this.name + '_bk.jpg');
        let texture_up = new THREE.TextureLoader().load('./assets/Image/skybox/' + this.name + '_up.jpg');
        let texture_dn = new THREE.TextureLoader().load('./assets/Image/skybox/' + this.name + '_dn.jpg');
        let texture_rt = new THREE.TextureLoader().load('./assets/Image/skybox/' + this.name + '_rt.jpg');
        let texture_lf = new THREE.TextureLoader().load('./assets/Image/skybox/' + this.name + '_lf.jpg');

        materialArray.push(new THREE.MeshBasicMaterial({map: texture_ft}));
        materialArray.push(new THREE.MeshBasicMaterial({map: texture_bk}));
        materialArray.push(new THREE.MeshBasicMaterial({map: texture_up}));
        materialArray.push(new THREE.MeshBasicMaterial({map: texture_dn}));
        materialArray.push(new THREE.MeshBasicMaterial({map: texture_rt}));
        materialArray.push(new THREE.MeshBasicMaterial({map: texture_lf}));

        for (let i = 0; i < 6; i++)
            materialArray[i].side = THREE.BackSide;

        let skyboxGeo = new THREE.BoxGeometry(15000, 15000, 15000);
        this._skybox = new THREE.Mesh(skyboxGeo, materialArray);
        this._skybox.name = "Skybox";
    }

    get skybox() {
        return this._skybox;
    }
}
