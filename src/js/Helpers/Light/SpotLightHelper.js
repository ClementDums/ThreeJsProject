import * as THREE from 'three'
import {Vector3} from "three";

export default class SpotLightHelper {

    constructor(params) {
        this.name      = params.name;
        this.position  = params.position;
        this.target    = params.target;
        this.color     = params.color;
        this.angle     = params.angle;
        this.intensity = params.intensity;
        this.penumbra  = params.penumbra;
    }

    initSpotlight() {
        let spotLight = new THREE.SpotLight( this.color );
        //set name
        spotLight.name = this.name;
        //set position
        spotLight.position.set(this.position.x, this.position.y, this.position.z);
        //set target position
        spotLight.target.position.set(this.target.x, this.target.y, this.target.z);
        //set angle
        spotLight.angle = this.angle;
        //set penumbra (border sharpness)
        spotLight.penumbra = this.penumbra;
        //set intensity
        spotLight.intensity = this.intensity;

        return spotLight;
    }

    getSpotLight() {
        return this.initSpotlight();
    }
}