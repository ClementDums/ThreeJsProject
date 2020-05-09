import * as THREE from 'three'
import Spline from "./Spline"


const SplineManager = {
    init() {
        // this.parent = null;
        this.tubeGeometry = null;
        this.mesh = null;
        this.splineArray = [];
        this.currentMovingSpline = null;

        let hallWalk = new THREE.CatmullRomCurve3([new THREE.Vector3(0, 180, 800),
            new THREE.Vector3(600, 190, -200),
            new THREE.Vector3(0, 190, -700),
            new THREE.Vector3(0, 190, -900),
            new THREE.Vector3(0, 190, -1500),
            new THREE.Vector3(0, 190, -3900),
            new THREE.Vector3(-430, 190, -3900)]);

        let endingWalk = new THREE.CatmullRomCurve3([new THREE.Vector3(-440, 180, -5100),
            new THREE.Vector3(0, 190, -5400)
        ]);

        this.splines = {
            hallWalk: hallWalk,
            endingWalk: endingWalk,
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

    /**
     * Add new spline
     * @param spline
     */
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

    /**
     * Set spline scale
     */
    setScale() {
        this.mesh.scale.set(this.params.scale, this.params.scale, this.params.scale);
    },

};

export default SplineManager
