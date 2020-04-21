import * as THREE from 'three'
import Spline from "./Spline"

const SplineManager = {
    init() {
        // this.parent = null;
        this.tubeGeometry = null;
        this.mesh = null;
        this.splineArray = [];

        let pantheonHall = new THREE.CatmullRomCurve3([new THREE.Vector3(0, 100, 800),
            new THREE.Vector3(600, 100, -200),
            new THREE.Vector3(200, 100, -700),
            new THREE.Vector3(0, 100, -900),
            new THREE.Vector3(0, 100, -1500)]);

        let gallery = new THREE.CatmullRomCurve3([new THREE.Vector3(0, 100, -1600),
            new THREE.Vector3(0, 100, -2000)
        ]);


        this.splines = {
            PantheonHall: pantheonHall,
            Gallery: gallery,
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

    },

    newSpline(spline) {
        this.currentSpline = new Spline(spline);
        this.splineArray.push(this.currentSpline);
        this.params.spline = spline;
        this.currentSpline.params = this.params;
        this.currentSpline.parent = new THREE.Object3D();
        this.currentSpline.parent.name = "CameraMovement";
        this.addTube();
    },

    getSpline() {
        return this.splineArray[0];
    },

    addTube() {
        if (this.mesh !== null) {

            this.currentSpline.parent.remove(this.mesh);
            this.mesh.geometry.dispose();

        }

        var extrudePath = this.splines[this.params.spline];

        this.currentSpline.tubeGeometry = new THREE.TubeBufferGeometry(extrudePath, this.params.extrusionSegments, 2, this.params.radiusSegments, this.params.closed);

        this.addGeometry(this.currentSpline.tubeGeometry);

        this.setScale();

    },

    addGeometry(geometry) {

        // 3D shape
        this.mesh = new THREE.Mesh(geometry, this.material);
        let wireframe = new THREE.Mesh(geometry, this.wireframeMaterial);
        this.mesh.add(wireframe);
        this.currentSpline.parent.add(this.mesh);
    },

    setScale() {
        this.mesh.scale.set(this.params.scale, this.params.scale, this.params.scale);
        this.setSpline()
    },

    setSpline() {

    }
};

export default SplineManager
