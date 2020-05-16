import * as THREE from 'three'
import {BufferGeometry, Clock, PointsMaterial} from "three";
import SceneManager from "../Scene/SceneManager";
import MathsHelpers from "../../Helpers/Maths/MathsHelpers";
import EasingHelper from "../../Helpers/Maths/EasingHelper";

export default class ParticlesManager {

    init(data) {
        this.initiaded = false;
        this.data = data;

        this.objects = this.data.objects;

        this.scale = this.data.scale;
        this.position = this.data.position;

        this.mesh = null;
        this.clonemeshes = [];
        this.meshes = [];

        this.parent = new THREE.Object3D();

        this.parent.name = "Particles Object Container";

        this.clock = new Clock();

        SceneManager._threeScene.add(this.parent);

        //set objects points positions
        this.setObjectsPointsPosition();

        //create mesh
        this.createMesh();

        //animation data
        this.t = 0;
        this.dt = 0.0005;
        // this.dt = 0.004;
        this.explode = false;
        this.formObject = false;
        this.objectToFromAttributes = null;

        this.initPositions = true;


    }

    combineBuffer(model, bufferName) {

        let count = 0;

        model.traverse(function (child) {
            if (child.isMesh) {
                let buffer = child.geometry.attributes[bufferName];
                count += buffer.array.length;
            }
        });

        let combined = new Float32Array(count);

        let offset = 0;

        model.traverse(function (child) {
            if (child.isMesh) {
                let buffer = child.geometry.attributes[bufferName];
                combined.set(buffer.array, offset);
                offset += buffer.array.length;
            }
        });
        return new THREE.BufferAttribute(combined, 3);
    }

    createPointMaterial() {
        return new PointsMaterial({
            size: this.data.size, color: 0xFFFFFF,
            map: THREE.ImageUtils.loadTexture("./assets/3DModels/Particles/point.png"),
            alphaTest: 0.5,
            transparent: false
        })
    }

    setObjectsPointsPosition() {
        this.objects.forEach(obj => {
            obj.points = this.combineBuffer(obj.object, 'position');
        });
    }

    getBiggestGeometry() {

        let maxCount = 0;
        let geometryName = '';

        this.objects.forEach(obj => {
            if(obj.points.count > maxCount) {
                geometryName = obj.name;
                maxCount = obj.points.count;
            }
        })

        return geometryName;
    }

    setGeometryPositions(initialObjectName) {

        let geometry = new BufferGeometry();

        this.objects.forEach(obj => {
            if(obj.name === initialObjectName) {

                geometry.setAttribute('position', obj.points.clone());
                geometry.setAttribute('explode_direction', obj.points.clone());
                geometry.setAttribute(obj.name + '_position', obj.points.clone());
            }
            else {
                geometry.setAttribute(obj.name + '_position', obj.points.clone());
            }
        })

        //compute normals
        geometry.computeFaceNormals();
        geometry.computeVertexNormals();

        return geometry;
    }

    explodeFormCall() {
        this.explode = true;
        this.formObject = false;
        this.initPositions = false;
    }

    formObjectCall(objectName) {
        this.t = 0;
        this.objectToFromAttributes = objectName + '_particle_object_position';
        this.formObject = true;
        this.explode = false;
        this.initPositions = false;
    }

    createMesh() {

        //get biggest / initial object name
        let initialObjectName = this.getBiggestGeometry();

        //init geometry and store positions
        let geometry = this.setGeometryPositions(initialObjectName);

        //point material
        let pointMaterial = this.createPointMaterial()
        pointMaterial.blending = THREE.AdditiveBlending

        //create point mesh
        this.mesh = new THREE.Points(geometry, pointMaterial);

        //scale
        this.mesh.scale.x = this.mesh.scale.y = this.mesh.scale.z = this.scale;

        //init position
        this.mesh.position.x = this.position.x;
        this.mesh.position.y = this.position.y;
        this.mesh.position.z = this.position.z;

        //set random directions for explode
        for (let i = 0; i < geometry.attributes.position.array.length; i++) {
            geometry.attributes.explode_direction.array[i] = MathsHelpers.getRandomNumber(geometry.attributes.position.array[i] - 2000, geometry.attributes.position.array[i] + 2000);
        }



        //clone meshes
        this.clonemeshes.push({mesh: this.mesh, speed: 0.5 + Math.random()});

        //store meshes
        this.meshes.push({
            mesh: this.mesh,
        });

        //add to parent
        this.parent.add(this.mesh);
        this.parent.visible = false;

    }

    showParticles() {
        this.parent.visible = true;
    }

    hideParticles() {
        this.parent.visible = false;
    }

    showObject(objectName, explode) {
        if(explode) {
            this.explodeFormCall();
            let that = this
            setTimeout(function() {
                that.formObjectCall(objectName);
            }, 1000)
        }
        else {
            this.formObjectCall(objectName);
        }
    }

    animate() {

        this.t += this.dt;
        if(this.t >= 1) this.dt = 0;

        if (this.clock && this.clonemeshes && this.meshes && !this.initiaded) {
            this.initiaded = true;
        }
        if (this.initiaded) {
            // rotate object
            let delta = 10 * this.clock.getDelta();

            delta = delta < 2 ? delta : 2;

            for (let j = 0; j < this.clonemeshes.length; j++) {
                let cm = this.clonemeshes[j];
                cm.mesh.rotation.y += -0.1 * delta * cm.speed;
            }

            //explode object
            for (let j = 0; j < this.meshes.length; j++) {

                let data = this.meshes[j];

                let positions = data.mesh.geometry.attributes.position;
                let dirs = data.mesh.geometry.attributes.explode_direction;
                let otherPos = data.mesh.geometry.attributes[this.objectToFromAttributes];
                let count = positions.count;

                    for (let i = 0; i < count; i++) {

                        let px = positions.getX(i);
                        let py = positions.getY(i);
                        let pz = positions.getZ(i);

                        //init positions to 0
                        if(this.initPositions === true) {
                            positions.setX(i, 0);
                            positions.setY(i, 0);
                            positions.setZ(i, 0);
                        }

                        //explode object
                        if(this.explode === true) {
                            positions.setX(i, px + dirs.getX(i) / MathsHelpers.getRandomNumber(2000, 3000));
                            positions.setY(i, py + dirs.getY(i) / MathsHelpers.getRandomNumber(2000, 3000));
                            positions.setZ(i, pz + dirs.getZ(i) / MathsHelpers.getRandomNumber(2000, 3000));
                        }

                        //form object
                        if(this.formObject === true) {

                            let ox = otherPos.getX(i);
                            let oy = otherPos.getY(i);
                            let oz = otherPos.getZ(i);

                            let newX = MathsHelpers.linearInterpolation(px, ox, 0.04);
                            let newY = MathsHelpers.linearInterpolation(py, oy, 0.04);
                            let newZ = MathsHelpers.linearInterpolation(pz, oz, 0.04);

                            positions.setX(i, newX);
                            positions.setY(i, newY);
                            positions.setZ(i, newZ);
                        }

                    }

                this.initPositions = false;

                positions.needsUpdate = true;
            }
        }
    }
}