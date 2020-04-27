import * as THREE from 'three'
import Spline from "./Spline"


const SplineManager = {
    init() {
        // this.parent = null;
        this.tubeGeometry = null;
        this.mesh = null;
        this.splineArray = [];

        let hallWalk = new THREE.CatmullRomCurve3([new THREE.Vector3(0, 100, 800),
            new THREE.Vector3(600, 100, -200),
            new THREE.Vector3(0, 100, -700),
            new THREE.Vector3(0, 100, -900),
            new THREE.Vector3(0, 100, -1500),
            new THREE.Vector3(0, 100, -3900),
            new THREE.Vector3(-600, 100, -3900)]);

        let galleryWalk = new THREE.CatmullRomCurve3([new THREE.Vector3(0, 100, -1500),
            new THREE.Vector3(0, 100, -2000)
        ]);


        this.splines = {
            hallWalk: hallWalk,
            galleryWalk: galleryWalk,
        };

        this.params = {
            spline: 'HallWalk',
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
            opacity: 0,
            wireframe: true,
            transparent: true
        });

    },

    newSpline(spline) {
        this.currentSpline = new Spline(spline.toString());
        this.splineArray.push(this.currentSpline);
        this.params.spline = spline;
        this.currentSpline.params = this.params;
        this.currentSpline.parent = new THREE.Object3D();
        this.currentSpline.parent.name = "Spline";
        this.addTube();
    },

    getSpline(state) {
        return this.splineArray.find(element => element.name === state);
    },

    addTube() {
        if (this.mesh !== null) {
            this.currentSpline.parent.remove(this.mesh);
            this.mesh.geometry.dispose();
        }
        const extrudePath = this.splines[this.currentSpline.name];
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
