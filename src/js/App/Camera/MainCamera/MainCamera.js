import * as THREE from 'three'

export default class MainCamera {
    constructor() {
        this._camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 6000);
        this._camera.position.x = 0;
        this._camera.position.z = 800;
        this._camera.position.y = 100;
        this.init();

    }

    init() {
        this.setupFlashLight();
    }

    setupFlashLight() {
        this.flashLight = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 7, 20), new THREE.MeshPhongMaterial({color: 0x000000}));
        this.flashLight.rotateX(Math.PI / 2);
        let spotLight = new THREE.SpotLight(0xffffff, 0.5, 150);
        spotLight.power = 50;
        spotLight.angle = 0.4;
        spotLight.decay = 2;
        spotLight.penumbra = 0.5;
        spotLight.distance = 1500;
        spotLight.castShadow = true;
        spotLight.rotateX(Math.PI / 2);

        let spotLight2 = new THREE.SpotLight(0xCCCCCC, 0.5, 150);
        spotLight2.power = 25;
        spotLight2.angle = 0.55;
        spotLight2.decay = 2;
        spotLight2.penumbra = 0.5;
        spotLight2.distance = 800;
        spotLight2.castShadow = true;
        spotLight2.rotateX(Math.PI / 2);

        let spotLight3 = new THREE.SpotLight(0xFFFFFF, 0.5, 150);
        spotLight3.power = 4000;
        spotLight3.angle = 0.6;
        spotLight3.decay = 2.5;
        spotLight3.penumbra = 0.1;
        spotLight3.distance = 200;
        spotLight3.castShadow = true;
        spotLight3.rotateX(Math.PI / 2);

        this.flashLight.add(spotLight);
        this.flashLight.add(spotLight.target);
        this.flashLight.add(spotLight2);
        this.flashLight.add(spotLight2.target);

        this._camera.add(this.flashLight)
    }

    get camera() {
        return this._camera
    }

}
