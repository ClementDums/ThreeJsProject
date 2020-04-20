import * as THREE from 'three'

export default class SplineManager {
    constructor() {
        this.parent = null;
        this.tubeGeometry = null;
        this.mesh = null;

        let pantheonHall = new THREE.CatmullRomCurve3([new THREE.Vector3(0, 100, 800),
            new THREE.Vector3(600, 100, -200),
            new THREE.Vector3(200, 100, -700),
            new THREE.Vector3(0, 100, -900),
            new THREE.Vector3(0, 100, -1500)]);

        this.splines = {
            PantheonHall: pantheonHall,
        };

        this.params = {
            spline: 'PantheonHall',
            scale: 1,
            extrusionSegments: 100,
            radiusSegments: 3,
            closed: false,
            animationView: false,
            lookAhead: false,
            cameraHelper: false,
        };
        this.material = new THREE.MeshLambertMaterial({color: 0xff00ff});

        this.wireframeMaterial = new THREE.MeshBasicMaterial({
            color: 0x000000,
            opacity: 0.3,
            wireframe: true,
            transparent: true
        });

    }

    init() {
        this.parent = new THREE.Object3D();
        this.parent.name = "CameraMovement";

        this.addTube();
    }


    addTube() {
        if (this.mesh !== null) {

            this.parent.remove(this.mesh);
            this.mesh.geometry.dispose();

        }

        var extrudePath = this.splines[this.params.spline];

        this.tubeGeometry = new THREE.TubeBufferGeometry(extrudePath, this.params.extrusionSegments, 2, this.params.radiusSegments, this.params.closed);

        this.addGeometry(this.tubeGeometry);

        this.setScale();

    }

    addGeometry(geometry) {

        // 3D shape

        this.mesh = new THREE.Mesh(geometry, this.material);
        var wireframe = new THREE.Mesh(geometry, this.wireframeMaterial);
        this.mesh.add(wireframe);
        this.parent.add(this.mesh);
    }

    setScale() {

        this.mesh.scale.set(this.params.scale, this.params.scale, this.params.scale);

    }
}
