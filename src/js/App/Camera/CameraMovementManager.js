import * as THREE from 'three'

import SplineManager from "./SplineManager";

export default class CameraMovementManager {
    constructor(camera) {
        this.camera = camera;
        this.splineManager = new SplineManager();
        this.binormal = new THREE.Vector3();
        this.normal = new THREE.Vector3();
        this.position = new THREE.Vector3();
        this.lookAt = new THREE.Vector3();
        this.isMoving = true;
    }

    init() {
        this.splineManager.init();
        this.splineParent = this.splineManager.parent;
        this.splineCamera = this.camera;
        this.tubeGeometry = this.splineManager.tubeGeometry;
        this.params = this.splineManager.params
    }

    animateMove() {
        if (this.isMoving) {
            this.splineAnimation();
        }

    }

    splineAnimation() {
        var time = Date.now();
        var looptime = 50 * 1000;
        var t = (time % looptime) / looptime;
        var tubeGeometry = this.tubeGeometry;

        if (tubeGeometry) {
            tubeGeometry.parameters.path.getPointAt(t, this.position);
            this.position.multiplyScalar(this.params.scale);

            // interpolation

            var segments = this.tubeGeometry.tangents.length;
            var pickt = t * segments;
            var pick = Math.floor(pickt);
            var pickNext = (pick + 1) % segments;

            this.binormal.subVectors(tubeGeometry.binormals[pickNext], tubeGeometry.binormals[pick]);
            this.binormal.multiplyScalar(pickt - pick).add(tubeGeometry.binormals[pick]);

            var dir = tubeGeometry.parameters.path.getTangentAt(t);
            var offset = 15;

            this.normal.copy(this.binormal).cross(dir);

            this.position.add(this.normal.clone().multiplyScalar(offset));

            this.splineCamera.position.copy(this.position);

            // using arclength for stablization in look ahead

            tubeGeometry.parameters.path.getPointAt((t + 30 / tubeGeometry.parameters.path.getLength()) % 1, this.lookAt);
            this.lookAt.multiplyScalar(this.params.scale);
            if (segments - 0.1 < pickt) {
                this.splineEnd();
            }

        }

    }

    splineEnd() {
        this.isMoving = false;
    }

}
