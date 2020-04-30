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

    getVolumetricLightMesh() {
        console.log(this.cylinderData)
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
        let mesh = new THREE.Mesh( geometry, material );
        console.log(this.position)
        mesh.position.set(this.position.x, this.position.y, this.position.z);//0,2375,-200

        //mesh.lookAt(this.position.x, this.position.y, this.position.z);//0,0, -200
        mesh.lookAt(new THREE.Vector3(this.lookAt.x, this.lookAt.y, this.lookAt.z));

        // material.uniforms.lightColor.value.set('white')
        // material.uniforms.spotPosition.value = mesh.position
        mesh.name = this.name;

        return mesh
    }
}