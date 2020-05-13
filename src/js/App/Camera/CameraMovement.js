import * as THREE from 'three'
import TWEEN from "@tweenjs/tween.js"

import SplineManager from "../3D/Splines/SplineManager";
import CameraManager from "./CameraManager";
import SceneManager from "../Scene/SceneManager";

export default class CameraMovement {
    constructor(camera) {
        this.camera = camera;
        this.binormal = new THREE.Vector3();
        this.normal = new THREE.Vector3();
        this.position = new THREE.Vector3();
        this.lookAt = new THREE.Vector3();
        this.currentSplineName = "";
        this.currentMovingSpline = null;
        this.isMoving = false;
        this.time = 0;
        this.speed = 10;
        SplineManager.init();
    }

    moveSpline(splineName) {
        this.time = 0;
        this.currentSplineName = splineName;
        this.splineCamera = this.camera;
        const spline = SplineManager.getSpline(splineName);
        this.currentMovingSpline = spline;
        this.tubeGeometry = spline.tubeGeometry;
        this.params = spline.params;
        CameraManager.lockCamera();
        this.isMoving = true;
    }

    endMove() {
        CameraManager.endMove(this.currentSplineName);
        SceneManager.scene.remove(this.currentMovingSpline.parent);
        this.currentMovingSpline.parent.children[0].geometry.dispose();
        this.currentMovingSpline.parent.children[0].material.dispose();
    }

    moveTo(x, z) {
        const tweenCam = new TWEEN.Tween(CameraManager.mainCamera.camera.position)
            .to({x: x, z: z}, 1000)
            .easing(TWEEN.Easing.Quadratic.Out)
            .start();

        const tweenCamPhon = new TWEEN.Tween(CameraManager.phoneCamera.camera.position)
            .to({x: x + 100, z: z}, 1000)
            .easing(TWEEN.Easing.Quadratic.Out)
            .start();
    }

    animateMove() {
        if (this.isMoving) {
            this.splineAnimation();
        }
    }

    splineAnimation() {
        this.time += 15;
        let time = this.time;
        const looptime = 100000 / this.speed;
        const t = (time % looptime) / looptime;

        let tubeGeometry = this.tubeGeometry;

        tubeGeometry.parameters.path.getPointAt(t, this.position);
        this.position.multiplyScalar(this.params.scale);

        // interpolation
        const segments = this.tubeGeometry.tangents.length;
        const pickt = t * segments;
        const pick = Math.floor(pickt);
        const pickNext = (pick + 1) % segments;


        this.binormal.subVectors(tubeGeometry.binormals[pickNext], tubeGeometry.binormals[pick]);
        this.binormal.multiplyScalar(pickt - pick).add(tubeGeometry.binormals[pick]);

        const dir = tubeGeometry.parameters.path.getTangentAt(t);
        const offset = 0;

        this.normal.copy(this.binormal).cross(dir);

        this.position.add(this.normal.clone().multiplyScalar(offset));

        this.splineCamera.position.copy(this.position);

        tubeGeometry.parameters.path.getPointAt((t + 30 / tubeGeometry.parameters.path.getLength()) % 1, this.lookAt);
        this.lookAt.multiplyScalar(this.params.scale);
        if (segments - 1 < pickt) {
            this.splineEnd();
        }
    }

    splineEnd() {
        this.isMoving = false;
        CameraManager.unlockCamera();
        this.endMove();
    }

}
