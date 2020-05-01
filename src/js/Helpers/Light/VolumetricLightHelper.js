import * as THREE from 'three'
import CylinderHelper from "../Three/CylinderHelper";
import VolumetricLightLib from '../../Lib/threex.volumetricspotlightmaterial';

export default class VolumetricLightHelper {

    constructor(params) {
        this.name         = params.name
        this.cylinderData = params.cylinderData,
        this.position     = params.position,
        this.lookAt       = params.lookAt
    }

    getVolumetricLight() {

        //create cylinder geometry
        this.geometry = this.createGeometry()

        //init volumetric light
        this.material = new VolumetricLightLib();

        //create mesh
        this.mesh = this.createMesh(this.geometry, this.material)

        return this.mesh
    }

    createGeometry() {
        //get cylinder geometry
        let geometry = new CylinderHelper(this.cylinderData).getGeometry();

        //apply matrix
        geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, -geometry.parameters.height/2, 0 ) );
        geometry.applyMatrix( new THREE.Matrix4().makeRotationX( -Math.PI / 2 ));

        return geometry;
    }

    createMesh(geometry, material) {
        //init mesh
        let mesh = new THREE.Mesh( geometry, material );
        //set name
        mesh.name = this.name;
        //set position
        mesh.position.set(this.position.x, this.position.y, this.position.z);
        //set look at position
        mesh.lookAt(new THREE.Vector3(this.lookAt.x, this.lookAt.y, this.lookAt.z));

        return mesh
    }
}