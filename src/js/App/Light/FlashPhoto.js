import * as THREE from 'three'

export default class FlashPhoto {
    constructor() {
        this._flashPhoto = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 7, 20), new THREE.MeshPhongMaterial({color: 0x000000}));
        this._flashPhoto.rotateX(Math.PI / 2);
        this.spotLight = new THREE.SpotLight(0xffffff, 0.5, 150);
        this.spotLight2 = new THREE.SpotLight(0xCCCCCC, 0.5, 150);
        this.init();
    }

    init() {
        this.spotLight.power = 10;
        this.spotLight.angle = 30;
        this.spotLight.decay = 5;
        this.spotLight.penumbra = 0.2;
        this.spotLight.distance = 1500;
        this.spotLight.castShadow = true;
        this.spotLight.rotateX(Math.PI / 2);

        this.spotLight2.power = 20;
        this.spotLight2.angle = 15;
        this.spotLight2.decay = 2;
        this.spotLight2.penumbra = 0.5;
        this.spotLight2.distance = 800;
        this.spotLight2.castShadow = true;
        this.spotLight2.rotateX(Math.PI / 2);

        let spotLight3 = new THREE.SpotLight(0xFFFFFF, 0.5, 150);
        spotLight3.power = 7;
        spotLight3.angle = 2;
        spotLight3.decay = 2.5;
        spotLight3.penumbra = 0.1;
        spotLight3.distance = 200;
        spotLight3.castShadow = true;
        spotLight3.rotateX(Math.PI / 2);

        this._flashPhoto.add(this.spotLight);
        this._flashPhoto.add(this.spotLight.target);
        this._flashPhoto.add(this.spotLight2);
        this._flashPhoto.add(this.spotLight2.target);
        this._flashPhoto.add(spotLight3);
        this._flashPhoto.add(spotLight3.target);
        this._flashPhoto.name = "FlashPhoto";
        this._flashPhoto.visible = false;
    }

    flash() {
        const flash = this._flashPhoto;
        flash.visible = true;
        setTimeout(() => {
            flash.visible = false;
            setTimeout(() => {
                flash.visible = true;
                this.spotLight.power = 25;
                setTimeout(() => {
                    flash.visible = false;

                },400);
            }, 200);
        }, 1500);
        this.spotLight.power = 10;
    }

    get flashPhoto() {
        return this._flashPhoto;
    }
}
