import * as THREE from "three";

export default class CylinderHelper {

    constructor(params) {
        this.radiusTop      = params.radiusTop      ? params.radiusTop : 10
        this.radiusBottom   = params.radiusBottom   ? params.radiusBottom : 20
        this.height         = params.height         ? params.height : 100
        this.radiusSegment  = params.radiusSegment  ? params.radiusSegment : 32*2
        this.heightSegments = params.heightSegments ? params.heightSegments : 50
        this.openEnded      = params.openEnded      ? params.openEnded : true
    }

    getGeometry() {
        return new THREE.CylinderGeometry(this.radiusTop, this.radiusBottom, this.height, this.radiusSegment, this.heightSegments, this.openEnded);
    }
}